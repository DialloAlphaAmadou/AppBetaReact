##### BETA
# Aplication web et mobile

########################################################## GIT et GitHub

#Installer Git
https://git-scm.com/downloads

#La version de git
$git -v

# Configurer ton identité (obligatoire)
$git config --global user.name "Ton Nom"
$git config --global user.email "ton.email@example.com"

# Vérifier la config actuelle
$git config --list

#Configurer ton éditeur par défaut (facultatif)
$git config --global core.editor "code --wait"

#Configurer le comportement des lignes de fin (Windows recommandé)
$git config --global core.autocrlf true

#Configurer la couleur dans le terminal (facultatif mais utile)
$git config --global color.ui auto

### Envoyer le projet sur GitHub
$git init
$git add .
$git commit -m "initial"
$git remote add origin https://github.com/DialloAlphaAmadou/BENGROUP.git
git branch -M main
$git push -u origin main

### pour envoyer de nouvelles modifications
$git add .
$git commit -m "V-0.0.1"
$git push


### Pour cloner un projet GitHub
$git clone https://github.com/DialloAlphaAmadou/BETA.git
$cd BETA
$npm install

### Ouvrir le projet dans VSCode
$CD C:\Black\projets\BETA
$code .

########################################################## FRONT-END
# Pour le web Reac
# Pour le mobile Flutter ou React Native

########################################################## WEB AVEC REACT

## Installation
# VS Code
# Node.js // node -v
# npm // npm -v

## Creation du projet React avec vite
$mkdir frontend-web
$cd frontend-web
$npm create vite@latest nom-du-projet -- --template react
$cd nom-du-projet
$npm install
$npm run dev

## Installer react-router-dom pour la navigation
$npm install react-router-dom
-> Dans App.jsx Ajoute 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

# Installer Bootstrap ?
$npm install bootstrap
-> Dans main.jsx Ajoute 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

# Installer Bootstrap-icons ?
$npm install bootstrap-icons
-> Dans main.jsx Ajoute 
import 'bootstrap-icons/font/bootstrap-icons.css';

# Mise en place la sélection de langue dans une app React ?
$npm install i18next react-i18next i18next-browser-languagedetector

#Installer Axios pour utilisation des API
$npm install axios

#Installer jwt-decode 
$npm install jwt-decode

########################################################## MOBILE



########################################################## BACK-END

### API

## Installation
# MySQL (XAMPP ou MySQL Workbench ou MySQL Server)
# VS Code
# Node.js // node -v
# npm // npm -v

## Creation du projet Node.js
$mkdir backend
$cd backend
$npm init -y // Qui cree package.json

##Installer les outils nécessaires
$npm install express mysql2 cors dotenv
*express → pour créer le serveur
*mysql2 → pour connecter à MySQL
*cors → pour autoriser les requêtes de ton frontend
*dotenv → pour cacher tes infos sensibles

## Créer les fichiers de base
$echo. > index.js
$echo. > db.js 
$echo. > .env 
$echo. > routes/users.js

## Lancer le backend
$node index.js

########################################################## Du MySQL
# Connexion a MySQL
$mysql -u root -p

# Liste des data
SHOW DATABASES;

# Creation de data 
CREATE DATABASE users

# Utiliser la data
USE users

# Creation de table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# Verification de table
SHOW TABLES;

# Structure de la table
DESCRIBE users;

# Ajouter un champ a une table 
ALTER TABLE user ADD phone VARCHAR(20); 

# Modification du nom de la table
RENAME TABLE ancien_nom TO nouveau_nom;

# Modification du nom d'un champ
ALTER TABLE user CHANGE updeted_at uqdated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; 

# Ajouter des info dans la table
INSERT INTO user (name, email) 
VALUES ('Ali', 'ali@example.com');


########################################################## FIREBASE
### Héberger ton projet sur Firebase

## Créer un projet Firebase
# Va sur console.firebase.google.com
# Clique sur "Ajouter un projet"
# Donne un nom à ton projet (ex: BousrahElec)
# Désactive Google Analytics si tu n’en as pas besoin
# Clique sur Créer le projet


#1. Installer Firebase CLI (si ce n’est pas déjà fait)
$npm install -g firebase-tools

#2. Connecte-toi à ton compte Firebase
$firebase login

#3. Initialise Firebase dans ton projet
$firebase init

### À l’étape suivante :
# Choisis Hosting: Configure files for Firebase Hosting (avec espace pour cocher).
# Choisis un projet existant (ou crée-en un dans console.firebase.google.com).

### Pour le dossier public, entre :
# build si tu utilises create-react-app.
# dist si tu as utilisé Vite.

# Réponds non à "Configure as a single-page app?" si tu n’as pas de routing SPA. Sinon, dis oui.

# Réponds non à "Set up automatic builds and deploys with GitHub?" (sauf si tu veux l’intégrer avec GitHub Actions).

#4. Construis ton projet (React ou Vite)
$npm run build

#5. Déploie vers Firebase Hosting
$firebase deploy
#✔  Deploy complete!

### Mise a jour du projet
$npm run build     # ou vite build
$firebase deploy

########## firebase Authentification
$npm install firebase


########################################################## ATURE COMMANDE
#Vérifier le processus qui utilise le port :
$netstat -ano | findstr :3001

# Tu verras une ligne comme :
TCP    127.0.0.1:3001    0.0.0.0:0    LISTENING    12345

# Tuer le processus :
$taskkill /PID 12345 /F