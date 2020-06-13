/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_txoref_free(a: number): void;
export function txoref_relative(a: number, b: number): number;
export function txoref_absolute(a: number, b: number): number;
export function __wbg_transfertype_free(a: number): void;
export function transfertype_standard_transfer_type(): number;
export function transfertype_debt_transfer_type(): number;
export function __wbg_clientassetrecord_free(a: number): void;
export function __wbg_assettracerkeypair_free(a: number): void;
export function assettracerkeypair_new(): number;
export function __wbg_ownermemo_free(a: number): void;
export function clientassetrecord_from_json_record(a: number): number;
export function __wbg_credentialuserkeypair_free(a: number): void;
export function __wbg_credentialissuerkeypair_free(a: number): void;
export function __wbg_credentialsignature_free(a: number): void;
export function __wbg_credentialcommitment_free(a: number): void;
export function __wbg_credential_free(a: number): void;
export function credentialissuerkeypair_get_pk(a: number): number;
export function credentialissuerkeypair_get_sk(a: number): number;
export function credentialissuerkeypair_to_jsvalue(a: number): number;
export function credentialissuerkeypair_from_jsvalue(a: number): number;
export function credentialuserkeypair_get_pk(a: number): number;
export function credentialuserkeypair_get_sk(a: number): number;
export function credentialuserkeypair_serialize(a: number, b: number): void;
export function credentialuserkeypair_to_jsvalue(a: number): number;
export function credentialuserkeypair_from_jsvalue(a: number): number;
export function __wbg_signaturerules_free(a: number): void;
export function signaturerules_new(a: number, b: number, c: number): number;
export function __wbg_assetrules_free(a: number): void;
export function assetrules_new(): number;
export function assetrules_set_traceable(a: number, b: number): number;
export function assetrules_set_max_units(a: number, b: number, c: number): number;
export function assetrules_set_transferable(a: number, b: number): number;
export function assetrules_set_updatable(a: number, b: number): number;
export function assetrules_set_transfer_multisig_rules(a: number, b: number): number;
export function __wbg_credentialrevealsig_free(a: number): void;
export function random_asset_type(a: number): void;
export function verify_authenticated_txn(a: number, b: number, c: number, d: number): number;
export function calculate_fee(a: number, b: number, c: number, d: number, e: number, f: number, g: number): void;
export function get_null_pk(): number;
export function create_default_policy_info(a: number): void;
export function create_debt_policy_info(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
export function create_debt_memo(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): void;
export function __wbg_transactionbuilder_free(a: number): void;
export function transactionbuilder_new(): number;
export function transactionbuilder_add_operation_create_asset(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function transactionbuilder_add_operation_create_asset_with_policy(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function transactionbuilder_add_policy_option(a: number, b: number, c: number, d: number, e: number): number;
export function transactionbuilder_add_basic_issue_asset(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number): number;
export function transactionbuilder_add_operation_air_assign(a: number, b: number, c: number, d: number, e: number): number;
export function transactionbuilder_add_operation(a: number, b: number, c: number): number;
export function transactionbuilder_sign(a: number, b: number): number;
export function transactionbuilder_transaction(a: number, b: number): void;
export function transactionbuilder_get_owner_record(a: number, b: number): number;
export function transactionbuilder_get_owner_memo(a: number, b: number): number;
export function __wbg_transferoperationbuilder_free(a: number): void;
export function transferoperationbuilder_new(): number;
export function transferoperationbuilder_debug(a: number, b: number): void;
export function transferoperationbuilder_add_input_with_tracking(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function transferoperationbuilder_add_input_no_tracking(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;
export function transferoperationbuilder_add_output_with_tracking(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number): number;
export function transferoperationbuilder_add_output_no_tracking(a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number): number;
export function transferoperationbuilder_balance(a: number): number;
export function transferoperationbuilder_create(a: number, b: number): number;
export function transferoperationbuilder_sign(a: number, b: number): number;
export function transferoperationbuilder_builder(a: number, b: number): void;
export function transferoperationbuilder_transaction(a: number, b: number): void;
export function open_client_asset_record(a: number, b: number, c: number): number;
export function get_pub_key_str(a: number, b: number): void;
export function get_priv_key_str(a: number, b: number): void;
export function new_keypair(): number;
export function public_key_to_base64(a: number, b: number): void;
export function public_key_from_base64(a: number, b: number): number;
export function keypair_to_str(a: number, b: number): void;
export function keypair_from_str(a: number, b: number): number;
export function sha256str(a: number, b: number, c: number): void;
export function sign(a: number, b: number, c: number): number;
export function submit_transaction(a: number, b: number, c: number, d: number): number;
export function get_txn_status(a: number, b: number, c: number, d: number): number;
export function get_txo(a: number, b: number, c: number, d: number): number;
export function get_transaction(a: number, b: number, c: number, d: number): number;
export function get_state_commitment(a: number, b: number): number;
export function get_asset_token(a: number, b: number, c: number, d: number): number;
export function wasm_credential_issuer_key_gen(a: number): number;
export function wasm_credential_user_key_gen(a: number): number;
export function wasm_credential_sign(a: number, b: number, c: number): number;
export function create_credential(a: number, b: number, c: number): number;
export function wasm_credential_commit(a: number, b: number, c: number): number;
export function wasm_credential_reveal(a: number, b: number, c: number): number;
export function wasm_credential_verify(a: number, b: number, c: number): void;
export function trace_assets(a: number, b: number, c: number): number;
export function __wbg_credissuersecretkey_free(a: number): void;
export function __wbg_credissuerpublickey_free(a: number): void;
export function __wbg_creduserpublickey_free(a: number): void;
export function __wbg_credusersecretkey_free(a: number): void;
export function __wbg_xfrpublickey_free(a: number): void;
export function __wbg_xfrkeypair_free(a: number): void;
export function xfrkeypair_get_pk(a: number): number;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h5f1014b615cac9a1(a: number, b: number, c: number): void;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__h351cd0832203a986(a: number, b: number, c: number, d: number): void;