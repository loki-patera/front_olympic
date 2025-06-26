import { ErrorFieldType } from './errorFieldType'

/**
 * Fonction de validation pour le code de sécurité (CVC) d'une carte de paiement.
 * 
 * @param {string} value - Le code CVC à valider.
 * 
 * @return {ErrorFieldType | undefined} - Retourne une erreur si le CVC est invalide, sinon `undefined`.
 */
export const cvcValidate = (value: string): ErrorFieldType | undefined => {

  if (!value) {
    // Vérifie si le champ CVC est vide
    return { message: "Le code CVC est requis.", type: "warning" }
  }

  // Supprime les espaces éventuels
  const sanitized = value.replace(/\s+/g, "")

  // Regex pour valider le CVC
  const cvcRegex = /^\d{3}$/

  if (!cvcRegex.test(sanitized)) {
    // Vérifie si le CVC ne correspond pas au format requis
    return { message: "Le code CVC doit comporter exactement 3 chiffres.", type: "warning" }
  }
  if (/^(\d)\1+$/.test(sanitized)) {
    // Vérifie si le CVC est composé de chiffres identiques
    return { message: "Le code CVC ne doit pas être composé de chiffres identiques.", type: "warning" }
  }

  // Retourne `undefined` si le CVC est valide
  return undefined
}