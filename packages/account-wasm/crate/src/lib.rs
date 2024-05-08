mod types;
mod utils;

use std::str::FromStr;

use account_sdk::account::session::hash::{AllowedMethod, Session};
use account_sdk::account::session::SessionAccount;
use account_sdk::account::CartridgeGuardianAccount;
use account_sdk::signers::webauthn::device::DeviceSigner;
use account_sdk::signers::HashSigner;
use account_sdk::wasm_webauthn::CredentialID;
use base64::{engine::general_purpose, Engine};
use coset::{CborSerializable, CoseKey};
use serde_wasm_bindgen::to_value;
use starknet::accounts::Account;
use starknet::macros::felt;
use starknet::signers::SigningKey;
use starknet::{
    accounts::Call,
    core::types::FieldElement,
    providers::{jsonrpc::HttpTransport, JsonRpcClient},
};
use types::{JsCall, JsInvocationsDetails, SessionCredentials};
use url::Url;
use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub struct CartridgeAccount {
    account: CartridgeGuardianAccount<JsonRpcClient<HttpTransport>, DeviceSigner, SigningKey>,
    session: Option<SessionAccount<JsonRpcClient<HttpTransport>, SigningKey, SigningKey>>,
    rpc_url: Url,
}

#[wasm_bindgen]
impl CartridgeAccount {
    /// Creates a new `CartridgeAccount` instance.
    ///
    /// # Parameters
    /// - `rpc_url`: The URL of the JSON-RPC endpoint.
    /// - `chain_id`: Identifier of the blockchain network to interact with.
    /// - `address`: The blockchain address associated with the account.
    /// - `rp_id`: Relying Party Identifier, a string that uniquely identifies the WebAuthn relying party.
    /// - `origin`: The origin of the WebAuthn request. Example https://cartridge.gg
    /// - `credential_id`: Base64 encoded bytes of the raw credential ID generated during the WebAuthn registration process.
    /// - `public_key`: Base64 encoded bytes of the public key generated during the WebAuthn registration process (COSE format).
    ///
    pub fn new(
        rpc_url: String,
        chain_id: String,
        address: String,
        rp_id: String,
        origin: String,
        credential_id: String,
        public_key: String,
    ) -> Result<CartridgeAccount, JsValue> {
        utils::set_panic_hook();
        let rpc_url = Url::parse(&rpc_url).map_err(|e| JsValue::from_str(&format!("{}", e)))?;
        let provider: JsonRpcClient<HttpTransport> =
            JsonRpcClient::new(HttpTransport::new(rpc_url.clone()));
        let credential_id = general_purpose::URL_SAFE_NO_PAD
            .decode(credential_id)
            .map_err(|e| JsValue::from_str(&format!("{}", e)))?;

        let bytes = general_purpose::URL_SAFE_NO_PAD
            .decode(public_key)
            .map_err(|e| JsValue::from_str(&format!("{}", e)))?;

        let cose = CoseKey::from_slice(&bytes).map_err(|e| JsValue::from_str(&format!("{}", e)))?;

        let signer = DeviceSigner::new(
            rp_id.clone(),
            origin.clone(),
            CredentialID(credential_id),
            cose,
        );

        let dummy_guardian = SigningKey::from_secret_scalar(felt!("0x42"));

        let address =
            FieldElement::from_str(&address).map_err(|e| JsValue::from_str(&format!("{}", e)))?;
        let chain_id =
            FieldElement::from_str(&chain_id).map_err(|e| JsValue::from_str(&format!("{}", e)))?;

        let account =
            CartridgeGuardianAccount::new(provider, signer, dummy_guardian, address, chain_id);

        Ok(CartridgeAccount {
            account,
            session: None,
            rpc_url,
        })
    }

