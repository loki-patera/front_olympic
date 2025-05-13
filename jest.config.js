/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {

  // Utilise ts-jest comme preset pour TypeScript
  preset: "ts-jest",

  // Environnement DOM pour tester les composants React
  testEnvironment: "jest-environment-jsdom",

  // Utilise SWC pour transformer les fichiers JavaScript et TypeScript
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["@swc/jest"]
  },

  // Fichier de configuration supplémentaire pour Jest
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  
  // Active la collecte de couverture
  collectCoverage: true,

  // Spécifie les fichiers à inclure dans la couverture
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}", // Inclut tous les fichiers TypeScript et TSX dans le dossier app
    "lib/**/*.{ts,tsx}", // Inclut tous les fichiers TypeScript et TSX dans le dossier lib
    "!**/node_modules/**", // Exclut les fichiers des modules node
    "!**/coverage/**" // Exclut les fichiers de couverture eux-mêmes
  ],

  // Spécifie le dossier de stockage pour les résultats de couverture
  coverageDirectory: "coverage",

  // Permet de simuler les fichiers CSS pour éviter les erreurs lors des tests 
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy"
  }
}