/**
 *
 * @param {func} handle submit transaction handle
 * @param {*} network network 请求库
 */
async function pollTxnStatus(handle, network) {
  while (true) {
    const status = await network.getTxnStatus(handle);
    if (status.Committed || status.Rejected) {
      console.log('xxxxxxxxx', status);
      return status;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

export default pollTxnStatus;
