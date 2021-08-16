# Présentation du projet

So Pekocko est une entreprise dont l'activité principale est la création de sauces piquantes. Elle souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.


# Objectifs

- Créer une API Rest
- Utiliser des pratiques de code sécurisées (RGPD + OWASP)

[Note de cadrage](https://s3.eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P6/P6_Note%20de%20cadrage%20So%20Pekocko_V3.pdf)

**Principales routes API :**

| Verb           | Paramètres           |
| -------------  |:-------------:       |
| POST           | /api/auth/signup     |
| POST           | /api/auth/login      |
| GET            | /api/sauces          |
| GET            | /api/sauces/:id      |
| POST           | /api/sauces          |
| PUT            | /api/sauces/:id      |
| DELETE         | /api/sauces/:id      |
| POST           | /api/sauces/:id/like |


# Environnements

## Frontend

Lien vers le repository du frontend : https://github.com/OpenClassrooms-Student-Center/dwj-projet6

**Démarrer le frontend :**
- Ouvrir le dossier frontend et exécuter npm install pour installer les dépendances.
- Exécuter ng serve pour lancer le serveur.
- Se rendre sur http://localhost:4200 .


## Backend

**Outils utilisés :**
- Framework : Express
- Serveur : NodejS
- Base de données : MongoDB
- Langage : JavaScript

**Démarrer le back-end :**
- Ouvrir le dossier backend et exécuter npm install pour installer les dépendances.
- Dans le dossier backend, créer un fichier .env et intégrer les variables suivantes : 
  - "DATABASE=" suivi du lien vers la base de données
  - "CRYPTO_SECRET"= suivi d'une chaîne de caractères représentant le mot de passe pour le chiffrement des adresses e-mail.
  - "ACCESS_TOKEN_SECRET=" suivi de la chaîne de caractères à utiliser pour la création du Token.
- Dans le dossier backend, créer un fichier access.log.
- Exécuter nodemon server pour lancer le serveur.
