Now that you are familiar with the wallet application, let's walk through some of the settings that you can use to add privacy to your transactions.

- When issuing an asset, you can hide the amount issued from the ledger. 
      1. Click on "Issue Asset" in the side menu.
      2. Enter an amount in the "Issuance Amount" field.   
      3. Set "Blind Amount" to "Yes".
      > ![Blind-asset-option](./docs-src/images/blind-amounts.png)
      4. Click on "Issue"
      > ![issue-success](./docs-src/images/issuance-success.png)
      5. Click on "Transactions" in the side menu. You'll see your issuance transaction is tagged with "Blind Amount". Click on the transaction and note the tx_id, this is the number underneath "Txn".
      6. Check this [link](https://testnet.findora.org:8668/blocks_since/0) and find your tx_id. You'll see that you can't view the amount! 
      > ![blind-issuance](./docs-src/images/confidential-amount.png)

- When transferring an asset, you can hide both the amount and the asset type from the ledger.
      1. Click on "Transfer Asset" in the side menu.
      2. Paste an address/public key in the "To" field and put the amount you want to transfer in the "Value" field.
      3. Set "Blind Amount" to "Yes". This will hide the amount transferred from the ledger. 
      4. Set "Blind Type" to "Yes". This will hide the asset type from the ledger.
      > ![blind-transfer](./docs-src/images/blind-transfer.png)
      5. Click "Next". Check that the values in the popup window match those in the Transfer Asset page. Then click on Submit.
      > ![transfer-success](./docs-src/images/transfer-success.png)
      6. Click on "Transactions" in the side menu. You'll see that your asset transfer is tagged with "Blind Amount" and "Blind Type". Click on the transaction and note the tx_id, this is the number underneath the "Txn". 
      7. Check this [link](https://testnet.findora.org:8668/blocks_since/0) and find your tx_id. You'll see that you can't view the amount or asset type in the transaction!
      > ![confidential-tx](./docs-src/images/confidential-transaction.png)


