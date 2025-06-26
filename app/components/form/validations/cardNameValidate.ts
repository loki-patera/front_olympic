import { ErrorFieldType } from './errorFieldType'

/**
 * Fonction de validation pour le nom de la carte de crédit.
 * 
 * @param {string} value - Le nom sur la carte à valider.
 * 
 * @return {ErrorFieldType | undefined} - Retourne une erreur si le nom est invalide, sinon `undefined`.
 */
export const cardNameValidate = (value: string): ErrorFieldType | undefined => {

  if (!value) {
    // Vérifie si le champ nom de la carte est vide
    return { message: "Le nom sur la carte est requis.", type: "warning" }
  }

  if (/^\s+|\s+$/.test(value)) {
    // Vérifie si le nom de la carte commence ou finit par un espace ou une tabulation
    return { message: "Le nom ne doit pas commencer ou finir par un espace.", type: "warning" }
  }

  // Sépare le nom en parties (prénom, nom, composés) en utilisant les espaces et tirets comme séparateurs
  const partCardName = value.trim().split(/[\s\-]/)

  if (partCardName.some(part => part.length > 0 && part.length < 2)) {
    // Vérifie si chaque partie du nom (prénom, nom, composés) contient au moins 2 lettres
    return {
      message: "Chaque partie du nom doit contenir au moins 2 lettres.",
      type: "warning"
    }
  }

  // Regex pour valider une partie d'un nom (prénom ou nom de famille)
  const word = "[A-ZÀ-ÖÙ-ÝÇ][a-zà-öù-ÿç]+(?:[-][A-ZÀ-ÖÙ-ÝÇ][a-zà-öù-ÿç]+)*"

  // Regex pour valider le nom complet
  const nameRegex = new RegExp(`^${word}( ${word})+$`)

  if (!nameRegex.test(value.trim())) {
    // Vérifie si le nom de la carte ne correspond pas au format requis
    return {
      message: `Le nom doit comporter un Prénom et un Nom de famille, séparés par un espace.`,
      type: "warning"
    }
  }

  // Retourne `undefined` si le nom de la carte est valide
  return undefined
}