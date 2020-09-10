Let's try transfering the asset we just issued. Start by repeating the "Create a Wallet" tutorial. Name the new wallet "Bob".

1. If we click on "Wallets" in the side menu we should now see our "Alice" and "Bob" wallet. The strings underneath the names are the public keys tied to the wallets that can be used to receive assets. 
2. Click on the copy icon at the right side of Bob's wallet. A checkmark appears when copied.
> ![two wallets](./docs-src/images/bob-alice-wallets.png)
3. Click on "Transfer Asset" in the side menu. 
4. In the "From" field, select "Alice". In the "To" field, paste Bob's public key that we copied in step 2.
5. Enter an amount you want to send in the "Value" field. Let's go with 15000 for testing purposes. 
6. Set "Blind Amount" and "Blind Type" to "No". These settings determine if your asset type and amount will be hidden from the ledger or not.
7. Click "Next"
> ![transfer asset](./docs-src/images/transfer-asset.png)
8. Check that the values in the popup window match those in the transfer asset page. Then click on "Submit". You will be greeted with an "Asset transfer succeeded" message if succesful.
> ![success!](./docs-src/images/transfer-success.png)
9. Click on "Transactions" in the side menu.
10. Here we can see our transaction history. Note that the "From" and "To" fields list the public keys of the sending and receiving wallets involved in the transaction.
11. Click on the transaction and look at the number underneath "Txn". This is your transaction ID, or tx_id. We can use this tx_id to check if our transaction made it into the ledger.
> ![tx-id](./docs-src/images/tx-id.png)
12. Click on "Wallets" in the side menu. Click on "Bob" to view Bob's wallet. The "Assets" field should now contain a balance of 15000 "My First Asset". 
> ![bob-got-tokens](./docs-src/images/bob-transfer-received.png)
13. Congratulations! You have now succesfully created and transfered your first asset on Findora. 
