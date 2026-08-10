import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useTheme} from './ThemeToggle';
import SiteConfigs from '../configs/AppConfigs';
import { useTranslation  } from 'react-i18next';
import { LogoutButton, useAuth } from '../configs/providers/AuthProvider';

function Header (){

  const location = useLocation();
  const getActiveLink = (path) => location.pathname === path ? 'active nav-link' : 'nav-link';
  const {isDarkMode} = useTheme();
  const {t} = useTranslation();
  const {user} = useAuth();

  //console.log(user);
  return (
    <header className="shadow fixed-top">
      <nav className="navbar navbar-expand-lg my-md-2 my-0 py-md-2 py-0 ">
        <div className="container">

          <div className="  ">
            {/* Bouton de menu mobile */}
            <button 
              className={`navbar-toggler ${isDarkMode ? "border-light" : "border-dark"} me-1`} 
              type="button" 
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <span className={`bi-list fs-2 ${isDarkMode ? "text-light" : "text-dark"}`}></span>
            </button>

            {/* Logo */}
            <Link to="/" className="fw-bold fs-2 text-decoration-none me-5" > 
              {SiteConfigs.siteName}
            </Link>
          </div>

          {/* Menu latéral à gauche style={{ backgroundColor: "transparent" }} */}
          <div className="offcanvas offcanvas-start menuMobile" tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
              <button type="button" className={`btn-close bg-${SiteConfigs.color}`}data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/home" className={`${getActiveLink("/home")} ${getActiveLink("/")} bi-house-fill`}> {t('home')}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/services" className={`${getActiveLink("/services")} bi-tools`}> {t('service')}</Link>
                </li>
                <li className="nav-item">
                <Link to="/about" className={`${getActiveLink("/about")} bi-info-circle-fill`}> {t('about')}</Link>
                </li>
                <li className="nav-item">
                <Link to="/contact" className={`${getActiveLink("/contact")} bi-envelope-fill`}> {t('contact')}</Link>
                </li>
              </ul>
            </div>

           {!user ? (

            <div className="offcanvas-body" id="navbarNav">  
              <ul className=" d-inline-flex d-sm-none navbar-nav w-100 ">
                <li className="nav-item mb-2">
                  <Link to="/login" className={`bg-${SiteConfigs.color} rounded text-center ${getActiveLink("/login")} bi-box-arrow-in-right`}> {t('login')}</Link>
                </li>
                <li className="">
                  <Link to="/register" className={`shadow rounded text-center ${getActiveLink("/register")} bi-person-plus`}> {t('register')}</Link>
                </li>
              </ul>
            </div>

            ) : (
            <div className="offcanvas-body" id="navbarNav">  
              <ul className=" d-inline-flex d-sm-none navbar-nav w-100 ">
                <LogoutButton/>
              </ul>
            </div>
            )}

          </div>

          <div className="ms-md-auto" id="">
            {!user ? (

            <ul className="navbar-nav d-flex align-items-center flex-row gap-2">
              <li className=" d-sm-flex d-none">
                <Link to="/register" className={`shadow rounded px-2 ${getActiveLink("/register")} bi-person-plus-fill`}> {t('register')}</Link>
              </li>
              <li className="">
                <Link to="/login" className={`bg-${SiteConfigs.color} rounded px-2 ${getActiveLink("/login")} bi-box-arrow-in-right`}> {t('login')}</Link>
              </li>
              <li className="">
                <Link to="/setting" className={`rounded text-center ${getActiveLink("/setting")} bi-gear-fill fs-3 p-0`}></Link>
              </li>
            </ul>

            ) : (
            <div className='dropdown '>
              <Link className={`text-${SiteConfigs.color} ${getActiveLink("/profil")} rounded-5 border-0 bi-person-fill fs-1`} data-bs-toggle="dropdown" aria-expanded="false"></Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start menuMobile" >
                <li className="p-2">
                  <Link to={`/${user.id}`} className={`${getActiveLink("/profil")} bi-person-fill`}> {t("Profil")}</Link>
                </li>
                <li className="p-2">
                  <Link to="/setting" className={`${getActiveLink("/setting")} bi-gear-fill `}> {t("settings")}</Link>
                </li>
                <li><hr className='dropdown-divider'></hr></li>
                <li className="p-2">
                  <LogoutButton/>
                </li>
              </ul>
            </div>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;


//<img src={SiteConfigs.logo} className="logo img-fluid me-1 rounded-5" width={35} alt="logo"/>