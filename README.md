# 📚 WikiPi

**WikiPi** est une application web de gestion de documentation collaborative. Elle permet aux utilisateurs de créer des projets et d'y associer des documentations structurées, le tout avec un système d'authentification et de gestion des rôles.

---

## 🚀 Fonctionnalités

### Authentification & Utilisateurs

- 🔐 Inscription et connexion sécurisées (JWT + bcrypt)
- 👤 Gestion des profils utilisateurs
- 🎭 Système de rôles (admin, modo, member)
- 🛡️ Routes protégées côté frontend et backend

### Gestion des Projets

- 📁 Création et consultation de projets
- 🌐 Projets publics ou privés
- 👥 Accès contrôlé selon le créateur ou la visibilité

### Documentation

- 📝 Création de documentations associées à un projet
- ✍️ Support du Markdown pour le contenu
- 📋 Liste des documentations récentes
- 🔍 Consultation détaillée avec informations sur l'auteur

### Administration

- 📊 Tableau de bord avec statistiques (utilisateurs, projets, documents)
- 👥 Gestion des utilisateurs et de leurs rôles
- 📈 Distribution des rôles et utilisateurs récents

---

## 🛠️ Technologies

### Frontend

| Technologie      | Version | Description                 |
| ---------------- | ------- | --------------------------- |
| React            | 19.2.0  | Framework UI                |
| Vite             | 7.2.4   | Build tool & dev server     |
| React Router DOM | 7.9.4   | Routing SPA                 |
| Tailwind CSS     | 4.1.13  | Framework CSS utility-first |
| DaisyUI          | 5.1.25  | Composants UI pour Tailwind |
| Axios            | 1.13.2  | Client HTTP                 |
| React Hook Form  | 7.66.1  | Gestion des formulaires     |
| React Markdown   | 10.1.0  | Rendu Markdown              |
| React Icons      | 5.5.0   | Icônes                      |

### Backend

| Technologie       | Version | Description                   |
| ----------------- | ------- | ----------------------------- |
| Node.js           | -       | Runtime JavaScript            |
| Express           | 5.1.0   | Framework web                 |
| MySQL2            | 3.15.3  | Driver MySQL avec Promises    |
| JWT               | 9.0.2   | Authentification par tokens   |
| bcrypt            | 6.0.0   | Hashage des mots de passe     |
| express-validator | 7.3.1   | Validation des requêtes       |
| CORS              | 2.8.5   | Cross-Origin Resource Sharing |
| Nodemon           | 3.1.11  | Hot reload en développement   |

---

## 📁 Structure du Projet

```
wikipi/
├── frontend/                   # Application React
│   ├── src/
│   │   ├── assets/            # Ressources statiques
│   │   ├── components/        # Composants React
│   │   │   ├── Auth/          # Composants d'authentification
│   │   │   ├── Documents/     # Composants de documentation
│   │   │   ├── Layout/        # Mise en page (AppLayout, etc.)
│   │   │   ├── Projects/      # Composants de projets
│   │   │   ├── Settings/      # Paramètres utilisateur
│   │   │   └── Shared/        # Composants réutilisables
│   │   ├── contexts/          # Context API (Auth, Projects, Docs)
│   │   ├── hooks/             # Hooks personnalisés
│   │   ├── routes/            # Pages de l'application
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Project.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── Settings.jsx
│   │   ├── api.js             # Configuration Axios
│   │   ├── App.jsx            # Point d'entrée React
│   │   └── main.jsx           # Bootstrap de l'app
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # API Express
│   ├── controllers/           # Logique métier
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── documentationController.js
│   │   └── userController.js
│   ├── lib/
│   │   └── db.js              # Configuration MySQL
│   ├── middleware/
│   │   ├── auth.js            # Vérification JWT
│   │   ├── authorize.js       # Autorisation par rôle
│   │   └── validates.js       # Validation des données
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── documentationRoutes.js
│   │   └── userRoutes.js
│   ├── validators/            # Schémas de validation
│   ├── index.js               # Point d'entrée serveur
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Prérequis

- **Node.js** (v18 ou supérieur recommandé)
- **MySQL** (v8 ou supérieur)
- **npm** ou **yarn**

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/wikipi.git
cd wikipi
```

### 2. Configuration de la base de données

Créez une base de données MySQL et exécutez le schéma suivant :

