use serde::Serialize;

use crate::abigen::cartridge_account::Signature;

#[derive(Debug, Clone, Serialize)]
pub struct CliendData {
    #[serde(rename = "type")]
    type_: String,
    challenge: String,
    origin: String,
    #[serde(rename = "crossOrigin")]
    cross_origin: bool,
}

impl CliendData {
    pub fn new(challenge: impl AsRef<[u8]>, origin: String) -> Self {
        use base64::{engine::general_purpose::URL_SAFE, Engine as _};
        let challenge = URL_SAFE.encode(challenge);

        Self {
            type_: "webauthn.get".into(),
            challenge,
            origin,
            cross_origin: false,
        }
    }
    pub fn to_json(&self) -> String {
        serde_json::to_string(self).unwrap()
    }
}

#[derive(Debug, Clone)]
pub struct AuthenticatorAssertionResponse {
    pub authenticator_data: AuthenticatorData,
    pub client_data_json: String,
    pub signature: Signature,
    pub user_handle: Option<Vec<u8>>,
}

#[derive(Debug, Clone, Serialize)]
pub struct AuthenticatorData {
    pub rp_id_hash: [u8; 32],
    pub flags: u8,
    pub sign_count: u32,
}

impl From<AuthenticatorData> for Vec<u8> {
    fn from(value: AuthenticatorData) -> Self {
        let mut data = Vec::new();
        data.extend_from_slice(&value.rp_id_hash);
        data.push(value.flags);
        data.extend_from_slice(&value.sign_count.to_be_bytes());
        data
    }
}
