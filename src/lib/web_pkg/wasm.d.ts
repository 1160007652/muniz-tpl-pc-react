/* tslint:disable */
/* eslint-disable */
/**
* Generates random base64 encoded asset type string. Used in asset definitions.
* @see {@link WasmTransactionBuilder#add_operation_create_asset} for instructions on how to define an asset with a new
* asset type
* @returns {string} 
*/
export function random_asset_type(): string;
/**
* Given a serialized state commitment and transaction, returns true if the transaction correctly
* hashes up to the state commitment and false otherwise.
* @param {string} state_commitment - String representing the state commitment.
* @param {string} authenticated_txn - String representing the transaction.
* @see {@link get_transaction} for instructions on fetching a transaction from the ledger.
* @see {@link get_state_commitment} for instructions on fetching a ledger state commitment.
* @throws Will throw an error if the state commitment or the transaction fail to deserialize.
* @param {string} state_commitment 
* @param {string} authenticated_txn 
* @returns {boolean} 
*/
export function verify_authenticated_txn(state_commitment: string, authenticated_txn: string): boolean;
/**
* Performs a simple loan repayment fee calculation.
*
* The returned fee is a fraction of the `outstanding_balance`
* where the interest rate is expressed as a fraction `ir_numerator` / `ir_denominator`.
*
* This function is specific to the  Lending Demo.
* @param {BigInt} ir_numerator - Interest rate numerator.
* @param {BigInt} ir_denominator - Interest rate denominator.
* @param {BigInt} outstanding_balance - Amount of outstanding debt.
* @ignore
* @param {BigInt} ir_numerator 
* @param {BigInt} ir_denominator 
* @param {BigInt} outstanding_balance 
* @returns {BigInt} 
*/
export function calculate_fee(ir_numerator: BigInt, ir_denominator: BigInt, outstanding_balance: BigInt): BigInt;
/**
* Returns an address to use for cancelling debt tokens in a debt swap.
* @ignore
* @returns {XfrPublicKey} 
*/
export function get_null_pk(): XfrPublicKey;
/**
* @returns {string} 
*/
export function create_default_policy_info(): string;
/**
* Create policy information needed for debt token asset types.
* This data will be parsed by the policy evalautor to ensure
* that all payment and fee amounts are correct.
* # Arguments
*
* * `ir_numerator` - interest rate numerator
* * `ir_denominator`- interest rate denominator
* * `fiat_code` - base64 string representing asset type used to pay off the loan
* * `amount` - loan amount
* @param {BigInt} ir_numerator 
* @param {BigInt} ir_denominator 
* @param {string} fiat_code 
* @param {BigInt} loan_amount 
* @returns {string} 
*/
export function create_debt_policy_info(ir_numerator: BigInt, ir_denominator: BigInt, fiat_code: string, loan_amount: BigInt): string;
/**
* Creates the memo needed for debt token asset types. The memo will be parsed by the policy evaluator to ensure
* that all payment and fee amounts are correct.
* @param {BigInt} ir_numerator  - Interest rate numerator.
* @param {BigInt} ir_denominator - Interest rate denominator.
* @param {string} fiat_code - Base64 string representing asset type used to pay off the loan.
* @param {BigInt} loan_amount - Loan amount.
* @throws Will throw an error if `fiat_code` fails to deserialize.
* @ignore
* @param {BigInt} ir_numerator 
* @param {BigInt} ir_denominator 
* @param {string} fiat_code 
* @param {BigInt} loan_amount 
* @returns {string} 
*/
export function create_debt_memo(ir_numerator: BigInt, ir_denominator: BigInt, fiat_code: string, loan_amount: BigInt): string;
/**
* Returns a JsValue containing decrypted owner record information.
* @param {ClientAssetRecord} record - Ownership record.
* @param {OwnerMemo} owner_memo - Opening parameters.
* @param {XfrKeyPair} key - Key of asset owner that is used to open the record.
* @param {ClientAssetRecord} record 
* @param {OwnerMemo | undefined} owner_memo 
* @param {XfrKeyPair} key 
* @returns {any} 
*/
export function open_client_asset_record(record: ClientAssetRecord, owner_memo: OwnerMemo | undefined, key: XfrKeyPair): any;
/**
* Extracts the public key as a string from a transfer key pair.
* @param {XfrKeyPair} key_pair 
* @returns {string} 
*/
export function get_pub_key_str(key_pair: XfrKeyPair): string;
/**
* Extracts the private key as a string from a transfer key pair.
* @param {XfrKeyPair} key_pair 
* @returns {string} 
*/
export function get_priv_key_str(key_pair: XfrKeyPair): string;
/**
* Creates a new transfer key pair.
* @returns {XfrKeyPair} 
*/
export function new_keypair(): XfrKeyPair;
/**
* Returns base64 encoded representation of an XfrPublicKey.
* @param {XfrPublicKey} key 
* @returns {string} 
*/
export function public_key_to_base64(key: XfrPublicKey): string;
/**
* Converts a base64 encoded public key string to a public key.
* @param {string} key_pair 
* @returns {XfrPublicKey} 
*/
export function public_key_from_base64(key_pair: string): XfrPublicKey;
/**
* Expresses a transfer key pair as a hex-encoded string.
* To decode the string, use `keypair_from_str` function.
* @param {XfrKeyPair} key_pair 
* @returns {string} 
*/
export function keypair_to_str(key_pair: XfrKeyPair): string;
/**
* Constructs a transfer key pair from a hex-encoded string.
* The encode a key pair, use `keypair_to_str` function.
* @param {string} str 
* @returns {XfrKeyPair} 
*/
export function keypair_from_str(str: string): XfrKeyPair;
/**
* Returns the SHA256 signature of the given string as a hex-encoded
* string.
* @ignore
* @param {string} str 
* @returns {string} 
*/
export function sha256str(str: string): string;
/**
* Signs the given message using the given transfer key pair.
* @ignore
* @param {XfrKeyPair} key_pair 
* @param {string} message 
* @returns {any} 
*/
export function sign(key_pair: XfrKeyPair, message: string): any;
/**
* Submit a transaction to the ledger and return a promise for the
* ledger\'s eventual response. The transaction will be enqueued for
* validation. If it is valid, it will eventually be committed to the
* ledger.
*
* To determine whether or not the transaction has been committed to the ledger,
* query the ledger by transaction handle.
*
* Contained in the response of `submit_transaction` is a `TransactionHandle` that can be used to
* query the status of the transaction.
* @param {string} path - Submission server path (e.g. `https://localhost:8669`)
* @param {transaction_str} - JSON-encoded transaction string.
*
* @see {@link get_txn_status} for information about transaction statuses.
* @param {string} path 
* @param {string} transaction_str 
* @returns {Promise<any>} 
*/
export function submit_transaction(path: string, transaction_str: string): Promise<any>;
/**
* Given a transaction ID, returns a promise for the transaction status.
* @param {string} path 
* @param {string} handle 
* @returns {Promise<any>} 
*/
export function get_txn_status(path: string, handle: string): Promise<any>;
/**
* If successful, returns a promise that will eventually provide a
* JsValue describing an unspent transaction output (UTXO).
* Otherwise, returns \'not found\'. The request fails if the txo uid
* has been spent or the transaction index does not correspond to a
* transaction.
* @param {string} path - Address of ledger server.
* @param {BigInt} index - UTXO index.
* @param {string} path 
* @param {BigInt} index 
* @returns {Promise<any>} 
*/
export function get_txo(path: string, index: BigInt): Promise<any>;
/**
* If successful, returns a promise that will eventually provide a
* JsValue describing a transaction.
* Otherwise, returns \'not found\'. The request fails if the transaction index does not correspond
* to a transaction.
*
* @param {String} path - Ledger server path.
* @param {BigInt} index - Transaction index.
* @param {string} path 
* @param {BigInt} index 
* @returns {Promise<any>} 
*/
export function get_transaction(path: string, index: BigInt): Promise<any>;
/**
* Returns a JSON-encoded version of the state commitment of a running ledger. This is used to
* check the authenticity of transactions and blocks.
* @param {string} path 
* @returns {Promise<any>} 
*/
export function get_state_commitment(path: string): Promise<any>;
/**
* If successful, returns a promise that will eventually provide a
* JsValue describing an asset token. Otherwise, returns \'not found\'.
* The request fails if the given asset name does not correspond to
* an asset.
* @param {string} path: Address of ledger server.
* @param {string} name: Base64-encoded asset token string.
* @param {string} path 
* @param {string} name 
* @returns {Promise<any>} 
*/
export function get_asset_token(path: string, name: string): Promise<any>;
/**
* Generates a new credential issuer key.
* @param {JsValue} attributes: Array of attribute types of the form `[{name: \"credit_score\",
* size: 3}]\'. The size refers to byte-size of the credential. In this case, the \"credit_score\
* attribute is represented as a 3 byte string \"760\". `attributes` is the list of attribute types
* that the issuer can sign off on.
* @param {any} attributes 
* @returns {CredentialIssuerKeyPair} 
*/
export function wasm_credential_issuer_key_gen(attributes: any): CredentialIssuerKeyPair;
/**
* Generates a new credential user key.
* @param {CredIssuerPublicKey} issuer_pub_key - The credential issuer that can sign off on this
* user\'s attributes.
* @param {CredIssuerPublicKey} issuer_pub_key 
* @returns {CredentialUserKeyPair} 
*/
export function wasm_credential_user_key_gen(issuer_pub_key: CredIssuerPublicKey): CredentialUserKeyPair;
/**
* Generates a signature on user attributes that can be used to create a credential.
* @param {CredIssuerSecretKey} issuer_secret_key - Secret key of credential issuer.
* @param {CredUserPublicKey} user_public_key - Public key of credential user.
* @param {JsValue} attributes - Array of attribute assignments of the form `[{name: \"credit_score\",
* val: \"760\"}]\'.
* @throws Will throw an error if the signature cannot be generated.
* @param {CredIssuerSecretKey} issuer_secret_key 
* @param {CredUserPublicKey} user_public_key 
* @param {any} attributes 
* @returns {CredentialSignature} 
*/
export function wasm_credential_sign(issuer_secret_key: CredIssuerSecretKey, user_public_key: CredUserPublicKey, attributes: any): CredentialSignature;
/**
* Generates a signature on user attributes that can be used to create a credential.
* @param {CredIssuerPublicKey} issuer_public_key - Public key of credential issuer.
* @param {CredentialSignature} signature - Credential issuer signature on attributes.
* @param {JsValue} attributes - Array of attribute assignments of the form `[{name: \"credit_score\",
* val: \"760\"}]\'.
* @param {CredIssuerPublicKey} issuer_public_key 
* @param {CredentialSignature} signature 
* @param {any} attributes 
* @returns {Credential} 
*/
export function create_credential(issuer_public_key: CredIssuerPublicKey, signature: CredentialSignature, attributes: any): Credential;
/**
* Generates a credential commitment. A credential commitment can be used to selectively reveal
* attribute assignments.
* @param {CredUserSecretKey} user_secret_key - Secret key of credential user.
* @param {XfrPublicKey} user_public_key - Ledger signing key to link this credential to.
* @param {Credential} credential - Credential object.
* @param {CredUserSecretKey} user_secret_key 
* @param {XfrPublicKey} user_public_key 
* @param {Credential} credential 
* @returns {CredentialCommitment} 
*/
export function wasm_credential_commit(user_secret_key: CredUserSecretKey, user_public_key: XfrPublicKey, credential: Credential): CredentialCommitment;
/**
* Selectively reveals attributes committed to in a credential commitment
* @param {CredUserSecretKey} user_sk - Secret key of credential user.
* @param {Credential} credential - Credential object.
* @param {JsValue} reveal_fields - Array of string names representing credentials to reveal (i.e.
* `[\"credit_score\"]`).
* @param {CredUserSecretKey} user_sk 
* @param {Credential} credential 
* @param {any} reveal_fields 
* @returns {CredentialRevealSig} 
*/
export function wasm_credential_reveal(user_sk: CredUserSecretKey, credential: Credential, reveal_fields: any): CredentialRevealSig;
/**
* Verifies revealed attributes from a commitment.
* @param {CredIssuerPublicKey} issuer_pub_key - Public key of credential issuer.
* @param {JsValue} reveal_fields - Array of string names representing credentials to reveal (i.e.
* @param {JsValue} attributes - Array of attribute assignments to check of the form `[{name: \"credit_score\",
* val: \"760\"}]\'.
* `[\"credit_score\"]`).
* @param {CredentialRevealSig} reveal_sig - Credential reveal signature.
* @param {CredIssuerPublicKey} issuer_pub_key 
* @param {any} attributes 
* @param {CredentialRevealSig} reveal_sig 
*/
export function wasm_credential_verify(issuer_pub_key: CredIssuerPublicKey, attributes: any, reveal_sig: CredentialRevealSig): void;
/**
* Returns information about traceable assets for a given transfer.
* @param {JsValue} xfr_note - JSON of a transfer note from a transfer operation.
* @param {AssetTracerKeyPair} - Asset tracer keypair.
* @param {JsValue} candidate_assets - List of asset types traced by the tracer keypair.
* @param {any} xfr_body 
* @param {AssetTracerKeyPair} tracer_keypair 
* @param {any} candidate_assets 
* @returns {any} 
*/
export function trace_assets(xfr_body: any, tracer_keypair: AssetTracerKeyPair, candidate_assets: any): any;
export class AssetRules {
  free(): void;
/**
* @returns {AssetRules} 
*/
  static new(): AssetRules;
/**
* @param {boolean} traceable 
* @returns {AssetRules} 
*/
  set_traceable(traceable: boolean): AssetRules;
/**
* @param {BigInt} max_units 
* @returns {AssetRules} 
*/
  set_max_units(max_units: BigInt): AssetRules;
/**
* @param {boolean} transferable 
* @returns {AssetRules} 
*/
  set_transferable(transferable: boolean): AssetRules;
/**
* @param {boolean} updatable 
* @returns {AssetRules} 
*/
  set_updatable(updatable: boolean): AssetRules;
/**
* @param {SignatureRules} multisig_rules 
* @returns {AssetRules} 
*/
  set_transfer_multisig_rules(multisig_rules: SignatureRules): AssetRules;
}
export class AssetTracerKeyPair {
  free(): void;
/**
* @returns {AssetTracerKeyPair} 
*/
  static new(): AssetTracerKeyPair;
}
export class ClientAssetRecord {
  free(): void;
/**
* Builds a client record from an asset record fetched from the ledger server.
* @param {record} - JSON asset record fetched from server.
* @param {any} record 
* @returns {ClientAssetRecord} 
*/
  static from_json_record(record: any): ClientAssetRecord;
}
export class CredIssuerPublicKey {
  free(): void;
}
export class CredIssuerSecretKey {
  free(): void;
}
export class CredUserPublicKey {
  free(): void;
}
export class CredUserSecretKey {
  free(): void;
}
export class Credential {
  free(): void;
}
export class CredentialCommitment {
  free(): void;
}
export class CredentialIssuerKeyPair {
  free(): void;
/**
* @returns {CredIssuerPublicKey} 
*/
  get_pk(): CredIssuerPublicKey;
/**
* @returns {CredIssuerSecretKey} 
*/
  get_sk(): CredIssuerSecretKey;
/**
* @returns {any} 
*/
  to_jsvalue(): any;
/**
* @param {any} val 
* @returns {CredentialIssuerKeyPair} 
*/
  static from_jsvalue(val: any): CredentialIssuerKeyPair;
}
export class CredentialRevealSig {
  free(): void;
}
export class CredentialSignature {
  free(): void;
}
export class CredentialUserKeyPair {
  free(): void;
/**
* @returns {CredUserPublicKey} 
*/
  get_pk(): CredUserPublicKey;
/**
* @returns {CredUserSecretKey} 
*/
  get_sk(): CredUserSecretKey;
/**
* @returns {string} 
*/
  serialize(): string;
/**
* @returns {any} 
*/
  to_jsvalue(): any;
/**
* @param {any} val 
* @returns {CredentialUserKeyPair} 
*/
  static from_jsvalue(val: any): CredentialUserKeyPair;
}
export class OwnerMemo {
  free(): void;
}
export class SignatureRules {
  free(): void;
/**
* @param {BigInt} threshold 
* @param {any} weights 
* @returns {SignatureRules} 
*/
  static new(threshold: BigInt, weights: any): SignatureRules;
}
export class TransactionBuilder {
  free(): void;
/**
* Create a new transaction builder.
* @returns {TransactionBuilder} 
*/
  static new(): TransactionBuilder;
/**
* Wraps around TransactionBuilder to add an asset definition operation to a transaction builder instance.
*
* @param {XfrKeyPair} key_pair -  Issuer XfrKeyPair.
* @param {string} memo - Text field for asset definition.
* @param {string} token_code - Optional Base64 string representing the token code of the asset to be issued
* @param {AssetRules} asset_rules - Asset rules object specifying which simple policies apply
* to the asset.
* If empty, a token code will be chosen at random.
* @param {XfrKeyPair} key_pair 
* @param {string} memo 
* @param {string} token_code 
* @param {AssetRules} asset_rules 
* @returns {TransactionBuilder} 
*/
  add_operation_create_asset(key_pair: XfrKeyPair, memo: string, token_code: string, asset_rules: AssetRules): TransactionBuilder;
/**
* @param {XfrKeyPair} key_pair 
* @param {string} memo 
* @param {string} token_code 
* @param {string} policy_choice 
* @param {AssetRules} asset_rules 
* @returns {TransactionBuilder} 
*/
  add_operation_create_asset_with_policy(key_pair: XfrKeyPair, memo: string, token_code: string, policy_choice: string, asset_rules: AssetRules): TransactionBuilder;
/**
* @param {string} token_code 
* @param {string} which_check 
* @returns {TransactionBuilder} 
*/
  add_policy_option(token_code: string, which_check: string): TransactionBuilder;
/**
* Wraps around TransactionBuilder to add an asset issuance to a transaction builder instance.
*
* Use this function for simple one-shot issuances.
*
* @param {XfrKeyPair} key_pair  - Issuer XfrKeyPair.
* @param {AssetTracerKeyPair} tracer keypair - Optional tracking public key. Pass in tracing key or null. Used to decrypt amounts
* and types of traced assets.
* @param {string} code - Base64 string representing the token code of the asset to be issued.
* @param {BigInt} seq_num - Issuance sequence number. Every subsequent issuance of a given asset type must have a higher sequence number than before.
* @param {BigInt} amount - Amount to be issued.
* @param {XfrKeyPair} key_pair 
* @param {AssetTracerKeyPair} tracing_key 
* @param {string} code 
* @param {BigInt} seq_num 
* @param {BigInt} amount 
* @param {boolean} conf_amount 
* @returns {TransactionBuilder} 
*/
  add_basic_issue_asset(key_pair: XfrKeyPair, tracing_key: AssetTracerKeyPair, code: string, seq_num: BigInt, amount: BigInt, conf_amount: boolean): TransactionBuilder;
/**
* Adds an add air assign operation to a WasmTransactionBuilder instance.
* @param {XfrKeyPair} key_pair 
* @param {CredUserPublicKey} user_public_key 
* @param {CredIssuerPublicKey} issuer_public_key 
* @param {CredentialCommitment} commitment 
* @returns {TransactionBuilder} 
*/
  add_operation_air_assign(key_pair: XfrKeyPair, user_public_key: CredUserPublicKey, issuer_public_key: CredIssuerPublicKey, commitment: CredentialCommitment): TransactionBuilder;
/**
* Adds a serialized operation to a WasmTransactionBuilder instance
* @param {string} op -  a JSON-serialized operation (i.e. a transfer operation).
* @see {@link WasmTransferOperationBuilder} for details on constructing a transfer operation.
* @throws Will throw an error if `op` fails to deserialize.
* @param {string} op 
* @returns {TransactionBuilder} 
*/
  add_operation(op: string): TransactionBuilder;
/**
* @param {XfrKeyPair} kp 
* @returns {TransactionBuilder} 
*/
  sign(kp: XfrKeyPair): TransactionBuilder;
/**
* Extracts the serialized form of a transaction.
* @returns {string} 
*/
  transaction(): string;
/**
* Fetches a client record from a transaction.
* @param {number} idx - Record to fetch. Records are added to the transaction builder sequentially.
* @param {number} idx 
* @returns {ClientAssetRecord} 
*/
  get_owner_record(idx: number): ClientAssetRecord;
/**
* Fetches an owner memo from a transaction
* @param {number} idx - Record to fetch. Records are added to the transaction builder sequentially.
* @param {number} idx 
* @returns {OwnerMemo | undefined} 
*/
  get_owner_memo(idx: number): OwnerMemo | undefined;
}
export class TransferOperationBuilder {
  free(): void;
/**
* Create a new transfer operation builder.
* @returns {TransferOperationBuilder} 
*/
  static new(): TransferOperationBuilder;
/**
* @returns {string} 
*/
  debug(): string;
/**
* Wraps around TransferOperationBuilder to add an input to a transfer operation builder.
* @param {TxoRef} txo_ref - Absolute or relative utxo reference
* @param {string} oar - Serialized opened asset record to serve as transfer input. This record must exist on the
* ledger for the transfer to be valid
* @param {BigInt} amount - Amount of input record to transfer
* @param tracing_key {AssetTracerKeyPair} - Tracing key, must be added to traceable
* assets.
* @see {@link create_absolute_txo_ref} or {@link create_relative_txo_ref} for details on txo
* references.
* @see {@link get_txo} for details on fetching blind asset records.
* @throws Will throw an error if `oar` or `txo_ref` fail to deserialize.
* @param {TxoRef} txo_ref 
* @param {ClientAssetRecord} asset_record 
* @param {OwnerMemo | undefined} owner_memo 
* @param {AssetTracerKeyPair} tracing_key 
* @param {XfrKeyPair} key 
* @param {BigInt} amount 
* @returns {TransferOperationBuilder} 
*/
  add_input_with_tracking(txo_ref: TxoRef, asset_record: ClientAssetRecord, owner_memo: OwnerMemo | undefined, tracing_key: AssetTracerKeyPair, key: XfrKeyPair, amount: BigInt): TransferOperationBuilder;
/**
* Wraps around TransferOperationBuilder to add an input to a transfer operation builder.
* @param {TxoRef} txo_ref - Absolute or relative utxo reference
* @param {string} oar - Serialized opened asset record to serve as transfer input. This record must exist on the
* ledger for the transfer to be valid
* @param {BigInt} amount - Amount of input record to transfer
* @see {@link create_absolute_txo_ref} or {@link create_relative_txo_ref} for details on txo
* references.
* @see {@link get_txo} for details on fetching blind asset records.
* @throws Will throw an error if `oar` or `txo_ref` fail to deserialize.
* @param {TxoRef} txo_ref 
* @param {ClientAssetRecord} asset_record 
* @param {OwnerMemo | undefined} owner_memo 
* @param {XfrKeyPair} key 
* @param {BigInt} amount 
* @returns {TransferOperationBuilder} 
*/
  add_input_no_tracking(txo_ref: TxoRef, asset_record: ClientAssetRecord, owner_memo: OwnerMemo | undefined, key: XfrKeyPair, amount: BigInt): TransferOperationBuilder;
/**
* Wraps around TransferOperationBuilder to add an output to a transfer operation builder.
*
* @param {BigInt} amount - amount to transfer to the recipient
* @param {XfrPublicKey} recipient - public key of the recipient
* @param code {string} - String representaiton of the asset token code
* @param conf_amount {bool} - Indicates whether output\'s amount is confidential
* @param conf_type {bool} - Indicates whether output\'s asset type is confidential
* @param tracing_key {AssetTracerKeyPair} - Optional tracing key, must be added to traced
* assets.
* @throws Will throw an error if `code` fails to deserialize.
* @param {BigInt} amount 
* @param {XfrPublicKey} recipient 
* @param {AssetTracerKeyPair} tracing_key 
* @param {string} code 
* @param {boolean} conf_amount 
* @param {boolean} conf_type 
* @returns {TransferOperationBuilder} 
*/
  add_output_with_tracking(amount: BigInt, recipient: XfrPublicKey, tracing_key: AssetTracerKeyPair, code: string, conf_amount: boolean, conf_type: boolean): TransferOperationBuilder;
/**
* Wraps around TransferOperationBuilder to add an output to a transfer operation builder.
*
* @param {BigInt} amount - amount to transfer to the recipient
* @param {XfrPublicKey} recipient - public key of the recipient
* @param code {string} - String representaiton of the asset token code
* @param conf_amount {bool} - Indicates whether output\'s amount is confidential
* @param conf_type {bool} - Indicates whether output\'s asset type is confidential
* @throws Will throw an error if `code` fails to deserialize.
* @param {BigInt} amount 
* @param {XfrPublicKey} recipient 
* @param {string} code 
* @param {boolean} conf_amount 
* @param {boolean} conf_type 
* @returns {TransferOperationBuilder} 
*/
  add_output_no_tracking(amount: BigInt, recipient: XfrPublicKey, code: string, conf_amount: boolean, conf_type: boolean): TransferOperationBuilder;
/**
* Wraps around TransferOperationBuilder to ensure the transfer inputs and outputs are balanced.
* This function will add change outputs for all unspent portions of input records.
* @throws Will throw an error if the transaction cannot be balanced.
* @returns {TransferOperationBuilder} 
*/
  balance(): TransferOperationBuilder;
/**
* Wraps around TransferOperationBuilder to finalize the transaction.
*
* @param {TransferType} transfer_type - Transfer operation type.
* @throws Will throw an error if `transfer_type` fails to deserialize.
* @throws Will throw an error if input and output amounts do not add up.
* @throws Will throw an error if not all record owners have signed the transaction.
* @param {TransferType} transfer_type 
* @returns {TransferOperationBuilder} 
*/
  create(transfer_type: TransferType): TransferOperationBuilder;
/**
* Wraps around TransferOperationBuilder to add a signature to the operation.
*
* All input owners must sign.
*
* @param {XfrKeyPair} kp - key pair of one of the input owners.
* @param {XfrKeyPair} kp 
* @returns {TransferOperationBuilder} 
*/
  sign(kp: XfrKeyPair): TransferOperationBuilder;
/**
* @returns {string} 
*/
  builder(): string;
/**
* Wraps around TransferOperationBuilder to extract an operation expression as JSON.
* @returns {string} 
*/
  transaction(): string;
}
export class TransferType {
  free(): void;
/**
* Standard TransferType variant for txn builder.
* Returns a token as a string signifying that the Standard policy should be used when evaluating the transaction.
* @returns {TransferType} 
*/
  static standard_transfer_type(): TransferType;
/**
* Debt swap TransferType variant for txn builder.
* Returns a token as a string signifying that the DebtSwap policy should be used when evaluating the transaction.
* @returns {TransferType} 
*/
  static debt_transfer_type(): TransferType;
}
export class TxoRef {
  free(): void;
/**
* Creates a relative txo reference as a JSON string. Relative txo references are offset
* backwards from the operation they appear in -- 0 is the most recent, (n-1) is the first output
* of the transaction.
*
* Use relative txo indexing when referring to outputs of intermediate operations (e.g. a
* transaction containing both an issuance and a transfer).
*
* # Arguments
* @param {BigInt} idx -  Relative Txo (transaction output) SID.
* @param {BigInt} idx 
* @returns {TxoRef} 
*/
  static relative(idx: BigInt): TxoRef;
/**
* Creates an absolute transaction reference as a JSON string.
*
* Use absolute txo indexing when referring to an output that has been assigned a utxo index (i.e.
* when the utxo has been committed to the ledger in an earlier transaction).
*
* # Arguments
* @param {BigInt} idx -  Txo (transaction output) SID.
* @param {BigInt} idx 
* @returns {TxoRef} 
*/
  static absolute(idx: BigInt): TxoRef;
}
export class XfrKeyPair {
  free(): void;
/**
* @returns {XfrPublicKey} 
*/
  get_pk(): XfrPublicKey;
}
export class XfrPublicKey {
  free(): void;
}
