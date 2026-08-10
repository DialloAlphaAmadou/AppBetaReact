import React from 'react';
import SiteConfigs from '../configs/AppConfigs';
import { useTranslation  } from 'react-i18next';
import { Link } from 'react-router-dom';

function Footer (){
  const [t] = useTranslation();

  return (
    <footer className="py-4 mt-5 shadow">
      <div className="container">
        <div className="row">
          {/* Colonne pour les liens */}
          <div className="col-md-4">
            <h5 className='bi-info-circle-fill'> {t('about')}</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" >{t('who_are_we')}</Link></li>
              <li><Link to="/services" >{t("our_services")}</Link></li>
              <li><Link to="/contact" >{t("contact_us")}</Link></li>
            </ul>
          </div>

          {/* Colonne pour les réseaux sociaux */}
          <div className="col-md-4">
            <h5 > {t("social_networks")}</h5>
            <ul className="list-unstyled">
              <li className='bi-meta'> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" >Facebook</a></li>
              <li className='bi-twitter-x'> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a></li>
              <li className='bi-instagram'> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>

          {/* Colonne pour les informations de contact */}
          <div className="col-md-4">
            <h5 className=''> {t('contact')}</h5>
            <ul className="list-unstyled">
              <li className='bi-envelope-fill'> Email: {SiteConfigs.email}</li>
              <li className='bi-telephone-fill'> {t("phone")}: {SiteConfigs.phone}</li>
        
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} {t("all_rights_reserved")}, {SiteConfigs.siteName}.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
