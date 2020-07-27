/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 19:27:31
 * @ Description: 英文文案
 */

const enUS = {
  locale_zh: 'Chinese',
  locale_en: 'English',

  navigation_back: 'Back',
  wallet_name_edit_placeholder: 'Place wallet name',

  notice: 'NOTICE',
  warning: 'WARNING',
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
  transferable: 'Transferrable',
  transferable_tips:
    'Whether the asset is transferrable. Non-transferrable assets can only be transferred once from the issuer to another user.',
  updatable: 'Updatable',
  updatable_tips: 'Whether the asset memo can be updated.',
  blind_type: 'Blind Type',
  blind_amount: 'Blind Amount',
  confirm: 'Confirm',

  asset_name_create_default_notice:
    'The Asset Code is generated by the system, and the user defines the short name. The short name can be defined repeatedly.',
  asset_name_long: 'Asset Code',
  asset_name_short: 'ShortName',
  asset_name_short_placeholder: 'Please to shortName',
  asset_name_create_customize_notice:
    'The user can customize the short name, the Asset Code is generated by the short name, and the short name must be unique.',
  asset_name_generate: 'Generate Asset Code',
  asset_name_type_default: 'Default',
  asset_name_type_customize: 'Custom',

  wallet_create_exists: 'The wallet already exists in the wallet list',
  wallet_create_inputname: 'Username',
  wallet_create_password_no_empty: 'Password cannot be empty',
  wallet_create_inputpassword: 'Password',
  wallet_create_inputpassword_again: 'Password (Again)',
  wallet_create_password_less9: 'Password must be at least 9 characters long',
  wallet_create_username_no_empty: 'Username cannot be empty',
  wallet_create_password_no_match: 'Passwords do not match',
  wallet_create_keystore_info:
    'The keystore file is an encrypted file used to store the private key. It must be used with the password to unlock the wallet. Please keep the keystore file properly and remember the password. If one of them is lost, the asset will not be recovered.',
  wallet_create_next: 'Next',
  wallet_down_notice:
    'The keystore file is an encrypted file used to store the private key. It must be used with the password to unlock the wallet. Please keep the keystore file properly and remember the password. If either the wallet or the password is lost, the wallet can not be recovered.',
  wallet_down_agree: 'I will save the keystore file and remember the password',
  wallet_down_btn: 'Download Keystore File',
  wallet_down_success: 'DownLoad Success',
  wallet_down_fail: 'DownLoad Failed',
  wallet_remove_title: 'Remove Wallet',
  wallet_remove_notice:
    'You are about to remove the wallet. Please make sure you have saved the keystore file to restore the wallet.',
  wallet_export_title: 'Export Wallet',
  wallet_create_lafter_import_tips: 'Import your new wallet',

  menu_home: 'Wallets',
  menu_wallet_create: 'Create Wallet',
  menu_wallet_import: 'Import Wallet',
  menu_setting: 'Setting',
  menu_asset_create: 'Create Asset',
  menu_asset_issue: 'Issue Asset',
  menu_about: 'Help',

  page_wallet_title: 'Wallet',
  page_wallet_detail: 'Wallet Info',
  page_wallet_list: 'Wallet List',
  page_wallet_create_title: 'Create Wallet',
  page_wallet_import_title: 'Import Wallet',
  page_wallet_setting_title: 'Setting',
  page_send_title: 'Send',
  page_transactions_title: 'Transactions',
  page_transactions_detail_title: 'Transactions Detail',
  page_wallet_about_title: 'Help',

  wallet_restore_password_error: 'Password Error',
  wallet_restore_no_upload_file: 'No files uploaded',
  wallet_restore_upload_file: 'Add KeyStore file',
  wallet_restore_inputpassword: 'Please enter password',
  wallet_restore_submit: 'Import',

  send_amount: 'Value',
  send_amount_max: 'max units:',
  send_mount_placeholder: 'Please enter amount',
  send_asset_name: 'Asset Name',
  send_submit: 'Submit',
  send_submit_not_last_transaction: 'Transfer failed, no last transaction',
  send_error1: 'Transfer Failed',
  send_error2: 'The asset does not support secondary transfers',
  send_error3: 'Cannot exceed the transferrable units of the asset',
  send_error4: 'To address cannot be empty',
  send_error5: 'The transfer amount cannot be empty',
  send_error6: 'Transfer assets cannot be empty',
  send_error7: 'The asset cannot be hidden',

  tips_wallet_create: 'Please create wallet address first',
  tips_asset_create_result_success: 'Asset creation succeeded',
  tips_asset_issue_result_success: 'Asset issuance succeeded',
  tips_asset_send_result_success: 'Asset transfer succeeded',
  network_online: 'Online',
  network_testnet: 'Testnet',

  token_create_founder: 'Founder',
  token_create_memo_placeholder: 'Please enter memo',
  token_create_max_amount: 'Max units',
  token_create_max_amount_placeholder: 'Please set max units that can be issued',
  token_create_create: 'Create',
  token_empty_tips: 'Please create an asset before issuing',
  token_create_btn_tips: 'Click create',
  token_create_error1: 'Failed to create asset',

  token_issue_issuer: 'Issuer',
  token_issue_amount_placeholder: 'Please to amount',
  token_issue_empty_tips: 'Please issued assets',
  token_issue_create_btn_tips: 'Click issue',
  token_issue_amount_unlimited: 'UnLimited',
  token_issue_error1: 'Issue Asset failed',
  token_issue_error2: 'Cannot exceed the additional amount that can be issued',
  token_issue_error3: 'The asset cannot hide the amount',
  token_issue_error4: 'The issuance amount cannot be empty',

  transaction_asset_type: 'Asset Type',
  transaction_loade_more: 'loading more',
  transaction_loade_empty: 'No more data',

  system_cancel_async: 'Cancel asynchronous tasks to prevent memory leaks',

  download_tips_checkbox: 'Please check the box to continue',

  about_title: 'Findora Wallet Application',
  about_version: 'Version',
  about_info:
    'If you encounter any problems, please report the issue of the specified version number to us by clicking on the URL below to help us better solve this problem.',
};
export default enUS;
