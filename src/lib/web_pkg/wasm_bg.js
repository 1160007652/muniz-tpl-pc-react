import * as wasm from './wasm_bg.wasm';

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

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

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

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

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) wasm.__wbindgen_export_2.get(dtor)(a, state.b);
            else state.a = a;
        }
    };
    real.original = state;
    return real;
}
function __wbg_adapter_20(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h78d9bdba856d0107(arg0, arg1, addHeapObject(arg2));
}

/**
* Generates random base64 encoded asset type string. Used in asset definitions.
* @see {@link WasmTransactionBuilder#add_operation_create_asset} for instructions on how to define an asset with a new
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
* Returns a JsValue containing decrypted owner record information,
* where `amount` is the decrypted asset amount, and `asset_type` is the decrypted asset type code.
*
* @param {ClientAssetRecord} record - Owner record.
* @see {@link ClientAssetRecord#from_json} for information about fetching the asset record.
*
* @param {OwnerMemo} owner_memo - Owner memo of the associated record.
* TODO (Redmine issue #126): Unable to get owner memo.
*
* @param {XfrKeyPair} keypair - Keypair of asset owner.
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
* Returns the SHA256 signature of the given string as a hex-encoded
* string.
* @ignore
* @param {string} str
* @returns {string}
*/
export function sha256str(str) {
    try {
        var ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.sha256str(8, ptr0, len0);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* Signs the given message using the given transfer key pair.
* @ignore
* @param {XfrKeyPair} key_pair
* @param {string} message
* @returns {any}
*/
export function sign(key_pair, message) {
    _assertClass(key_pair, XfrKeyPair);
    var ptr0 = passStringToWasm0(message, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.sign(key_pair.ptr, ptr0, len0);
    return takeObject(ret);
}

/**
* Submit a transaction to the ledger and return a promise for the
* ledger's eventual response. The transaction will be enqueued for
* validation. If it is valid, it will eventually be committed to the
* ledger.
*
* To determine whether or not the transaction has been committed to the ledger,
* query the ledger by transaction handle.
*
* Contained in the response of `submit_transaction` is a `TransactionHandle` that can be used to
* query the status of the transaction.
* @param {string} path - Submission server path (e.g. `https://localhost:8669`)
* @param {string} transaction_str - JSON-encoded transaction string.
*
* @see {@link get_txn_status} for information about transaction statuses.
* @param {string} path
* @param {string} transaction_str
* @returns {Promise<any>}
*/
export function submit_transaction(path, transaction_str) {
    var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(transaction_str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.submit_transaction(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* Given a transaction ID, returns a promise for the transaction status.
* @param {string} path - Address of submission server. E.g. `https://localhost:8669`.
* @param {string} path
* @param {string} handle
* @returns {Promise<any>}
*/
export function get_txn_status(path, handle) {
    var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(handle, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.get_txn_status(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* If successful, returns a promise that will eventually provide a
* JsValue describing an unspent transaction output (UTXO).
* Otherwise, returns 'not found'. The request fails if the txo uid
* has been spent or the transaction index does not correspond to a
* transaction.
* @param {string} path - Address of ledger server. E.g. `https://localhost:8668`.
* @param {BigInt} sid - UTXO SID.
* @param {string} path
* @param {BigInt} sid
* @returns {Promise<any>}
*/
export function get_txo(path, sid) {
    var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    uint64CvtShim[0] = sid;
    const low1 = u32CvtShim[0];
    const high1 = u32CvtShim[1];
    var ret = wasm.get_txo(ptr0, len0, low1, high1);
    return takeObject(ret);
}

/**
* If successful, returns a promise that will eventually provide a
* JsValue describing a transaction.
* Otherwise, returns `not found`. The request fails if the transaction index does not correspond
* to a transaction.
*
* @example <caption> Error handling </caption>
* try {
*     await wasm.get_transaction("http::localhost:8668", 1);
* } catch (err) {
*     console.log(err)
* }
* @param {String} path - Address of ledger server. E.g. `https://localhost:8668`.
* @param {BigInt} sid - Transaction SID.
* @param {string} path
* @param {BigInt} sid
* @returns {Promise<any>}
*/
export function get_transaction(path, sid) {
    var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    uint64CvtShim[0] = sid;
    const low1 = u32CvtShim[0];
    const high1 = u32CvtShim[1];
    var ret = wasm.get_transaction(ptr0, len0, low1, high1);
    return takeObject(ret);
}

/**
* Returns a JSON-encoded version of the state commitment of a running ledger. This is used to
* check the authenticity of transactions and blocks.
* @param {string} path - Address of ledger server. E.g. `https://localhost:8668`.
* @param {string} path
* @returns {Promise<any>}
*/
export function get_state_commitment(path) {
    var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.get_state_commitment(ptr0, len0);
    return takeObject(ret);
}

/**
* If successful, returns a promise that will eventually provide a
* JsValue describing an asset token. Otherwise, returns 'not found'.
* The request fails if the given token code does not correspond to
* an asset.
* @example <caption> Error handling </caption>
* try {
*     await wasm.get_asset_token("http::localhost:8668", code);
* } catch (err) {
*     console.log(err)
* }
* @param {string} path - Address of ledger server. E.g. `https://localhost:8668`.
* @param {string} code - Base64-encoded asset token string.
* @param {string} path
* @param {string} code
* @returns {Promise<any>}
*/
export function get_asset_token(path, code) {
    var ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.get_asset_token(ptr0, len0, ptr1, len1);
    return takeObject(ret);
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
function __wbg_adapter_137(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h189dc5c2e5a15118(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* Simple asset rules:
* 1) Traceable: Records and identities of traceable assets can be decrypted by a provided tracking key
* 2) Transferable: Non-transferable assets can only be transferred once from the issuer to
*    another user.
* 3) Updatable: Whether the asset memo can be updated.
* 4) Transfer signature rules: Signature weights and threshold for a valid transfer.
* 5) Max units: Optional limit on total issuance amount.
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
    * Create a default set of asset rules.
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
    * @param {bool} transferable - Boolean indicating whether asset can be transferred.
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
    * @param {bool} updatable - Boolean indicating whether asset memo can be updated.
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
* Key pair of the asset tracer. This key pair can be used to decrypt traced assets and
* identities.
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
    * Builds an asset type from a JSON-serialized JavaScript value.
    * @param {JsValue} val - JSON asset type fetched from ledger server with the `asset_token/{code}` route.
    *
    * Note: The first field of an asset type is `properties`. E.g.:
    * `"properties": {
    *   "code": {
    *     "val": [
    *       151,   8, 106,  38, 126, 101, 250, 236,
    *       134,  77,  83, 180,  43, 152,  47,  57,
    *       83,  30,  60,   8, 132, 218,  48,  52,
    *       167, 167, 190, 244,  34,  45,  78,  80
    *     ]
    *   },
    *   "issuer": { "key": 'iFW4jY_DQVSGED05kTseBBn0BllPB9Q9escOJUpf4DY=' },
    *   "memo": 'test memo',
    *   "asset_rules": {
    *     "transferable": true,
    *     "updatable": false,
    *     "transfer_multisig_rules": null,
    *     "max_units": 5000
    *   }
    * }`.
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
    * Fetch the tracing policies from the asset definition.
    * @returns {TracingPolicies}
    */
    get_tracing_policies() {
        var ret = wasm.assettype_get_tracing_policies(this.ptr);
        return TracingPolicies.__wrap(ret);
    }
}
/**
* Authenticated address identity registry value. Contains a proof that the AIR result is stored
* in the ledger.
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
    * Returns true if the authenticated AIR result proofs verify succesfully.
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
* @see {@link Network#get_state_commitment} for instructions on fetching a ledger state commitment.
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
    * authenticated utxo proofs validate correctly and false otherwise. If the proofs validate, the
    * asset record contained in this structure exists on the ledger and is unspent.
    * @param {string} state_commitment - String representing the state commitment.
    * @see {@link network#get_state_commitment} for instructions on fetching a ledger state commitment.
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
* TXO of the client's asset record.
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
    * Builds a client record from a JSON-serialized JavaScript value.
    * @param {JsValue} val - JSON-encoded autehtnicated asset record fetched from ledger server with the `utxo_sid/{sid}` route,
    * where `sid` can be fetched from the query server with the `get_owned_utxos/{address}` route.
    *
    * Note: The first field of an asset record is `utxo`. E.g.:
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
* Credential information containing:
* * Issuer public key.
* * Credential signature.
* * Credential attributes and associated values.
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
    * @returns {CredentialCommitment}
    */
    get_commitment() {
        var ret = wasm.credentialcommitmentandpok_get_commitment(this.ptr);
        return CredentialCommitment.__wrap(ret);
    }
    /**
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
    * @param {bool} conf_amount - `true` means the asset amount is confidential, and `false` means it's nonconfidential.
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
    * Adds an add air assign operation to a WasmTransactionBuilder instance.
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
    * Adds an add kv update operation to a WasmTransactionBuilder instance without kv hash.
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
    * Adds an add kv update operation to a WasmTransactionBuilder instance with kv hash.
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
        var ptr1 = kv_hash.ptr;
        kv_hash.ptr = 0;
        var ret = wasm.transactionbuilder_add_operation_kv_update_with_hash(ptr, auth_key_pair.ptr, key.ptr, low0, high0, ptr1);
        return TransactionBuilder.__wrap(ret);
    }
    /**
    * Adds an `UpdateMemo` operation to a WasmTransactionBuilder with the given memo
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
    * Adds a serialized operation to a WasmTransactionBuilder instance
    * @param {string} op -  a JSON-serialized operation (i.e. a transfer operation).
    * @see {@link WasmTransferOperationBuilder} for details on constructing a transfer operation.
    * @throws Will throw an error if `op` fails to deserialize.
    * @param {string} op
    * @returns {TransactionBuilder}
    */
    add_operation(op) {
        var ptr = this.ptr;
        this.ptr = 0;
        var ptr0 = passStringToWasm0(op, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.transactionbuilder_add_operation(ptr, ptr0, len0);
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
    * @param {number} idx - Record to fetch. Records are added to the transaction builder sequentially.
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
    * @param conf_amount {bool} - `true` means the output's asset amount is confidential, and `false` means it's nonconfidential.
    * @param conf_type {bool} - `true` means the output's asset type is confidential, and `false` means it's nonconfidential.
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
    * @param conf_amount {bool} - `true` means the output's asset amount is confidential, and `false` means it's nonconfidential.
    * @param conf_type {bool} - `true` means the output's asset type is confidential, and `false` means it's nonconfidential.
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
    * @param {TransferType} transfer_type - Transfer operation type.
    * @throws Will throw an error if `transfer_type` fails to deserialize.
    * @throws Will throw an error if input and output amounts do not add up.
    * @throws Will throw an error if not all record owners have signed the transaction.
    * @param {TransferType} transfer_type
    * @returns {TransferOperationBuilder}
    */
    create(transfer_type) {
        var ptr = this.ptr;
        this.ptr = 0;
        _assertClass(transfer_type, TransferType);
        var ptr0 = transfer_type.ptr;
        transfer_type.ptr = 0;
        var ret = wasm.transferoperationbuilder_create(ptr, ptr0);
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
* Indicates whether the transfer is a standard one, or a debt swap.
*/
export class TransferType {

    static __wrap(ptr) {
        const obj = Object.create(TransferType.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_transfertype_free(ptr);
    }
    /**
    * Standard TransferType variant for txn builder.
    * Returns a token as a string signifying that the Standard policy should be used when evaluating the transaction.
    * @returns {TransferType}
    */
    static standard_transfer_type() {
        var ret = wasm.transfertype_standard_transfer_type();
        return TransferType.__wrap(ret);
    }
    /**
    * Debt swap TransferType variant for txn builder.
    * Returns a token as a string signifying that the DebtSwap policy should be used when evaluating the transaction.
    * @returns {TransferType}
    */
    static debt_transfer_type() {
        var ret = wasm.transfertype_debt_transfer_type();
        return TransferType.__wrap(ret);
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
    * @param {BigInt} idx -  Relative Txo (transaction output) SID.
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

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __wbg_instanceof_Window_0e8decd0a6179699 = function(arg0) {
    var ret = getObject(arg0) instanceof Window;
    return ret;
};

export const __wbg_fetch_aad6acd90fb3d3ad = function(arg0, arg1) {
    var ret = getObject(arg0).fetch(getObject(arg1));
    return addHeapObject(ret);
};

export const __wbindgen_object_clone_ref = function(arg0) {
    var ret = getObject(arg0);
    return addHeapObject(ret);
};

export const __wbg_headers_5b3b48dc79e2b8e7 = function(arg0) {
    var ret = getObject(arg0).headers;
    return addHeapObject(ret);
};

export const __wbg_newwithstrandinit_f8135da00ad2e787 = handleError(function(arg0, arg1, arg2) {
    var ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
    return addHeapObject(ret);
});

export const __wbg_set_f7962fcf206a328b = handleError(function(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
});

export const __wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    var ret = false;
    return ret;
};

export const __wbg_call_79ca0d435495a83a = handleError(function(arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
});

export const __wbg_newnoargs_db0587fa712f9acc = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export const __wbg_call_122c1a957507a0d7 = handleError(function(arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
});

export const __wbg_new_17a08b876c4dedc9 = function() {
    var ret = new Object();
    return addHeapObject(ret);
};

export const __wbg_new_3f7019af886f0c9c = function(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_137(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export const __wbg_resolve_57cbe6ab0b3b60a7 = function(arg0) {
    var ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export const __wbg_then_45c887a50a229274 = function(arg0, arg1) {
    var ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export const __wbg_then_9d18941da21f7104 = function(arg0, arg1, arg2) {
    var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export const __wbg_self_d1b58dbab69d5bb1 = handleError(function() {
    var ret = self.self;
    return addHeapObject(ret);
});

export const __wbg_window_de445cb18819ad4b = handleError(function() {
    var ret = window.window;
    return addHeapObject(ret);
});

export const __wbg_globalThis_68afcb0d98f0112d = handleError(function() {
    var ret = globalThis.globalThis;
    return addHeapObject(ret);
});

export const __wbg_global_baed4e4fa850c0d0 = handleError(function() {
    var ret = global.global;
    return addHeapObject(ret);
});

export const __wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

export const __wbg_set_ede434d91072bd5f = handleError(function(arg0, arg1, arg2) {
    var ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
    return ret;
});

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

export const __wbindgen_closure_wrapper1293 = function(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 182, __wbg_adapter_20);
    return addHeapObject(ret);
};