    /// Registers a new keypair on device signer and creates a new `CartridgeAccount` instance.
    ///
    /// # Parameters
    /// - `rpc_url`: The URL of the JSON-RPC endpoint.
    /// - `chain_id`: Identifier of the blockchain network to interact with.
    /// - `address`: The blockchain address associated with the account.
    /// - `rp_id`: Relying Party Identifier, a string that uniquely identifies the WebAuthn relying party.
    /// - `origin`: The origin of the WebAuthn request. Example https://cartridge.gg
    /// - `user_name`: The user name associated with the account.
    pub async fn register(
        rpc_url: String,
        chain_id: String,
        address: String,
        rp_id: String,
        origin: String,
        user_name: String,
    ) -> Result<CartridgeAccount, JsValue> {
        utils::set_panic_hook();

        let rpc_url = Url::parse(&rpc_url).map_err(|e| JsValue::from_str(&format!("{}", e)))?;
        let provider = JsonRpcClient::new(HttpTransport::new(rpc_url.clone()));
        let signer = DeviceSigner::register(rp_id.clone(), origin.clone(), user_name, &vec![])
            .await
            .map_err(|e| JsValue::from_str(&format!("{}", e)))?;
        let dummy_guardian = SigningKey::from_secret_scalar(felt!("0x42"));
        let address =
            FieldElement::from_str(&address).map_err(|e| JsValue::from_str(&format!("{}", e)))?;
        let chain_id =
            FieldElement::from_str(&chain_id).map_err(|e| JsValue::from_str(&format!("{}", e)))?;
        let account =
            CartridgeGuardianAccount::new(provider, signer, dummy_guardian, address, chain_id);

        Ok(CartridgeAccount {
            account,
            session: None,
            rpc_url,
        })
    }

    #[wasm_bindgen(js_name = createSession)]
    pub async fn create_session(&mut self, policies: Vec<JsValue>, expires_at: u64) -> Result<JsValue, JsValue> {
        let methods: Vec<AllowedMethod> = vec![
            AllowedMethod::new(
                felt!("0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"),
                "approve",
            )
            .unwrap(),
            AllowedMethod::new(
                felt!("0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"),
                "transfer",
            )
            .unwrap(),
        ];
        let signer = SigningKey::from_random();
        let session = Session::new(methods, expires_at, &signer.signer())
            .map_err(|e| JsValue::from_str(&format!("{}", e)))?;

        let hash = session
            .raw()
            .get_message_hash_rev_1(self.account.chain_id(), self.account.address());

        let authorization = self
            .account
            .sign_hash(hash)
            .await
            .map_err(|e| JsValue::from_str(&format!("{}", e)))?;

        let provider = JsonRpcClient::new(HttpTransport::new(self.rpc_url.clone()));
        let dummy_guardian = SigningKey::from_secret_scalar(felt!("0x42"));
        self.session = Some(SessionAccount::new(
            provider,
            signer.clone(),
            dummy_guardian,
            self.account.address(),
            self.account.chain_id(),
            authorization.clone(),
            session.clone(),
        ));

        Ok(to_value(&SessionCredentials {
            authorization,
            private_key: signer.secret_scalar(),
        })
        .map_err(|e| JsValue::from_str(&format!("{}", e)))?)
    }

    #[wasm_bindgen(js_name = execute)]
    pub async fn execute(
        &self,
        calls: Vec<JsValue>,
        transaction_details: JsValue,
    ) -> Result<JsValue, JsValue> {
        utils::set_panic_hook();

        let calls = calls
            .into_iter()
            .map(|js_value| {
                JsCall::try_from(js_value).and_then(|js_call| {
                    Call::try_from(js_call).map_err(|e| JsValue::from_str(&format!("{}", e)))
                })
            })
            .collect::<Result<Vec<Call>, _>>()?;

        let details: JsInvocationsDetails = JsInvocationsDetails::try_from(transaction_details)?;

        let execution = if let Some(session) = &self.session {
            session
                .execute(calls.clone())
                .max_fee(details.max_fee)
                .nonce(details.nonce)
                .send()
                .await
                .map_err(|e| JsValue::from_str(&format!("{}", e.to_string())))?
        } else {
            self.account
                .execute(calls)
                .max_fee(details.max_fee)
                .nonce(details.nonce)
                .send()
                .await
                .map_err(|e| JsValue::from_str(&format!("{}", e.to_string())))?
        };

        Ok(to_value(&execution).map_err(|e| JsValue::from_str(&format!("{}", e)))?)
    }

    #[wasm_bindgen(js_name = signMessage)]
    pub fn sign_message(&self) -> Vec<JsValue> {
        unimplemented!("Sign Message not implemented");
    }
}