```sql
CREATE DATABASE wikipi;
USE wikipi;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'modo', 'member') DEFAULT 'member',
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_by INT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE documentations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt VARCHAR(500),
    content LONGTEXT,
    project_id INT NOT NULL,
    created_by INT NOT NULL,
    last_modified_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (last_modified_by) REFERENCES users(id)
);
```

### 3. Configuration du Backend

```bash
cd server
npm install
```

Créez un fichier `.env` à la racine du dossier `server/` :

```env
PORT=3000
DB_HOST=localhost
DB_USER=votre_utilisateur_mysql
DB_PASS=votre_mot_de_passe_mysql
DB_NAME=wikipi
JWT_KEY=votre_clé_secrète_jwt
JWT_EXPIRES_IN=7d
```

### 4. Configuration du Frontend

```bash
cd ../frontend
npm install
```

---

## 🚀 Lancement

### Démarrer le serveur backend

```bash
cd server
npm start
```

Le serveur démarre sur `http://localhost:3000`

### Démarrer le frontend

```bash
cd frontend
npm run dev
```

L'application est accessible sur `http://localhost:5173`

---

## 📡 API Endpoints

### Authentification (`/auth`)

| Méthode | Route            | Description                | Auth |
| ------- | ---------------- | -------------------------- | ---- |
| POST    | `/auth/register` | Inscription                | Non  |
| POST    | `/auth/login`    | Connexion                  | Non  |
| GET     | `/auth/home`     | Infos utilisateur connecté | Oui  |

### Projets (`/api/projects`)

| Méthode | Route               | Description         | Auth |
| ------- | ------------------- | ------------------- | ---- |
| GET     | `/api/projects`     | Liste des projets   | Oui  |
| GET     | `/api/projects/:id` | Détails d'un projet | Oui  |
| POST    | `/api/projects`     | Créer un projet     | Oui  |

### Documentations (`/api/documentations`)

| Méthode | Route                                    | Description                 | Auth |
| ------- | ---------------------------------------- | --------------------------- | ---- |
| GET     | `/api/documentations`                    | Toutes les documentations   | Oui  |
| GET     | `/api/documentations/:id`                | Détails d'une documentation | Oui  |
| GET     | `/api/documentations/project/:projectId` | Docs d'un projet            | Oui  |
| POST    | `/api/documentations/project/:projectId` | Créer une documentation     | Oui  |

### Utilisateurs (`/api/users`) - Admin uniquement

| Méthode | Route                 | Description            | Auth  |
| ------- | --------------------- | ---------------------- | ----- |
| GET     | `/api/users`          | Liste des utilisateurs | Admin |
| GET     | `/api/users/stats`    | Statistiques           | Admin |
| PUT     | `/api/users/:id/role` | Modifier un rôle       | Admin |

---

## 🔐 Sécurité

- **Mots de passe** : Hashés avec bcrypt (salt rounds: 10)
- **Authentification** : JWT avec expiration configurable
- **Autorisation** : Middleware de vérification des rôles
- **Validation** : express-validator pour les entrées utilisateur
- **CORS** : Configuré pour les requêtes cross-origin

---

## 📜 Scripts disponibles

### Frontend

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build pour la production
npm run preview  # Prévisualise le build de production
npm run lint     # Analyse le code avec ESLint
```

### Backend

```bash
npm start        # Démarre le serveur avec nodemon (hot reload)
```

---

## 🎨 UI/UX

L'interface utilise **DaisyUI** sur **Tailwind CSS** pour un design moderne et responsive :

- 🎯 Navigation intuitive avec sidebar
- 📱 Design responsive (mobile-first)
- 🌙 Composants DaisyUI (modals, cards, alerts, etc.)
- ✨ Animations et transitions fluides
- 📖 Support du Markdown avec `@tailwindcss/typography`

---

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Pushez sur la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence ISC.

---

## 👤 Auteur

Développé avec ❤️ pour simplifier la gestion de documentation technique.

---

## 🐛 Problèmes connus

Si vous rencontrez des problèmes :

1. Vérifiez que MySQL est bien démarré
2. Vérifiez les variables d'environnement dans `.env`
3. Assurez-vous que les ports 3000 et 5173 sont disponibles
4. Consultez les logs du serveur et de la console navigateur

Pour signaler un bug, ouvrez une issue sur le repository GitHub.
