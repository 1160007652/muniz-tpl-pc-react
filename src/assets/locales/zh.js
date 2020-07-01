/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 16:38:30
 * @ Description: 中文文案
 */

const zhCN = {
  locale_zh: '中文',
  locale_en: '英文',
  navigation_back: '返回',
  wallet_name_edit_placeholder: '请输入钱包名称',

  notice: '提示',
  warning: '警告',
  cancel: '取消',
  asset_name: '资产',
  balance: '金额',
  success: '成功',
  fail: '失败',
  txn: '交易ID',
  from: '当前地址',
  to: '收款人',

  asset_name_create_default_notice: '长名称由系统生成，用户定义短名称。短名称可以重复定义。',
  asset_name_long: '长名称',
  asset_name_short: '短名称',
  asset_name_short_placeholder: '请输入短名称',
  asset_name_create_customize_notice: '用户可以自定义短名称，长名称由短名称生成，短名称必须唯一。',
  asset_name_generate: '生成长名称',
  asset_name_type_default: '系统默认',
  asset_name_type_customize: '自定义',

  wallet_create_exists: '钱包列表中已存在该钱包',
  wallet_create_inputname: '用户名',
  wallet_create_password_no_empty: '密码不能为空',
  wallet_create_inputpassword: '输入密码',
  wallet_create_inputpassword_again: '再次输入密码',
  wallet_create_password_less9: '密码长度不能小于9位',
  wallet_create_username_no_empty: '用户名不能为空',
  wallet_create_password_no_match: '两次密码输入不一致',
  wallet_create_next: '下一步',
  wallet_down_notice:
    '密钥库文件是用于存储私钥的加密文件。它必须与密码一起使用才能解锁钱包。请妥善保管密钥库文件并记住密码。如果其中一个丢失，资产将无法收回。',
  wallet_down_agree: '我将保存密钥库文件并记住密码',
  wallet_down_btn: '下载钱包',
  wallet_remove_title: '删除钱包',
  wallet_remove_notice: '您将要取出钱包。请确保您已保存密钥库文件以恢复钱包。',
  wallet_export_title: '导出钱包',

  menu_home: '钱包列表',
  menu_wallet_create: '创建钱包',
  menu_wallet_import: '导入钱包',
  menu_setting: '设置',
  menu_asset_create: '创建资产',

  page_walet_title: '钱包',
  page_wallet_create_title: '创建钱包',
  page_wallet_import_title: '导入钱包',
  page_wallet_setting_title: '设置',
  page_send_title: '转账',
  page_transactions_title: '交易记录',
  page_transactions_detail_title: '交易详情',

  wallet_restore_password_error: '密码错误',
  wallet_restore_no_upload_file: '未上传文件KeyStore文件',
  wallet_restore_upload_file: '选择KeyStore文件',
  wallet_restore_inputpassword: '请输入密码',
  wallet_restore_submit: '完成',

  send_from: '当前地址',
  send_to: '收款人',
  send_amount: '转账数量',
  send_amount_max: '最大数量:',
  send_mount_placeholder: '请输入转账金额',
  send_asset_name: '转账资产',
  send_blind_type: '隐藏类型',
  send_blind_amount: '隐藏数量',
  send_submit: '确认',

  tips_wallet_create: '请先创建钱包地址',
  tips_wallet_empty: '你还未创建钱包。',
  network_online: '主网',
  network_testnet: '测试网',

  sidebar_restorewallet: '恢复钱包',
  sidebar_walletinfo: '钱包信息',
  sidebar_send: '交易',
  sidebar_transactions: '交易记录',
  sidebar_createasset: '创建资产',
  sidebar_deploycontract: '部署合约',
  sidebar_contracttest: '合约测试',
  sidebar_setting: '设置',
  setting_tit: '设置',
  setting_select: '选择语言',
  createwallet_tit: '创建钱包',
  createwallet_keystoreinfo:
    'Keystore文件是用于保存私钥的加密文件，与密码必须同时使用才能解锁钱包，请您务必妥善保管Keystore文件并且牢记密码，如若丢失其中一个，资产将无法找回。',

  createtoken_tit: '创建资产',
  createtoken_owner: '创建者',
  createtoken_tokenname: '资产名称',
  createtoken_memo: '备注',
  createtoken_randomname: '生成随机名字',
  createtoken_submit: '完成',
  createtoken_success: '创建成功',
  createtoken_viewdetail: '查看详情',
  createtoken_tokennameempty: '资产名称不能为空',
};
export default zhCN;
