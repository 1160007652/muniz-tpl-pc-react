/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 19:29:04
 * @ Description: 中文文案
 */

const zhCN = {
  Language: '语言环境',
  locale_zh: '中文',
  locale_en: '英文',
  navigation_back: '返回',
  wallet_name_edit_placeholder: '请输入钱包名称',

  done: '完成',
  notice: '提示',
  warning: '警告',
  error: '错误',
  cancel: '取消',
  asset_name: '资产',
  asset_name_tips: '由系统生成的资产',
  balance: '金额',
  success: '成功',
  fail: '失败',
  txn: '交易ID',
  from: '当前地址',
  to: '收款人',
  view: '查看',
  close: '关闭',
  memo: '备注',
  policy: '制度',
  traceable: '可追溯',
  traceable_tips: '资产是否可追溯',
  transferable: '可转让',
  transferable_tips: '资产是否可转让,不可转让资产只能从发行人转让给另一个用户一次',
  updatable: '可更新',
  updatable_tips: '资产备忘是否可以更新',
  blind_type: '隐藏类型',
  blind_amount: '隐藏数量',
  confrim: '确认',

  txn_IssueAsset: '发行',
  txn_TransferAsset: '转让',

  asset_name_create_default_notice: '长名称由系统生成，用户定义短名称。短名称可以重复定义。',
  asset_name_long: '长名称',
  asset_name_short: '短名称',
  asset_name_short_placeholder: '请输入短名称',
  asset_name_create_customize_notice: '用户可以自定义短名称，长名称由短名称生成，短名称必须唯一。',
  asset_name_generate: '生成长名称',
  asset_name_type_default: '系统默认',
  asset_name_type_customize: '自定义',

  wallet_create_exists: '{userName}用户的Findora钱包已经打开, 请输入新名称。',
  wallet_create_inputname: '用户名',
  wallet_create_password_no_empty: '密码不能为空',
  wallet_create_inputpassword: '输入密码',
  wallet_create_inputpassword_again: '再次输入密码',
  wallet_create_password_less9: '密码长度不能小于9位',
  wallet_create_username_no_empty: '用户名不能为空',
  wallet_create_password_no_match: '两次密码输入不一致',
  wallet_create_keystore_info:
    'Findora钱包文件包含您的秘密密钥，该密钥由您在下面指定的密码加密。如果您丢失了密码或钱包文件，则将无法访问拥有的任何资产，并且需要创建一个新的钱包。',
  wallet_create_next: '下一步',
  wallet_down_agree: '我将保存密钥库文件并记住密码',
  wallet_down_btn: '保存Findora钱包',
  wallet_down_success: '下载成功',
  wallet_down_fail: '下载失败',
  wallet_remove_title: '删除钱包',
  wallet_remove_notice: '您将要取出钱包。请确保您已保存密钥库文件以恢复钱包。',
  wallet_export_title: '导出钱包',
  wallet_create_lafter_import_tips: '导入您的新钱包',
  wallet_import_has_been: '该钱包已导入, 请无重复操作',
  wallet_empty_tips: '当前没有导入钱包',

  menu_application: '应用',
  menu_wallet: '钱包',
  menu_asset: '资产',
  menu_home: '钱包列表',
  menu_asset_send: '转转',
  menu_wallet_create: '创建钱包',
  menu_wallet_import: '导入钱包',
  menu_setting: '设置',
  menu_asset_create: '创建或增发资产',
  menu_asset_create1: '创建资产',
  menu_asset_issue: '发行资产',
  menu_asset_transactions: '交易记录',
  menu_about: '帮助',

  page_wallet_title: '钱包',
  page_wallet_detail: '钱包信息',
  page_wallet_list: '钱包列表',
  page_wallet_create_title: '创建钱包',
  page_wallet_import_title: '导入钱包',
  page_wallet_setting_title: '设置',
  page_send_title: '转账',
  page_transactions_title: '交易记录',
  page_transactions_detail_title: '交易详情',
  page_wallet_about_title: '帮助',

  wallet_restore_password_error: '密码错误',
  wallet_restore_no_upload_file: '未填加KeyStore文件',
  wallet_restore_upload_file: '选择KeyStore文件',
  wallet_restore_inputpassword: '请输入密码',
  wallet_restore_submit: '完成',

  send_amount: '转账数量',
  send_amount_max: '最大数量:',
  send_mount_placeholder: '请输入转账金额',
  send_submit: '确认',
  send_submit_not_last_transaction: '转账失败,无最后一笔交易',
  send_error1: '转账失败',
  send_error2: '该资产不支持二次转账',
  send_error3: '不可超过该资产最大可转账余额',
  send_error4: 'To地址不能为空',
  send_error5: '转账金额不能为空',
  send_error6: '转账资产不能为空',
  send_error7: '该资产不可以隐藏类型',
  send_nosubmit_owne_tips: '不允许转让给自己.',

  tips_wallet_create: '请先创建钱包地址',
  tips_asset_create_result_success: '创建资产成功',
  tips_asset_issue_result_success: '发行资产成功',
  tips_asset_send_result_success: '转账成功',
  network: '网络环境',
  network_online: '主网',
  network_testnet: '测试网',

  token_create_max_amount_limit_tips: '最大单位数限制不能为空',
  token_create_founder: '创建者',
  token_create_memo_placeholder: '请输入备注',
  token_create_max_amount: '最大增发金额',
  token_create_max_amount_placeholder: '请设置最大增发金额',
  token_create_create: '创建',
  token_empty_tips: '您尚未创建任何资产。请单击',
  token_empty_here_tips: '此处',
  token_empty_last_tips: '创建一个',
  token_create_error1: '创建资产失败',
  token_or_issue_empty_here: ' 这里 ',
  token_issue_issuer: '发行者',
  token_issue_amount: '增发金额',
  token_issue_amount_placeholder: '请输入发行金额',
  token_issue_empty_tips: '您尚未拥有任何资产。如果您创建了资产，请单击',
  token_issue_create_btn_tips: '增发它',
  token_issue_amount_unlimited: '无限制',
  token_issue_error1: '增发资产失败',
  token_issue_error2: '不可超过最大可增发上限',
  token_issue_error3: '该资产不可以隐藏金额',
  token_issue_error4: '增发金额不能为空',

  transaction_loade_more: '加载更多',
  transaction_loade_empty: '无更多数据',

  system_cancel_async: '取消异步任务, 防止内存泄露',
  download_tips_checkbox: '请勾选复选框,再继续操作',

  about_title: 'Findora钱包应用',
  about_version: '版本',
  about_info: '如果遇到任何问题，请通过点击下方的网址向我们反馈指定版本号的问题,以帮助我们更好地解决此问题.',
};
export default zhCN;
