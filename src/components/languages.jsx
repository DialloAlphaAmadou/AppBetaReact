import React from "react";
import { useTranslation } from "react-i18next";
import SiteConfigs from '../configs/AppConfigs';

function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div >
        <select className={`form-select w-100 border-${SiteConfigs.color}`} onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
            <option value="en">English</option>
            <option value="fr">Français</option>
        </select>
    </div>
  );
}

export default LanguageSelector;
