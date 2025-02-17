use crate::abigen::cartridge_account::{Signature, WebauthnSigner};
use async_trait::async_trait;
use cainome::cairo_serde::{NonZero, U256};
use ecdsa::RecoveryId;
use p256::{
    ecdsa::{Signature as ECDSASignature, SigningKey},
    elliptic_curve::sec1::Coordinates,
};
use rand_core::OsRng;

use super::{
    credential::{AuthenticatorAssertionResponse, AuthenticatorData, CliendData},
    Secp256r1Point, SignError,
};

use super::WebauthnAccountSigner;

#[derive(Debug, Clone)]
pub struct P256r1Signer {
    pub signing_key: SigningKey,
    rp_id: String,
    pub origin: String,
}

impl P256r1Signer {
    pub fn new(rp_id: String, signing_key: SigningKey, origin: String) -> Self {
        Self {
            rp_id,
            signing_key,
            origin,
        }
    }

    pub fn random(rp_id: String, origin: String) -> Self {
        let signing_key = SigningKey::random(&mut OsRng);
        Self::new(rp_id, signing_key, origin)
    }

    fn public_key_bytes(&self) -> ([u8; 32], [u8; 32]) {
        let encoded = self.signing_key.verifying_key().to_encoded_point(false);
        let (x, y) = match encoded.coordinates() {
            Coordinates::Uncompressed { x, y } => (x, y),
            _ => panic!("unexpected compression"),
        };
        (
            x.as_slice().try_into().unwrap(),
            y.as_slice().try_into().unwrap(),
        )
    }
    pub fn public_key(&self) -> Secp256r1Point {
        let (x, y) = self.public_key_bytes();
        (U256::from_bytes_be(&x), U256::from_bytes_be(&y))
    }
    pub fn rp_id_hash(&self) -> [u8; 32] {
        use sha2::{digest::Update, Digest, Sha256};
        Sha256::new().chain(self.rp_id.clone()).finalize().into()
    }
}

#[cfg_attr(not(target_arch = "wasm32"), async_trait)]
#[cfg_attr(target_arch = "wasm32", async_trait(?Send))]
impl WebauthnAccountSigner for P256r1Signer {
    async fn sign(&self, challenge: &[u8]) -> Result<AuthenticatorAssertionResponse, SignError> {
        use sha2::{digest::Update, Digest, Sha256};

        let authenticator_data = AuthenticatorData {
            rp_id_hash: self.rp_id_hash(),
            flags: 0b00000101,
            sign_count: 0,
        };
        let client_data_json = CliendData::new(challenge, self.origin.clone()).to_json();
        let client_data_hash = Sha256::new().chain(client_data_json.clone()).finalize();

        let mut to_sign = Into::<Vec<u8>>::into(authenticator_data.clone());
        to_sign.append(&mut client_data_hash.to_vec());
        let (signature, recovery_id): (ECDSASignature, RecoveryId) =
            self.signing_key.sign_recoverable(&to_sign).unwrap();
        let signature_bytes = signature.to_bytes().to_vec();

        let signature = Signature {
            r: U256::from_bytes_be(&signature_bytes[0..32].try_into().unwrap()),
            s: U256::from_bytes_be(&signature_bytes[32..64].try_into().unwrap()),
            y_parity: recovery_id.is_y_odd(),
        };

        Ok(AuthenticatorAssertionResponse {
            authenticator_data,
            client_data_json,
            signature,
            user_handle: None,
        })
    }
    fn signer_pub_data(&self) -> WebauthnSigner {
        WebauthnSigner {
            rp_id_hash: NonZero::new(U256::from_bytes_be(&self.rp_id_hash())).unwrap(),
            origin: self.origin.clone().into_bytes(),
            pubkey: NonZero::new(self.public_key().0).unwrap(),
        }
    }
}
