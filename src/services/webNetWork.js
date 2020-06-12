import NetWork from '_src/lib/network';

const HOST = 'testnet.findora.org';
const SUBMISSION_PORT = '8669';
const LEDGER_PORT = '8668';
const QUERY_PORT = '8667';
const PROTOCOL = 'https';

export default new NetWork(PROTOCOL, HOST, QUERY_PORT, SUBMISSION_PORT, LEDGER_PORT);
