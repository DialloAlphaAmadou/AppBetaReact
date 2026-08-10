import React, { useState, useEffect, createContext, useContext } from 'react';
import SiteConfigs from '../configs/AppConfigs';
import { useTranslation  } from 'react-i18next';

// Crée le contexte
const ThemeContext = createContext();

// Hook personnalisé pour utiliser le contexte facilement
export function useTheme() {
  return useContext(ThemeContext);
}

// Provider qui va englober ton app et gérer l'état global du thème
export function ThemeProvider({ children }) {
  // Vérifie si le mode est déjà défini dans localStorage, sinon utilise 'light'
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Met à jour la classe du body en fonction du mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Sauvegarde le mode dans le localStorage pour persistance
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // Ce que le contexte partage
  const value = { isDarkMode, setIsDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const {isDarkMode, setIsDarkMode} = useTheme();
  const {t} = useTranslation();

  // Fonction pour basculer entre le mode sombre et clair
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div>
        <select
            className={`form-select w-100 text-capitalize border-${SiteConfigs.color}`}
            value={isDarkMode ? "dark" : "light"}
            onChange={(e) => toggleTheme(e.target.value)}
        >
            <option value="light">{t("mode_light")}</option>
            <option value="dark">{t("mode_dark")}</option>
        </select>
    </div>
  );
}


/*
<button onClick={toggleTheme} className={`btn btn-${SiteConfigs.color} w-100`}>
            <i className={isDarkMode ? 'bi bi-toggle-off' : 'bi bi-toggle-on'} > </i>
            {isDarkMode ? 'Mode sombre' : 'Mode clair'}
</button>

function ThemeToggle() {
  // Vérifie si le mode est déjà défini dans localStorage, sinon utilise 'light'
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  // Met à jour la classe du body en fonction du mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Sauvegarde le mode dans le localStorage pour persistance
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // Fonction pour basculer entre le mode sombre et clair
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <button onClick={toggleTheme} className='btn btn-success border-0'>
        <i class={isDarkMode ? 'bi bi-toggle-on' : 'bi bi-toggle-off'} > </i>
        {isDarkMode ? 'Mode clair' : 'Mode sombre'}
    </button>
  );
}

export default ThemeToggle;
*/