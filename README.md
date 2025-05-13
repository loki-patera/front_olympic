# front_olympic (Billetterie des JO)

**Description** : Ce projet étudiant comprend une version front-end pour l'interface de la billetterie des Jeux
olympiques. Il utilise `Next.js`, `TypeScript` et `Tailwind`.


## Prérequis

- [Node 22.14.0](https://nodejs.org/fr/download) avec npm


## Installation

Pour une installation en local via le terminal de commande, suivre les étapes suivantes :

  1. Cloner le dépôt :
      ```bash
      git clone https://github.com/loki-patera/front_olympic.git
      ```
  
  2. À la racine du projet, entrer dans le dossier `front_olympic` :
      ```bash
      cd front_olympic
      ```
  
  3. Installer les dépendances nécessaires :
      ```bash
      npm install
      ```
  
  4. Créer un fichier `.env.local` dans le dossier `front_olympic` et intégrer cette variable :
      ```bash
      API_URL=http://127.0.0.1:8000
      ```
  
## Tests

Pour consulter le résultat des tests incorporés à l'application et réalisés avec `Jest`, suivre les étapes suivantes :

  1. Lancer les tests et afficher un rapport de couverture dans le terminal :
      ```bash
      npm run test
      ```
  
  2. Pour consulter le rapport détaillé au format html, ouvrir le fichier `index.html`, qui se trouve dans le dossier
  `coverage/lcov-report` créé lors de l'éxécution des tests, dans un navigateur.

## Utilisation

Pour utiliser l'application en local, suivre les étapes suivantes :

  1. S'assurer que le serveur du côté back-end est lancé en amont
      → Voir les étapes dans le fichier `README.md` du back-end

  2. Lancer le serveur de développement :
      ```bash
      npm run dev
      ```
  
  3. Ouvrir le serveur à l'adresse [http://localhost:3000/](http://localhost:3000/)

## Documentation

Pour consulter la documentation intégrée au projet au format html et réalisée avec `Typedoc` :

  1. Ouvrir le fichier `index.html`, qui se trouve dans le dossier `docs`, dans un navigateur. Chaque fichier documenté
  est relié à son code dans `Github`.