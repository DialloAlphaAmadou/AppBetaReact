# AppBetaReact

Application web développée avec React.

## Description

AppBetaReact est une application web permettant aux utilisateurs d'accéder aux fonctionnalités de la plateforme à travers une interface simple, rapide et responsive.

L'application communique avec une API REST sécurisée pour l'authentification, la gestion des données et les opérations métier.

## Fonctionnalités

- Authentification des utilisateurs
- Gestion des sessions
- Consommation d'API REST
- Interface responsive
- Navigation dynamique
- Gestion des formulaires
- Gestion des erreurs et notifications

## Technologies utilisées

### Frontend

- React
- React Router
- Axios
- Bootstrap
- JavaScript (ES6+)

### Backend

- API REST

## Architecture

```text
AppBetaReact
      │
      │ HTTP/HTTPS
      ▼
    REST API
      │
      ▼
 Base de données
```

## Installation

### Prérequis

- Node.js
- npm

### Cloner le projet

```bash
git clone https://github.com/DialloAlphaAmadou/AppBetaReact.git
cd AppBetaReact
```

### Installer les dépendances

```bash
npm install
```

### Lancer le projet

```bash
npm run dev
```

ou

```bash
npm start
```

selon votre configuration.

## Configuration

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:5000/api
```

## Auteur

Alpha Amadou Diallo

Développé avec React.
