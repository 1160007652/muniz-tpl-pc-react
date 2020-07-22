import * as wasm from './wasm_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}
/**
* Generates random base64 encoded asset type string. Used in asset definitions.
* @see {@link TransactionBuilder#add_operation_create_asset} for instructions on how to define an asset with a new
* asset type
* @returns {string}
*/
export function random_asset_type() {
    try {
        wasm.random_asset_type(8);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* Generates a base64 encoded asset type string from a JSON-serialized JavaScript value.
* @param {any} val
* @returns {string}
*/
export function asset_type_from_jsvalue(val) {
    try {
        wasm.asset_type_from_jsvalue(8, addBorrowedObject(val));
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        heap[stack_pointer++] = undefined;
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* Given a serialized state commitment and transaction, returns true if the transaction correctly
* hashes up to the state commitment and false otherwise.
* @param {string} state_commitment - String representing the state commitment.
* @param {string} authenticated_txn - String representing the transaction.
* @see {@link get_transaction} for instructions on fetching a transaction from the ledger.
* @see {@link get_state_commitment} for instructions on fetching a ledger state commitment.
* @throws Will throw an error if the state commitment or the transaction fails to deserialize.
* @param {string} state_commitment
* @param {string} authenticated_txn
* @returns {boolean}
*/
export function verify_authenticated_txn(state_commitment, authenticated_txn) {
    var ptr0 = passStringToWasm0(state_commitment, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(authenticated_txn, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.verify_authenticated_txn(ptr0, len0, ptr1, len1);
    return ret !== 0;
}

const u32CvtShim = new Uint32Array(2);

const uint64CvtShim = new BigUint64Array(u32CvtShim.buffer);
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
export function calculate_fee(ir_numerator, ir_denominator, outstanding_balance) {
    uint64CvtShim[0] = ir_numerator;
    const low0 = u32CvtShim[0];
    const high0 = u32CvtShim[1];
    uint64CvtShim[0] = ir_denominator;
    const low1 = u32CvtShim[0];
    const high1 = u32CvtShim[1];
    uint64CvtShim[0] = outstanding_balance;
    const low2 = u32CvtShim[0];
    const high2 = u32CvtShim[1];
    wasm.calculate_fee(8, low0, high0, low1, high1, low2, high2);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    u32CvtShim[0] = r0;
    u32CvtShim[1] = r1;
    const n3 = uint64CvtShim[0];
    return n3;
}

/**
* Returns an address to use for cancelling debt tokens in a debt swap.
* @ignore
* @returns {XfrPublicKey}
*/
export function get_null_pk() {
    var ret = wasm.get_null_pk();
    return XfrPublicKey.__wrap(ret);
}

/**
* @ignore
* @returns {string}
*/
export function create_default_policy_info() {
    try {
        wasm.create_default_policy_info(8);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

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
* @ignore
* @param {BigInt} ir_numerator
* @param {BigInt} ir_denominator
* @param {string} fiat_code
* @param {BigInt} loan_amount
* @returns {string}
*/
export function create_debt_policy_info(ir_numerator, ir_denominator, fiat_code, loan_amount) {
    try {
        uint64CvtShim[0] = ir_numerator;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        uint64CvtShim[0] = ir_denominator;
        const low1 = u32CvtShim[0];
        const high1 = u32CvtShim[1];
        var ptr2 = passStringToWasm0(fiat_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        uint64CvtShim[0] = loan_amount;
        const low3 = u32CvtShim[0];
        const high3 = u32CvtShim[1];
        wasm.create_debt_policy_info(8, low0, high0, low1, high1, ptr2, len2, low3, high3);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

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
export function create_debt_memo(ir_numerator, ir_denominator, fiat_code, loan_amount) {
    try {
        uint64CvtShim[0] = ir_numerator;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        uint64CvtShim[0] = ir_denominator;
        const low1 = u32CvtShim[0];
        const high1 = u32CvtShim[1];
        var ptr2 = passStringToWasm0(fiat_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        uint64CvtShim[0] = loan_amount;
        const low3 = u32CvtShim[0];
        const high3 = u32CvtShim[1];
        wasm.create_debt_memo(8, low0, high0, low1, high1, ptr2, len2, low3, high3);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
* Returns a JavaScript object containing decrypted owner record information,
* where `amount` is the decrypted asset amount, and `asset_type` is the decrypted asset type code.
*
* @param {ClientAssetRecord} record - Owner record.
* @param {OwnerMemo} owner_memo - Owner memo of the associated record.
* @param {XfrKeyPair} keypair - Keypair of asset owner.
* @see {@link ClientAssetRecord#from_json_record} for information about how to construct an asset record object
* from a JSON result returned from the ledger server.
* @param {ClientAssetRecord} record
* @param {OwnerMemo | undefined} owner_memo
* @param {XfrKeyPair} keypair
* @returns {any}
*/
export function open_client_asset_record(record, owner_memo, keypair) {
    _assertClass(record, ClientAssetRecord);
    let ptr0 = 0;
    if (!isLikeNone(owner_memo)) {
        _assertClass(owner_memo, OwnerMemo);
        ptr0 = owner_memo.ptr;
        owner_memo.ptr = 0;
    }
    _assertClass(keypair, XfrKeyPair);
    var ret = wasm.open_client_asset_record(record.ptr, ptr0, keypair.ptr);
    return takeObject(ret);
}

/**
* Extracts the public key as a string from a transfer key pair.
* @param {XfrKeyPair} key_pair
* @returns {string}
*/
export function get_pub_key_str(key_pair) {
    try {
        _assertClass(key_pair, XfrKeyPair);
        wasm.get_pub_key_str(8, key_pair.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* Extracts the private key as a string from a transfer key pair.
* @param {XfrKeyPair} key_pair
* @returns {string}
*/
export function get_priv_key_str(key_pair) {
    try {
        _assertClass(key_pair, XfrKeyPair);
        wasm.get_priv_key_str(8, key_pair.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* Creates a new transfer key pair.
* @returns {XfrKeyPair}
*/
export function new_keypair() {
    var ret = wasm.new_keypair();
    return XfrKeyPair.__wrap(ret);
}

/**
* Generates a new keypair deterministically from a seed string and an optional name.
* @param {string} seed_str
* @param {string | undefined} name
* @returns {XfrKeyPair}
*/
export function new_keypair_from_seed(seed_str, name) {
    var ptr0 = passStringToWasm0(seed_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(name) ? 0 : passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.new_keypair_from_seed(ptr0, len0, ptr1, len1);
    return XfrKeyPair.__wrap(ret);
}

/**
* Returns base64 encoded representation of an XfrPublicKey.
* @param {XfrPublicKey} key
* @returns {string}
*/
export function public_key_to_base64(key) {
    try {
        _assertClass(key, XfrPublicKey);
        wasm.public_key_to_base64(8, key.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* Converts a base64 encoded public key string to a public key.
* @param {string} key_pair
* @returns {XfrPublicKey}
*/
export function public_key_from_base64(key_pair) {
    var ptr0 = passStringToWasm0(key_pair, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.public_key_from_base64(ptr0, len0);
    return XfrPublicKey.__wrap(ret);
}

/**
* Expresses a transfer key pair as a hex-encoded string.
* To decode the string, use `keypair_from_str` function.
* @param {XfrKeyPair} key_pair
* @returns {string}
*/
export function keypair_to_str(key_pair) {
    try {
        _assertClass(key_pair, XfrKeyPair);
        wasm.keypair_to_str(8, key_pair.ptr);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* Constructs a transfer key pair from a hex-encoded string.
* The encode a key pair, use `keypair_to_str` function.
* @param {string} str
* @returns {XfrKeyPair}
*/
export function keypair_from_str(str) {
    var ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.keypair_from_str(ptr0, len0);
    return XfrKeyPair.__wrap(ret);
}

/**
* Generates a new credential issuer key.
* @param {JsValue} attributes - Array of attribute types of the form `[{name: "credit_score",
* size: 3}]`. The size refers to byte-size of the credential. In this case, the "credit_score"
* attribute is represented as a 3 byte string "760". `attributes` is the list of attribute types
* that the issuer can sign off on.
* @param {any} attributes
* @returns {CredentialIssuerKeyPair}
*/
export function wasm_credential_issuer_key_gen(attributes) {
    var ret = wasm.wasm_credential_issuer_key_gen(addHeapObject(attributes));
    return CredentialIssuerKeyPair.__wrap(ret);
}

/**
* Verifies a credential commitment. Used to confirm that a credential is tied to a ledger
* address.
* @param {CredIssuerPublicKey} issuer_pub_key - The credential issuer that has attested to the
* credentials that have been committed to.
* @param {CredentialCommitment} Credential commitment
* @param {CredPoK} Proof of knowledge of the underlying commitment
* @param {XfrPublicKey} Ledger address linked to this credential commitment.
* @throws Will throw an error during verification failure (i.e. the supplied ledger address is
* incorrect, the commitment is tied to a different credential issuer, or the proof of knowledge is
* invalid, etc.)
* @param {CredIssuerPublicKey} issuer_pub_key
* @param {CredentialCommitment} commitment
* @param {CredentialPoK} pok
* @param {XfrPublicKey} xfr_pk
*/
export function wasm_credential_verify_commitment(issuer_pub_key, commitment, pok, xfr_pk) {
    _assertClass(issuer_pub_key, CredIssuerPublicKey);
    _assertClass(commitment, CredentialCommitment);
    _assertClass(pok, CredentialPoK);
    _assertClass(xfr_pk, XfrPublicKey);
    wasm.wasm_credential_verify_commitment(issuer_pub_key.ptr, commitment.ptr, pok.ptr, xfr_pk.ptr);
}

/**
* Generates a new credential user key.
* @param {CredIssuerPublicKey} issuer_pub_key - The credential issuer that can sign off on this
* user's attributes.
* @param {CredIssuerPublicKey} issuer_pub_key
* @returns {CredentialUserKeyPair}
*/
export function wasm_credential_user_key_gen(issuer_pub_key) {
    _assertClass(issuer_pub_key, CredIssuerPublicKey);
    var ret = wasm.wasm_credential_user_key_gen(issuer_pub_key.ptr);
    return CredentialUserKeyPair.__wrap(ret);
}

/**
* Generates a signature on user attributes that can be used to create a credential.
* @param {CredIssuerSecretKey} issuer_secret_key - Secret key of credential issuer.
* @param {CredUserPublicKey} user_public_key - Public key of credential user.
* @param {JsValue} attributes - Array of attribute assignments of the form `[{name: "credit_score",
* val: "760"}]`.
* @throws Will throw an error if the signature cannot be generated.
* @param {CredIssuerSecretKey} issuer_secret_key
* @param {CredUserPublicKey} user_public_key
* @param {any} attributes
* @returns {CredentialSignature}
*/
export function wasm_credential_sign(issuer_secret_key, user_public_key, attributes) {
    _assertClass(issuer_secret_key, CredIssuerSecretKey);
    _assertClass(user_public_key, CredUserPublicKey);
    var ret = wasm.wasm_credential_sign(issuer_secret_key.ptr, user_public_key.ptr, addHeapObject(attributes));
    return CredentialSignature.__wrap(ret);
}

/**
* Generates a signature on user attributes that can be used to create a credential.
* @param {CredIssuerPublicKey} issuer_public_key - Public key of credential issuer.
* @param {CredentialSignature} signature - Credential issuer signature on attributes.
* @param {JsValue} attributes - Array of attribute assignments of the form `[{name: "credit_score",
* val: "760"}]'.
* @param {CredIssuerPublicKey} issuer_public_key
* @param {CredentialSignature} signature
* @param {any} attributes
* @returns {Credential}
*/
export function create_credential(issuer_public_key, signature, attributes) {
    try {
        _assertClass(issuer_public_key, CredIssuerPublicKey);
        _assertClass(signature, CredentialSignature);
        var ret = wasm.create_credential(issuer_public_key.ptr, signature.ptr, addBorrowedObject(attributes));
        return Credential.__wrap(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* Generates a credential commitment. A credential commitment can be used to selectively reveal
* attribute assignments.
* @param {CredUserSecretKey} user_secret_key - Secret key of credential user.
* @param {XfrPublicKey} user_public_key - Ledger signing key to link this credential to.
* @param {Credential} credential - Credential object.
* @param {CredUserSecretKey} user_secret_key
* @param {XfrPublicKey} user_public_key
* @param {Credential} credential
* @returns {CredentialCommitmentAndPoK}
*/
export function wasm_credential_commit(user_secret_key, user_public_key, credential) {
    _assertClass(user_secret_key, CredUserSecretKey);
    _assertClass(user_public_key, XfrPublicKey);
    _assertClass(credential, Credential);
    var ret = wasm.wasm_credential_commit(user_secret_key.ptr, user_public_key.ptr, credential.ptr);
    return CredentialCommitmentAndPoK.__wrap(ret);
}

/**
* Selectively reveals attributes committed to in a credential commitment
* @param {CredUserSecretKey} user_sk - Secret key of credential user.
* @param {Credential} credential - Credential object.
* @param {JsValue} reveal_fields - Array of string names representing credentials to reveal (i.e.
* `["credit_score"]`).
* @param {CredUserSecretKey} user_sk
* @param {Credential} credential
* @param {any} reveal_fields
* @returns {CredentialRevealSig}
*/
export function wasm_credential_reveal(user_sk, credential, reveal_fields) {
    _assertClass(user_sk, CredUserSecretKey);
    _assertClass(credential, Credential);
    var ret = wasm.wasm_credential_reveal(user_sk.ptr, credential.ptr, addHeapObject(reveal_fields));
    return CredentialRevealSig.__wrap(ret);
}

/**
* Verifies revealed attributes from a commitment.
* @param {CredIssuerPublicKey} issuer_pub_key - Public key of credential issuer.
* @param {JsValue} attributes - Array of attribute assignments to check of the form `[{name: "credit_score",
* val: "760"}]`.
* @param {CredentialRevealSig} reveal_sig - Credential reveal signature.
* @param {CredIssuerPublicKey} issuer_pub_key
* @param {any} attributes
* @param {CredentialRevealSig} reveal_sig
*/
export function wasm_credential_verify(issuer_pub_key, attributes, reveal_sig) {
    _assertClass(issuer_pub_key, CredIssuerPublicKey);
    _assertClass(reveal_sig, CredentialRevealSig);
    wasm.wasm_credential_verify(issuer_pub_key.ptr, addHeapObject(attributes), reveal_sig.ptr);
}

/**
* Returns information about traceable assets for a given transfer.
* @param {JsValue} xfr_body - JSON of a transfer note from a transfer operation.
* @param {AssetTracerKeyPair} tracer_keypair - Asset tracer keypair.
* @param {JsValue} candidate_assets - List of asset types traced by the tracer keypair.
* @param {any} xfr_body
* @param {AssetTracerKeyPair} tracer_keypair
* @param {any} candidate_assets
* @returns {any}
*/
export function trace_assets(xfr_body, tracer_keypair, candidate_assets) {
    _assertClass(tracer_keypair, AssetTracerKeyPair);
    var ret = wasm.trace_assets(addHeapObject(xfr_body), tracer_keypair.ptr, addHeapObject(candidate_assets));
    return takeObject(ret);
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* Simple asset rules:
* 1. **Traceable**: Records and identities of traceable assets can be decrypted by a provided tracking key. By defaults, assets do not have
* any tracing policies.
* 2. **Transferable**: Non-transferable assets can only be transferred once from the issuer to another user. By default, assets are transferable.
* 3. **Updatable**: Whether the asset memo can be updated. By default, assets are not updatable.
* 4. **Transfer signature rules**: Signature weights and threshold for a valid transfer. By
*    default, there are no special signature requirements.
* 5. **Max units**: Optional limit on the total number of units of this asset that can be issued.
*    By default, assets do not have issuance caps.
* @see {@link TracingPolicies} for more information about tracing policies.
* @see {@link TransactionBuilder#add_operation_update_memo|add_operation_update_memo} for more information about how to add
* a memo update operation to a transaction.
* @see {@link SignatureRules} for more information about co-signatures.
* @see {@link TransactionBuilder#add_operation_create_asset|add_operation_create_asset} for information about how to add asset rules to an asset definition.
*/
export class AssetRules {

    static __wrap(ptr) {
        const obj = Object.create(AssetRules.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_assetrules_free(ptr);
    }
    /**
    * Create a default set of asset rules. See class description for defaults.
    * @returns {AssetRules}
    */
    static new() {
        var ret = wasm.assetrules_new();
        return AssetRules.__wrap(ret);
    }
    /**
    * Adds an asset tracing policy.
    * @param {TracingPolicy} policy - Tracing policy for the new asset.
    * @param {TracingPolicy} policy
    * @returns {AssetRules}
    */
    add_tracing_policy(policy) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(policy, TracingPolicy);
        var ret = wasm.assetrules_add_tracing_policy(ptr, policy.ptr);
        return AssetRules.__wrap(ret);
    }
    /**
    * Set a cap on the number of units of this asset that can be issued.
    * @param {BigInt} max_units - Maximum number of units that can be issued.
    * @param {BigInt} max_units
    * @returns {AssetRules}
    */
    set_max_units(max_units) {
        var ptr = this.ptr;
        this.ptr = 0;
        uint64CvtShim[0] = max_units;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        var ret = wasm.assetrules_set_max_units(ptr, low0, high0);
        return AssetRules.__wrap(ret);
    }
    /**
    * Transferability toggle. Assets that are not transferable can only be transferred by the asset
    * issuer.
    * @param {boolean} transferable - Boolean indicating whether asset can be transferred.
    * @param {boolean} transferable
    * @returns {AssetRules}
    */
    set_transferable(transferable) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.assetrules_set_transferable(ptr, transferable);
        return AssetRules.__wrap(ret);
    }
    /**
    * The updatable flag determines whether the asset memo can be updated after issuance.
    * @param {boolean} updatable - Boolean indicating whether asset memo can be updated.
    * @see {@link TransactionBuilder#add_operation_update_memo} for more information about how to add
    * a memo update operation to a transaction.
    * @param {boolean} updatable
    * @returns {AssetRules}
    */
    set_updatable(updatable) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.assetrules_set_updatable(ptr, updatable);
        return AssetRules.__wrap(ret);
    }
    /**
    * Co-signature rules. Assets with co-signatue rules require additional weighted signatures to
    * be transferred.
    * @param {SignatureRules} multisig_rules - Co-signature restrictions.
    * @param {SignatureRules} multisig_rules
    * @returns {AssetRules}
    */
    set_transfer_multisig_rules(multisig_rules) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(multisig_rules, SignatureRules);
        var ptr0 = multisig_rules.ptr;
        multisig_rules.ptr = 0;
        var ret = wasm.assetrules_set_transfer_multisig_rules(ptr, ptr0);
        return AssetRules.__wrap(ret);
    }
}
/**
* Key pair used by asset tracers to decrypt asset amounts, types, and identity
* commitments associated with traceable asset transfers.
* @see {@link TracingPolicy} for information about tracing policies.
* @see {@link AssetRules#add_tracing_policy} for information about how to add a tracing policy to
* an asset definition.
*/
export class AssetTracerKeyPair {

    static __wrap(ptr) {
        const obj = Object.create(AssetTracerKeyPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_assettracerkeypair_free(ptr);
    }
    /**
    * Creates a new tracer key pair.
    * @returns {AssetTracerKeyPair}
    */
    static new() {
        var ret = wasm.assettracerkeypair_new();
        return AssetTracerKeyPair.__wrap(ret);
    }
}
/**
* Object representing an asset definition. Used to fetch tracing policies and any other
* information that may be required to construct a valid transfer or issuance.
*/
export class AssetType {

    static __wrap(ptr) {
        const obj = Object.create(AssetType.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_assettype_free(ptr);
    }
    /**
    * Builds an asset type from a JSON-encoded JavaScript value.
    * @param {JsValue} val - JSON-encoded asset type fetched from ledger server.
    * @see {@link Network#getAssetProperties|Network.getAsset} for information about how to
    * fetch an asset type from the ledger server.
    * @param {any} json
    * @returns {AssetType}
    */
    static from_json(json) {
        try {
            var ret = wasm.assettype_from_json(addBorrowedObject(json));
            return AssetType.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * Fetch the tracing policies associated with this asset type.
    * @returns {TracingPolicies}
    */
    get_tracing_policies() {
        var ret = wasm.assettype_get_tracing_policies(this.ptr);
        return TracingPolicies.__wrap(ret);
    }
}
/**
* Authenticated address identity registry value. Contains a proof that the AIR result is stored
* on the ledger.
*/
export class AuthenticatedAIRResult {

    static __wrap(ptr) {
        const obj = Object.create(AuthenticatedAIRResult.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_authenticatedairresult_free(ptr);
    }
    /**
    * Construct an AIRResult from the JSON-encoded value returned by the ledger.
    * @see {@link Network#getAIRResult|Network.getAIRResult} for information about how to fetch a
    * value from the address identity registry.
    * @param {any} json
    * @returns {AuthenticatedAIRResult}
    */
    static from_json(json) {
        try {
            var ret = wasm.authenticatedairresult_from_json(addBorrowedObject(json));
            return AuthenticatedAIRResult.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
    * Returns true if the authenticated AIR result proofs verify succesfully. If the proofs are
    * valid, the identity commitment contained in the AIR result is a valid part of the ledger.
    * @param {string} state_commitment - String representing the ledger state commitment.
    * @param {string} state_commitment
    * @returns {boolean}
    */
    is_valid(state_commitment) {
        var ptr0 = passStringToWasm0(state_commitment, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.authenticatedairresult_is_valid(this.ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
    * Returns the underlying credential commitment of the AIR result.
    * @returns {CredentialCommitment | undefined}
    */
    get_commitment() {
        var ret = wasm.authenticatedairresult_get_commitment(this.ptr);
        return ret === 0 ? undefined : CredentialCommitment.__wrap(ret);
    }
}
/**
* Object representing an authenticable asset record. Clients can validate authentication proofs
* against a ledger state commitment.
*/
export class AuthenticatedAssetRecord {

    static __wrap(ptr) {
        const obj = Object.create(AuthenticatedAssetRecord.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_authenticatedassetrecord_free(ptr);
    }
    /**
    * Given a serialized state commitment, returns true if the
    * authenticated UTXO proofs validate correctly and false otherwise. If the proofs validate, the
    * asset record contained in this structure exists on the ledger and is unspent.
    * @param {string} state_commitment - String representing the state commitment.
    * @see {@link Network#getStateCommitment|Network.getStateCommitment} for instructions on fetching a ledger state commitment.
    * @throws Will throw an error if the state commitment fails to deserialize.
    * @param {string} state_commitment
    * @returns {boolean}
    */
    is_valid(state_commitment) {
        var ptr0 = passStringToWasm0(state_commitment, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.authenticatedassetrecord_is_valid(this.ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
    * Builds an AuthenticatedAssetRecord from a JSON-encoded asset record returned from the ledger
    * server.
    * @param {JsValue} val - JSON-encoded asset record fetched from ledger server.
    * @see {@link Network#getUtxo|Network.getUtxo} for information about how to
    * fetch an asset record from the ledger server.
    * @param {any} record
    * @returns {AuthenticatedAssetRecord}
    */
    static from_json_record(record) {
        try {
            var ret = wasm.authenticatedassetrecord_from_json_record(addBorrowedObject(record));
            return AuthenticatedAssetRecord.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
* This object represents an asset record owned by a ledger key pair.
* @see {@link open_client_asset_record} for information about how to decrypt an encrypted asset
* record.
*/
export class ClientAssetRecord {

    static __wrap(ptr) {
        const obj = Object.create(ClientAssetRecord.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_clientassetrecord_free(ptr);
    }
    /**
    * Builds a client record from a JSON-encodedJavaScript value.
    * @param {JsValue} val - JSON-encoded authenticated asset record fetched from ledger server.
    * @see {@link Network#getUtxo|Network.getUtxo} for information about how to
    * fetch an asset record from the ledger server.
    * @param {any} val
    * @returns {ClientAssetRecord}
    */
    static from_json(val) {
        try {
            var ret = wasm.clientassetrecord_from_json(addBorrowedObject(val));
            return ClientAssetRecord.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
* Public key of a credential issuer.
*/
export class CredIssuerPublicKey {

    static __wrap(ptr) {
        const obj = Object.create(CredIssuerPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credissuerpublickey_free(ptr);
    }
}
/**
* Secret key of a credential issuer.
*/
export class CredIssuerSecretKey {

    static __wrap(ptr) {
        const obj = Object.create(CredIssuerSecretKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credissuersecretkey_free(ptr);
    }
}
/**
* Public key of a credential user.
*/
export class CredUserPublicKey {

    static __wrap(ptr) {
        const obj = Object.create(CredUserPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_creduserpublickey_free(ptr);
    }
}
/**
* Secret key of a credential user.
*/
export class CredUserSecretKey {

    static __wrap(ptr) {
        const obj = Object.create(CredUserSecretKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credusersecretkey_free(ptr);
    }
}
/**
* A user credential that can be used to selectively reveal credential attributes.
* @see {@link wasm_credential_commit} for information about how to commit to a credential.
* @see {@link wasm_credential_reveal} for information about how to selectively reveal credential
* attributes.
*/
export class Credential {

    static __wrap(ptr) {
        const obj = Object.create(Credential.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credential_free(ptr);
    }
}
/**
* Commitment to a credential record.
* @see {@link wasm_credential_verify_commitment} for information about how to verify a
* credential commitment.
*/
export class CredentialCommitment {

    static __wrap(ptr) {
        const obj = Object.create(CredentialCommitment.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialcommitment_free(ptr);
    }
}
/**
* Commitment to a credential record and proof that the commitment is a valid re-randomization of a
* commitment signed by a certain credential issuer.
*/
export class CredentialCommitmentAndPoK {

    static __wrap(ptr) {
        const obj = Object.create(CredentialCommitmentAndPoK.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialcommitmentandpok_free(ptr);
    }
    /**
    * Returns the underlying credential commitment.
    * @see {@link wasm_credential_verify_commitment} for information about how to verify a
    * credential commitment.
    * @returns {CredentialCommitment}
    */
    get_commitment() {
        var ret = wasm.credentialcommitmentandpok_get_commitment(this.ptr);
        return CredentialCommitment.__wrap(ret);
    }
    /**
    * Returns the underlying proof of knowledge that the credential is a valid re-randomization.
    * @see {@link wasm_credential_verify_commitment} for information about how to verify a
    * credential commitment.
    * @returns {CredentialPoK}
    */
    get_pok() {
        var ret = wasm.credentialcommitmentandpok_get_pok(this.ptr);
        return CredentialPoK.__wrap(ret);
    }
}
/**
* Key pair of a credential issuer.
*/
export class CredentialIssuerKeyPair {

    static __wrap(ptr) {
        const obj = Object.create(CredentialIssuerKeyPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialissuerkeypair_free(ptr);
    }
    /**
    * Returns the credential issuer's public key.
    * @returns {CredIssuerPublicKey}
    */
    get_pk() {
        var ret = wasm.credentialissuerkeypair_get_pk(this.ptr);
        return CredIssuerPublicKey.__wrap(ret);
    }
    /**
    * Returns the credential issuer's secret key.
    * @returns {CredIssuerSecretKey}
    */
    get_sk() {
        var ret = wasm.credentialissuerkeypair_get_sk(this.ptr);
        return CredIssuerSecretKey.__wrap(ret);
    }
    /**
    * Convert the key pair to a serialized value that can be used in the browser.
    * @returns {any}
    */
    to_json() {
        var ret = wasm.credentialissuerkeypair_to_json(this.ptr);
        return takeObject(ret);
    }
    /**
    * Generate a key pair from a JSON-serialized JavaScript value.
    * @param {any} val
    * @returns {CredentialIssuerKeyPair}
    */
    static from_json(val) {
        try {
            var ret = wasm.credentialissuerkeypair_from_json(addBorrowedObject(val));
            return CredentialIssuerKeyPair.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
* Proof that a credential is a valid re-randomization of a credential signed by a certain asset
* issuer.
* @see {@link wasm_credential_verify_commitment} for information about how to verify a
* credential commitment.
*/
export class CredentialPoK {

    static __wrap(ptr) {
        const obj = Object.create(CredentialPoK.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialpok_free(ptr);
    }
}
/**
* Reveal signature of a credential record.
*/
export class CredentialRevealSig {

    static __wrap(ptr) {
        const obj = Object.create(CredentialRevealSig.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialrevealsig_free(ptr);
    }
}
/**
* Signature of a credential record.
*/
export class CredentialSignature {

    static __wrap(ptr) {
        const obj = Object.create(CredentialSignature.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialsignature_free(ptr);
    }
}
/**
* Key pair of a credential user.
*/
export class CredentialUserKeyPair {

    static __wrap(ptr) {
        const obj = Object.create(CredentialUserKeyPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_credentialuserkeypair_free(ptr);
    }
    /**
    * Returns the credential issuer's public key.
    * @returns {CredUserPublicKey}
    */
    get_pk() {
        var ret = wasm.credentialuserkeypair_get_pk(this.ptr);
        return CredUserPublicKey.__wrap(ret);
    }
    /**
    * Returns the credential issuer's secret key.
    * @returns {CredUserSecretKey}
    */
    get_sk() {
        var ret = wasm.credentialuserkeypair_get_sk(this.ptr);
        return CredUserSecretKey.__wrap(ret);
    }
    /**
    * Convert the key pair to a serialized value that can be used in the browser.
    * @returns {any}
    */
    to_json() {
        var ret = wasm.credentialuserkeypair_to_json(this.ptr);
        return takeObject(ret);
    }
    /**
    * Generate a key pair from a JSON-serialized JavaScript value.
    * @param {any} val
    * @returns {CredentialUserKeyPair}
    */
    static from_json(val) {
        try {
            var ret = wasm.credentialuserkeypair_from_json(addBorrowedObject(val));
            return CredentialUserKeyPair.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
* Blinding factor for a custom data operation. A blinding factor adds a random value to the
* custom data being hashed to make the hash hiding.
*/
export class KVBlind {

    static __wrap(ptr) {
        const obj = Object.create(KVBlind.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_kvblind_free(ptr);
    }
    /**
    * Generate a random blinding factor.
    * @returns {KVBlind}
    */
    static gen_random() {
        var ret = wasm.kvblind_gen_random();
        return KVBlind.__wrap(ret);
    }
}
/**
* Hash that can be stored in the ledger's custom data store.
*/
export class KVHash {

    static __wrap(ptr) {
        const obj = Object.create(KVHash.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_kvhash_free(ptr);
    }
    /**
    * Generate a new custom data hash without a blinding factor.
    * @param {string} data
    * @returns {KVHash}
    */
    static new_no_blind(data) {
        var ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.kvhash_new_no_blind(ptr0, len0);
        return KVHash.__wrap(ret);
    }
    /**
    * Generate a new custom data hash with a blinding factor.
    * @param {string} data
    * @param {KVBlind} kv_blind
    * @returns {KVHash}
    */
    static new_with_blind(data, kv_blind) {
        var ptr0 = passStringToWasm0(data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        _assertClass(kv_blind, KVBlind);
        var ret = wasm.kvhash_new_with_blind(ptr0, len0, kv_blind.ptr);
        return KVHash.__wrap(ret);
    }
}
/**
* Key for hashes in the ledger's custom data store.
*/
export class Key {

    static __wrap(ptr) {
        const obj = Object.create(Key.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_key_free(ptr);
    }
    /**
    * Generate a random key.
    * Figure out how to store prng ref in browser: https://bugtracker.findora.org/issues/63
    * @returns {Key}
    */
    static gen_random() {
        var ret = wasm.key_gen_random();
        return Key.__wrap(ret);
    }
}
/**
* Asset owner memo. Contains information needed to decrypt an asset record.
* @see {@link ClientAssetRecord} for more details about asset records.
*/
export class OwnerMemo {

    static __wrap(ptr) {
        const obj = Object.create(OwnerMemo.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_ownermemo_free(ptr);
    }
    /**
    * Builds an owner memo from a JSON-serialized JavaScript value.
    * @param {JsValue} val - JSON owner memo fetched from query server with the `get_owner_memo/{sid}` route,
    * where `sid` can be fetched from the query server with the `get_owned_utxos/{address}` route.
    * * E.g.: `{"blind_share":[91,251,44,28,7,221,67,155,175,213,25,183,70,90,119,232,212,238,226,142,159,200,54,19,60,115,38,221,248,202,74,248],
    * "lock":{"ciphertext":[119,54,117,136,125,133,112,193],"encoded_rand":"8KDql2JphPB5WLd7-aYE1bxTQAcweFSmrqymLvPDntM="}}`.
    * @param {any} val
    * @returns {OwnerMemo}
    */
    static from_json(val) {
        try {
            var ret = wasm.ownermemo_from_json(addBorrowedObject(val));
            return OwnerMemo.__wrap(ret);
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
}
/**
* Public parameters necessary for generating asset records. Generating this is expensive and
* should be done as infrequently as possible.
* @see {@link TransactionBuilder#add_basic_issue_asset}
*/
export class PublicParams {

    static __wrap(ptr) {
        const obj = Object.create(PublicParams.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_publicparams_free(ptr);
    }
    /**
    * Generates a new set of parameters.
    * @returns {PublicParams}
    */
    static new() {
        var ret = wasm.publicparams_new();
        return PublicParams.__wrap(ret);
    }
}
/**
* Stores threshold and weights for a multisignature requirement.
*/
export class SignatureRules {

    static __wrap(ptr) {
        const obj = Object.create(SignatureRules.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_signaturerules_free(ptr);
    }
    /**
    * @param {BigInt} threshold
    * @param {any} weights
    * @returns {SignatureRules}
    */
    static new(threshold, weights) {
        uint64CvtShim[0] = threshold;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        var ret = wasm.signaturerules_new(low0, high0, addHeapObject(weights));
        return SignatureRules.__wrap(ret);
    }
}
/**
* A collection of tracing policies. Use this object when constructing asset transfers to generate
* the correct tracing proofs for traceable assets.
*/
export class TracingPolicies {

    static __wrap(ptr) {
        const obj = Object.create(TracingPolicies.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_tracingpolicies_free(ptr);
    }
}
/**
* Tracing policy for asset transfers. Can be configured to track credentials, the asset type and
* amount, or both.
*/
export class TracingPolicy {

    static __wrap(ptr) {
        const obj = Object.create(TracingPolicy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_tracingpolicy_free(ptr);
    }
    /**
    * @param {AssetTracerKeyPair} tracing_key
    * @returns {TracingPolicy}
    */
    static new_with_tracking(tracing_key) {
        _assertClass(tracing_key, AssetTracerKeyPair);
        var ret = wasm.tracingpolicy_new_with_tracking(tracing_key.ptr);
        return TracingPolicy.__wrap(ret);
    }
    /**
    * @param {AssetTracerKeyPair} tracing_key
    * @param {CredIssuerPublicKey} cred_issuer_key
    * @param {any} reveal_map
    * @param {boolean} tracking
    * @returns {TracingPolicy}
    */
    static new_with_identity_tracking(tracing_key, cred_issuer_key, reveal_map, tracking) {
        _assertClass(tracing_key, AssetTracerKeyPair);
        _assertClass(cred_issuer_key, CredIssuerPublicKey);
        var ret = wasm.tracingpolicy_new_with_identity_tracking(tracing_key.ptr, cred_issuer_key.ptr, addHeapObject(reveal_map), tracking);
        return TracingPolicy.__wrap(ret);
    }
}
/**
* Structure that allows users to construct arbitrary transactions.
*/
export class TransactionBuilder {

    static __wrap(ptr) {
        const obj = Object.create(TransactionBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transactionbuilder_free(ptr);
    }
    /**
    * Create a new transaction builder.
    * @param {BigInt} seq_id
    * @returns {TransactionBuilder}
    */
    static new(seq_id) {
        uint64CvtShim[0] = seq_id;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        var ret = wasm.transactionbuilder_new(low0, high0);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransactionBuilder to add an asset definition operation to a transaction builder instance.
    * @example <caption> Error handling </caption>
    * try {
    *     await wasm.add_operation_create_asset(wasm.new_keypair(), "test_memo", wasm.random_asset_type(), wasm.AssetRules.default());
    * } catch (err) {
    *     console.log(err)
    * }
    *
    * @param {XfrKeyPair} key_pair -  Issuer XfrKeyPair.
    * @param {string} memo - Text field for asset definition.
    * @param {string} token_code - Optional Base64 string representing the token code of the asset to be issued.
    * If empty, a token code will be chosen at random.
    * @param {AssetRules} asset_rules - Asset rules object specifying which simple policies apply
    * to the asset.
    * @param {XfrKeyPair} key_pair
    * @param {string} memo
    * @param {string} token_code
    * @param {AssetRules} asset_rules
    * @returns {TransactionBuilder}
    */
    add_operation_create_asset(key_pair, memo, token_code, asset_rules) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(key_pair, XfrKeyPair);
        var ptr0 = passStringToWasm0(memo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(token_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        _assertClass(asset_rules, AssetRules);
        var ptr2 = asset_rules.ptr;
        asset_rules.ptr = 0;
        var ret = wasm.transactionbuilder_add_operation_create_asset(ptr, key_pair.ptr, ptr0, len0, ptr1, len1, ptr2);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * @ignore
    * @param {XfrKeyPair} key_pair
    * @param {string} memo
    * @param {string} token_code
    * @param {string} policy_choice
    * @param {AssetRules} asset_rules
    * @returns {TransactionBuilder}
    */
    add_operation_create_asset_with_policy(key_pair, memo, token_code, policy_choice, asset_rules) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(key_pair, XfrKeyPair);
        var ptr0 = passStringToWasm0(memo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(token_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passStringToWasm0(policy_choice, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        _assertClass(asset_rules, AssetRules);
        var ptr3 = asset_rules.ptr;
        asset_rules.ptr = 0;
        var ret = wasm.transactionbuilder_add_operation_create_asset_with_policy(ptr, key_pair.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * @ignore
    * @param {string} token_code
    * @param {string} which_check
    * @returns {TransactionBuilder}
    */
    add_policy_option(token_code, which_check) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ptr0 = passStringToWasm0(token_code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(which_check, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.transactionbuilder_add_policy_option(ptr, ptr0, len0, ptr1, len1);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransactionBuilder to add an asset issuance to a transaction builder instance.
    *
    * Use this function for simple one-shot issuances.
    *
    * @param {XfrKeyPair} key_pair  - Issuer XfrKeyPair.
    * and types of traced assets.
    * @param {string} code - Base64 string representing the token code of the asset to be issued.
    * @param {BigInt} seq_num - Issuance sequence number. Every subsequent issuance of a given asset type must have a higher sequence number than before.
    * @param {BigInt} amount - Amount to be issued.
    * @param {boolean} conf_amount - `true` means the asset amount is confidential, and `false` means it's nonconfidential.
    * @param {PublicParams} zei_params - Public parameters necessary to generate asset records.
    * @param {XfrKeyPair} key_pair
    * @param {string} code
    * @param {BigInt} seq_num
    * @param {BigInt} amount
    * @param {boolean} conf_amount
    * @param {PublicParams} zei_params
    * @returns {TransactionBuilder}
    */
    add_basic_issue_asset(key_pair, code, seq_num, amount, conf_amount, zei_params) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(key_pair, XfrKeyPair);
        var ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        uint64CvtShim[0] = seq_num;
        const low1 = u32CvtShim[0];
        const high1 = u32CvtShim[1];
        uint64CvtShim[0] = amount;
        const low2 = u32CvtShim[0];
        const high2 = u32CvtShim[1];
        _assertClass(zei_params, PublicParams);
        var ret = wasm.transactionbuilder_add_basic_issue_asset(ptr, key_pair.ptr, ptr0, len0, low1, high1, low2, high2, conf_amount, zei_params.ptr);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Adds an operation to the transaction builder that appends a credential commitment to the address
    * identity registry.
    * @param {XfrKeyPair} key_pair - Ledger key that is tied to the credential.
    * @param {CredUserPublicKey} user_public_key - Public key of the credential user.
    * @param {CredIssuerPublicKey} issuer_public_key - Public key of the credential issuer.
    * @param {CredentialCommitment} commitment - Credential commitment to add to the address identity registry.
    * @param {CredPoK} pok- Proof that a credential commitment is a valid re-randomization.
    * @see {@link wasm_credential_commit} for information about how to generate a credential
    * commitment.
    * @param {XfrKeyPair} key_pair
    * @param {CredUserPublicKey} user_public_key
    * @param {CredIssuerPublicKey} issuer_public_key
    * @param {CredentialCommitment} commitment
    * @param {CredentialPoK} pok
    * @returns {TransactionBuilder}
    */
    add_operation_air_assign(key_pair, user_public_key, issuer_public_key, commitment, pok) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(key_pair, XfrKeyPair);
        _assertClass(user_public_key, CredUserPublicKey);
        _assertClass(issuer_public_key, CredIssuerPublicKey);
        _assertClass(commitment, CredentialCommitment);
        _assertClass(pok, CredentialPoK);
        var ret = wasm.transactionbuilder_add_operation_air_assign(ptr, key_pair.ptr, user_public_key.ptr, issuer_public_key.ptr, commitment.ptr, pok.ptr);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Adds an operation to the transaction builder that removes a hash from ledger's custom data
    * store.
    * @param {XfrKeyPair} auth_key_pair - Key pair that is authorized to delete the hash at the
    * provided key.
    * @param {Key} key - The key of the custom data store whose value will be cleared if the
    * transaction validates.
    * @param {BigInt} seq_num - Nonce to prevent replays.
    * @param {XfrKeyPair} auth_key_pair
    * @param {Key} key
    * @param {BigInt} seq_num
    * @returns {TransactionBuilder}
    */
    add_operation_kv_update_no_hash(auth_key_pair, key, seq_num) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(auth_key_pair, XfrKeyPair);
        _assertClass(key, Key);
        uint64CvtShim[0] = seq_num;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        var ret = wasm.transactionbuilder_add_operation_kv_update_no_hash(ptr, auth_key_pair.ptr, key.ptr, low0, high0);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Adds an operation to the transaction builder that adds a hash to the ledger's custom data
    * store.
    * @param {XfrKeyPair} auth_key_pair - Key pair that is authorized to add the hash at the
    * provided key.
    * @param {Key} key - The key of the custom data store the value will be added to if the
    * transaction validates.
    * @param {KVHash} hash - The hash to add to the custom data store.
    * @param {BigInt} seq_num - Nonce to prevent replays.
    * @param {XfrKeyPair} auth_key_pair
    * @param {Key} key
    * @param {BigInt} seq_num
    * @param {KVHash} kv_hash
    * @returns {TransactionBuilder}
    */
    add_operation_kv_update_with_hash(auth_key_pair, key, seq_num, kv_hash) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(auth_key_pair, XfrKeyPair);
        _assertClass(key, Key);
        uint64CvtShim[0] = seq_num;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        _assertClass(kv_hash, KVHash);
        var ret = wasm.transactionbuilder_add_operation_kv_update_with_hash(ptr, auth_key_pair.ptr, key.ptr, low0, high0, kv_hash.ptr);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Adds an operation to the transaction builder that adds a hash to the ledger's custom data
    * store.
    * @param {XfrKeyPair} auth_key_pair - Asset creator key pair.
    * @param {String} key - The base64-encoded token code of the asset whose memo will be updated.
    * transaction validates.
    * @param {String} new_memo - The new asset memo.
    * @see {@link AssetRules#set_updatable|AssetRules.set_updatable} for more information about how
    * to define an updatable asset.
    * @param {XfrKeyPair} auth_key_pair
    * @param {string} code
    * @param {string} new_memo
    * @returns {TransactionBuilder}
    */
    add_operation_update_memo(auth_key_pair, code, new_memo) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(auth_key_pair, XfrKeyPair);
        var ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(new_memo, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.transactionbuilder_add_operation_update_memo(ptr, auth_key_pair.ptr, ptr0, len0, ptr1, len1);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Adds a serialized transfer asset operation to a transaction builder instance.
    * @param {string} op - a JSON-serialized transfer operation.
    * @see {@link TransferOperationBuilder} for details on constructing a transfer operation.
    * @throws Will throw an error if `op` fails to deserialize.
    * @param {string} op
    * @returns {TransactionBuilder}
    */
    add_transfer_operation(op) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ptr0 = passStringToWasm0(op, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.transactionbuilder_add_transfer_operation(ptr, ptr0, len0);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * @param {XfrKeyPair} kp
    * @returns {TransactionBuilder}
    */
    sign(kp) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(kp, XfrKeyPair);
        var ret = wasm.transactionbuilder_sign(ptr, kp.ptr);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Extracts the serialized form of a transaction.
    * @returns {string}
    */
    transaction() {
        try {
            wasm.transactionbuilder_transaction(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Fetches a client record from a transaction.
    * @param {number} idx - Record to fetch. Records are added to the transaction builder sequentially.
    * @param {number} idx
    * @returns {ClientAssetRecord}
    */
    get_owner_record(idx) {
        var ret = wasm.transactionbuilder_get_owner_record(this.ptr, idx);
        return ClientAssetRecord.__wrap(ret);
    }
    /**
    * Fetches an owner memo from a transaction
    * @param {number} idx - Owner memo to fetch. Owner memos are added to the transaction builder sequentially.
    * @param {number} idx
    * @returns {OwnerMemo | undefined}
    */
    get_owner_memo(idx) {
        var ret = wasm.transactionbuilder_get_owner_memo(this.ptr, idx);
        return ret === 0 ? undefined : OwnerMemo.__wrap(ret);
    }
}
/**
* Structure that enables clients to construct complex transfers.
*/
export class TransferOperationBuilder {

    static __wrap(ptr) {
        const obj = Object.create(TransferOperationBuilder.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transferoperationbuilder_free(ptr);
    }
    /**
    * Create a new transfer operation builder.
    * @returns {TransferOperationBuilder}
    */
    static new() {
        var ret = wasm.transferoperationbuilder_new();
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * @ignore
    * @returns {string}
    */
    debug() {
        try {
            wasm.transferoperationbuilder_debug(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Wraps around TransferOperationBuilder to add an input to a transfer operation builder.
    * @param {TxoRef} txo_ref - Absolute or relative utxo reference
    * @param {string} asset_record - Serialized client asset record to serve as transfer input. This record must exist on the
    * ledger for the transfer to be valid.
    * @param {OwnerMemo} owner_memo - Opening parameters.
    * @param tracing_key {AssetTracerKeyPair} - Tracing key, must be added to traceable
    * assets.
    * @param {XfrKeyPair} key - Key pair associated with the input.
    * @param {BigInt} amount - Amount of input record to transfer.
    * @see {@link create_absolute_txo_ref} or {@link create_relative_txo_ref} for details on txo
    * references.
    * @see {@link get_txo} for details on fetching blind asset records.
    * @throws Will throw an error if `oar` or `txo_ref` fail to deserialize.
    * @param {TxoRef} txo_ref
    * @param {ClientAssetRecord} asset_record
    * @param {OwnerMemo | undefined} owner_memo
    * @param {TracingPolicies} tracing_policies
    * @param {XfrKeyPair} key
    * @param {BigInt} amount
    * @returns {TransferOperationBuilder}
    */
    add_input_with_tracking(txo_ref, asset_record, owner_memo, tracing_policies, key, amount) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(txo_ref, TxoRef);
        var ptr0 = txo_ref.ptr;
        txo_ref.ptr = 0;
        _assertClass(asset_record, ClientAssetRecord);
        var ptr1 = asset_record.ptr;
        asset_record.ptr = 0;
        let ptr2 = 0;
        if (!isLikeNone(owner_memo)) {
            _assertClass(owner_memo, OwnerMemo);
            ptr2 = owner_memo.ptr;
            owner_memo.ptr = 0;
        }
        _assertClass(tracing_policies, TracingPolicies);
        _assertClass(key, XfrKeyPair);
        uint64CvtShim[0] = amount;
        const low3 = u32CvtShim[0];
        const high3 = u32CvtShim[1];
        var ret = wasm.transferoperationbuilder_add_input_with_tracking(ptr, ptr0, ptr1, ptr2, tracing_policies.ptr, key.ptr, low3, high3);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransferOperationBuilder to add an input to a transfer operation builder.
    * @param {TxoRef} txo_ref - Absolute or relative utxo reference
    * @param {string} asset_record - Serialized client asset record to serve as transfer input. This record must exist on the
    * ledger for the transfer to be valid
    * @param {OwnerMemo} owner_memo - Opening parameters.
    * @param {XfrKeyPair} key - Key pair associated with the input.
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
    add_input_no_tracking(txo_ref, asset_record, owner_memo, key, amount) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(txo_ref, TxoRef);
        var ptr0 = txo_ref.ptr;
        txo_ref.ptr = 0;
        _assertClass(asset_record, ClientAssetRecord);
        var ptr1 = asset_record.ptr;
        asset_record.ptr = 0;
        let ptr2 = 0;
        if (!isLikeNone(owner_memo)) {
            _assertClass(owner_memo, OwnerMemo);
            ptr2 = owner_memo.ptr;
            owner_memo.ptr = 0;
        }
        _assertClass(key, XfrKeyPair);
        uint64CvtShim[0] = amount;
        const low3 = u32CvtShim[0];
        const high3 = u32CvtShim[1];
        var ret = wasm.transferoperationbuilder_add_input_no_tracking(ptr, ptr0, ptr1, ptr2, key.ptr, low3, high3);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransferOperationBuilder to add an output to a transfer operation builder.
    *
    * @param {BigInt} amount - amount to transfer to the recipient.
    * @param {XfrPublicKey} recipient - public key of the recipient.
    * @param tracing_key {AssetTracerKeyPair} - Optional tracing key, must be added to traced
    * assets.
    * @param code {string} - String representation of the asset token code.
    * @param conf_amount {boolean} - `true` means the output's asset amount is confidential, and `false` means it's nonconfidential.
    * @param conf_type {boolean} - `true` means the output's asset type is confidential, and `false` means it's nonconfidential.
    * @throws Will throw an error if `code` fails to deserialize.
    * @param {BigInt} amount
    * @param {XfrPublicKey} recipient
    * @param {TracingPolicies} tracing_policies
    * @param {string} code
    * @param {boolean} conf_amount
    * @param {boolean} conf_type
    * @returns {TransferOperationBuilder}
    */
    add_output_with_tracking(amount, recipient, tracing_policies, code, conf_amount, conf_type) {
        var ptr = this.ptr;
        this.ptr = 0;
        uint64CvtShim[0] = amount;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        _assertClass(recipient, XfrPublicKey);
        _assertClass(tracing_policies, TracingPolicies);
        var ptr1 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.transferoperationbuilder_add_output_with_tracking(ptr, low0, high0, recipient.ptr, tracing_policies.ptr, ptr1, len1, conf_amount, conf_type);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransferOperationBuilder to add an output to a transfer operation builder.
    *
    * @param {BigInt} amount - amount to transfer to the recipient
    * @param {XfrPublicKey} recipient - public key of the recipient
    * @param code {string} - String representaiton of the asset token code
    * @param conf_amount {boolean} - `true` means the output's asset amount is confidential, and `false` means it's nonconfidential.
    * @param conf_type {boolean} - `true` means the output's asset type is confidential, and `false` means it's nonconfidential.
    * @throws Will throw an error if `code` fails to deserialize.
    * @param {BigInt} amount
    * @param {XfrPublicKey} recipient
    * @param {string} code
    * @param {boolean} conf_amount
    * @param {boolean} conf_type
    * @returns {TransferOperationBuilder}
    */
    add_output_no_tracking(amount, recipient, code, conf_amount, conf_type) {
        var ptr = this.ptr;
        this.ptr = 0;
        uint64CvtShim[0] = amount;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        _assertClass(recipient, XfrPublicKey);
        var ptr1 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ret = wasm.transferoperationbuilder_add_output_no_tracking(ptr, low0, high0, recipient.ptr, ptr1, len1, conf_amount, conf_type);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransferOperationBuilder to ensure the transfer inputs and outputs are balanced.
    * This function will add change outputs for all unspent portions of input records.
    * @throws Will throw an error if the transaction cannot be balanced.
    * @returns {TransferOperationBuilder}
    */
    balance() {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.transferoperationbuilder_balance(ptr);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransferOperationBuilder to finalize the transaction.
    *
    * @throws Will throw an error if input and output amounts do not add up.
    * @throws Will throw an error if not all record owners have signed the transaction.
    * @returns {TransferOperationBuilder}
    */
    create() {
        var ptr = this.ptr;
        this.ptr = 0;
        var ret = wasm.transferoperationbuilder_create(ptr);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Wraps around TransferOperationBuilder to add a signature to the operation.
    *
    * All input owners must sign.
    *
    * @param {XfrKeyPair} kp - key pair of one of the input owners.
    * @param {XfrKeyPair} kp
    * @returns {TransferOperationBuilder}
    */
    sign(kp) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(kp, XfrKeyPair);
        var ret = wasm.transferoperationbuilder_sign(ptr, kp.ptr);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * Co-sign an input index
    * @param {XfrKeyPair} kp - Co-signature key.
    * @params {Number} input_idx - Input index to apply co-signature to.
    * @param {XfrKeyPair} kp
    * @param {number} input_idx
    * @returns {TransferOperationBuilder}
    */
    add_cosignature(kp, input_idx) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(kp, XfrKeyPair);
        var ret = wasm.transferoperationbuilder_add_cosignature(ptr, kp.ptr, input_idx);
        return TransferOperationBuilder.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    builder() {
        try {
            wasm.transferoperationbuilder_builder(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * Wraps around TransferOperationBuilder to extract an operation expression as JSON.
    * @returns {string}
    */
    transaction() {
        try {
            wasm.transferoperationbuilder_transaction(8, this.ptr);
            var r0 = getInt32Memory0()[8 / 4 + 0];
            var r1 = getInt32Memory0()[8 / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_free(r0, r1);
        }
    }
}
/**
* Indicates whether the TXO ref is an absolute or relative value.
*/
export class TxoRef {

    static __wrap(ptr) {
        const obj = Object.create(TxoRef.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_txoref_free(ptr);
    }
    /**
    * Creates a relative txo reference as a JSON string. Relative txo references are offset
    * backwards from the operation they appear in -- 0 is the most recent, (n-1) is the first output
    * of the transaction.
    *
    * Use relative txo indexing when referring to outputs of intermediate operations (e.g. a
    * transaction containing both an issuance and a transfer).
    *
    * # Arguments
    * @param {BigInt} idx -  Relative TXO (transaction output) SID.
    * @param {BigInt} idx
    * @returns {TxoRef}
    */
    static relative(idx) {
        uint64CvtShim[0] = idx;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        var ret = wasm.txoref_relative(low0, high0);
        return TxoRef.__wrap(ret);
    }
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
    static absolute(idx) {
        uint64CvtShim[0] = idx;
        const low0 = u32CvtShim[0];
        const high0 = u32CvtShim[1];
        var ret = wasm.txoref_absolute(low0, high0);
        return TxoRef.__wrap(ret);
    }
}
/**
*/
export class XfrKeyPair {

    static __wrap(ptr) {
        const obj = Object.create(XfrKeyPair.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_xfrkeypair_free(ptr);
    }
    /**
    * @returns {XfrPublicKey}
    */
    get_pk() {
        var ret = wasm.xfrkeypair_get_pk(this.ptr);
        return XfrPublicKey.__wrap(ret);
    }
}
/**
*/
export class XfrPublicKey {

    static __wrap(ptr) {
        const obj = Object.create(XfrPublicKey.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_xfrpublickey_free(ptr);
    }
}

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_json_parse = function(arg0, arg1) {
    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbindgen_json_serialize = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = JSON.stringify(obj === undefined ? null : obj);
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbg_getRandomValues_f5e14ab7ac8e995d = function(arg0, arg1, arg2) {
    getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_randomFillSync_d5bd2d655fdf256a = function(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

export const __wbg_self_1b7a39e3a92c949c = handleError(function() {
    var ret = self.self;
    return addHeapObject(ret);
});

export const __wbg_require_604837428532a733 = function(arg0, arg1) {
    var ret = require(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_crypto_968f1772287e2df0 = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbg_getRandomValues_a3d34b4fee3c2869 = function(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
};

