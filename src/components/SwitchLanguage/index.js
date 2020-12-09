import React from 'react';
import { useTranslation } from 'react-i18next';

import './index.less';

/**
 * 其它组件
 */
const SwitchLanguage = (props) => {
  const { t, i18n } = useTranslation();
  const handleToggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="components_outher">
      切换多语言
      <div onClick={handleToggleLanguage('zhCN')}>{t('locale_zh')}</div>
      <div onClick={handleToggleLanguage('enUS')}>{t('locale_en')}</div>
    </div>
  );
};

export default SwitchLanguage;
