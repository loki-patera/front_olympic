import { ErrorFieldType } from './errorFieldType'

/**
 * Fonction de validation pour un numéro de carte de crédit.
 * 
 * @param {string} value - Le numéro de carte à valider.
 * 
 * @return {ErrorFieldType | undefined} - Retourne une erreur si le numéro est invalide, sinon `undefined`.
 */
export const cardNumberValidate = (value: string): ErrorFieldType | undefined => {

  if (!value) {
    // Vérifie si le champ numéro de carte est vide
    return { message: "Le numéro de carte est requis.", type: "warning" }
  }

  // Supprime les espaces éventuels
  const sanitized = value.replace(/\s+/g, "")

  // Regex pour valider un numéro de carte de crédit (16 chiffres)
  const cardRegex = /^\d{16}$/

  if (!cardRegex.test(sanitized)) {
    // Vérifie si le numéro de carte ne correspond pas au format requis
    return { message: "Le numéro de carte doit comporter exactement 16 chiffres.", type: "warning" }
  }
  if (/^(\d)\1+$/.test(sanitized)) {
    // Vérifie si le numéro de carte est composé de chiffres identiques
    return { message: "Le numéro de carte ne doit pas être composé de chiffres identiques.", type: "warning" }
  }

  // Retourne `undefined` si le numéro de carte est valide
  return undefined
}