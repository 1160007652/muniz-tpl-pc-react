/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 19:27:31
 * @ Description: 英文文案
 */

const enUS = {
  Language: 'Language',
  locale_zh: 'Chinese',
  locale_en: 'English',

  navigation_back: 'Back',
  wallet_name_edit_placeholder: 'Place wallet name',

  isCancel: 'Sure to cancel?',
  edit: 'Edit',
  remove: 'Remove',
  save: 'Save',
  operation: 'Operation',
  done: 'Done',
  notice: 'NOTICE',
  warning: 'WARNING',
  error: 'ERROR',
  cancel: 'Cancel',
  asset_name: 'Asset',
  asset_name_tips: 'Asset code generated by the system',
  balance: 'Balance',
  success: 'Succeeded',
  fail: 'Failed',
  txn: 'Txn',
  from: 'From',
  to: 'To',
  view: 'View',
  close: 'Close',
  memo: 'Memo',
  policy: 'Policy',
  traceable: 'Traceable',
  traceable_tips: 'Whether the asset can be traced.',
  transferable: 'Transferable',
  transferable_tips:
    'Whether the asset is transferable. Non-Transferable assets can only be transferred once from the issuer to another user.',
  updatable: 'Updatable',
  updatable_tips: 'Whether the asset memo can be updated.',
  blind_type: 'Blind Type',
  blind_type_tips: 'Whether to display the asset type on the Ledger.',
  blind_amount: 'Blind Amount',
  blind_amount_tips: 'Whether to display the asset amount on the Ledger.',

  confirm: 'Confirm',

  txn_IssueAsset: 'Issuance',
  txn_TransferAsset: 'Transfer',

  asset_name_create_default_notice:
    "The Asset Code is generated by the system, and the user defines the nickname. The nickname can't be defined repeatedly.",
  asset_name_long: 'Asset Code',
  asset_name_short: 'Nickname',
  asset_name_short_placeholder: 'Please enter nickname',
  asset_name_create_customize_notice:
    'The user can customize the nickname, the Asset Code is generated by the nickname, and the nickname must be unique.',
  asset_name_generate: 'Generate Asset Code',
  asset_name_type_default: 'Default',
  asset_name_type_customize: 'Custom',
  nickname_restore_upload_file: 'Click or drag .findoraNicknames file to this area',
  nickname_restore_upload_file1: 'Open another file',

  wallet_create_exists: 'A Findora Wallet for user {userName} is already open. Please enter a new name.',
  wallet_create_inputname: 'Username',
  wallet_create_password_no_empty: 'Password cannot be empty',
  wallet_create_inputpassword: 'Password',
  wallet_create_inputpassword_again: 'Password (Again)',
  wallet_create_password_less9: 'Password must be at least 9 characters long',
  wallet_create_username_no_empty: 'Username cannot be empty',
  wallet_create_password_no_match: 'Passwords do not match',
  wallet_create_keystore_info:
    'The Findora Wallet file contains a your secret key, encrypted by a password you specify below. If you lose your password or wallet file, you will lose access to any assets you have and will need to create a new wallet.',
  wallet_create_next: 'Next',

  wallet_down_agree: 'I will save the keystore file and remember the password',
  wallet_down_btn: 'Save Findora Wallet',
  wallet_down_success: 'Save Succeeded',
  wallet_down_fail: 'Save Failed',
  wallet_remove_title: 'Close wallet',
  wallet_remove_notice:
    'You are about to remove the wallet. Please make sure you have saved the keystore file to restore the wallet.',
  wallet_export_title: 'Save Wallet',
  wallet_create_lafter_import_tips: 'Import Your New Wallet',
  wallet_import_has_been: 'The wallet has been imported, please do not repeat the operation',
  wallet_empty_tips: 'No wallets are currently imported',

  menu_application: 'Application',
  menu_wallet: 'Wallet',
  menu_asset: 'Asset',
  menu_home: 'Wallets',
  menu_asset_send: 'Transfer Asset',
  menu_wallet_create: 'Create Wallet',
  menu_wallet_import: 'Open Wallet',
  menu_setting: 'Setting',
  menu_asset_create: 'Create or Issue Asset',
  menu_asset_create1: 'Create Asset',
  menu_asset_issue: 'Issue Asset',
  menu_asset_transactions: 'Transactions',
  menu_about: 'Help',
  menu_asset_statement: 'Statement',
  menu_close_wallet: 'Close Wallet',

  page_wallet_title: 'Wallet',
  page_wallet_detail: 'Wallet Info',
  page_wallet_list: 'Wallet List',
  page_wallet_create_title: 'Create Wallet',
  page_wallet_import_title: 'Open Wallet',
  page_wallet_setting_title: 'Setting',
  page_send_title: 'Transfer Asset',
  page_transactions_title: 'Transactions',
  page_transactions_detail_title: 'Transaction Detail',
  page_wallet_about_title: 'Help',

  wallet_restore_password_error: 'Password Error',
  wallet_restore_no_upload_file: 'No file added',
  wallet_restore_upload_file: 'Click or drag Keystore file to this area to upload',
  wallet_restore_inputpassword: 'Please enter password',
  wallet_restore_submit: 'Open',

  send_amount: 'Value',
  send_amount_max: 'max units:',
  send_mount_placeholder: 'Please enter amount',
  send_asset_name: 'Asset Name',
  send_submit: 'Submit',
  send_submit_not_last_transaction: 'Transfer failed, no last transaction',
  send_error1: 'Transfer Failed',
  send_error2: 'The asset does not support secondary transfers',
  send_error3: 'Cannot exceed the transferable units of the asset',
  send_error4: 'To address cannot be empty',
  send_error5: 'The transfer amount cannot be empty',
  send_error6: 'An asset must be selected',
  send_error7: 'The asset cannot be hidden',
  send_nosubmit_owne_tips: "Transferring to yourself isn't allowed.",

  tips_wallet_create: 'Please create wallet address first',
  tips_asset_create_result_success: 'Asset creation succeeded',
  tips_asset_issue_result_success: 'Asset issuance succeeded',
  tips_asset_send_result_success: 'Asset transfer succeeded',
  network: 'Network',
  network_online: 'Online',
  network_testnet: 'Testnet',

  token_create_max_amount_limit_tips: 'Max units limit cannot be empty',
  token_create_founder: 'Issuer',
  token_create_memo_placeholder: 'Please enter memo',
  token_create_max_amount: 'Max Units Limit',
  token_create_max_amount_placeholder: 'Please set max units that can be issued',
  token_create_create: 'Create',
  token_empty_tips: "You haven't created any assets. Click",
  token_empty_here_tips: ' here ',
  token_empty_last_tips: 'to create an asset.',
  token_create_error1: 'Failed to create asset',
  token_or_issue_empty_here: ' here ',
  token_issue_issuer: 'Issuer',
  token_issue_issue: 'Issue',
  token_issue_amount: 'Issuance Amount',
  token_issue_amount_placeholder: 'Please enter amount',
  token_issue_empty_tips:
    "You haven't issued and don't own an asset with a positive balance. If you've created an asset, click",
  token_issue_create_btn_tips: 'to issue it.',
  token_issue_amount_unlimited: 'Unlimited',
  token_issue_error1: 'Issue Asset failed',
  token_issue_error2: 'Cannot exceed the additional amount that can be issued',
  token_issue_error3: 'The asset cannot hide the amount',
  token_issue_error4: 'The issuance amount cannot be empty',

  transaction_asset_type: 'Asset Type',
  transaction_loade_more: 'More',
  transaction_loade_empty: 'No more data',

  system_cancel_async: 'Cancel asynchronous tasks to prevent memory leaks',

  download_tips_checkbox: 'Please check the box to continue',

  about_title: 'Findora Wallet Application',
  about_version: 'Version',
  about_info:
    'If you encounter any problems, please report the issue of the specified version number to us by clicking on the URL below to help us better solve this problem.',
};
export default enUS;
