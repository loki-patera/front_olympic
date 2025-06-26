import { ErrorFieldType } from './errorFieldType'

/**
 * Fonction de validation pour la date d'expiration d'une carte de paiement.
 * 
 * @param {string} value - La date d'expiration.
 * 
 * @return {ErrorFieldType | undefined} - Retourne un objet d'erreur si la date d'expiration est invalide, sinon `undefined`.
 */
export const expirationDateValidate = (value: string): ErrorFieldType | undefined => {
  
  if (!value) {
    // Vérifie si le champ date d'expiration est vide
    return { message: "La date d'expiration est requise.", type: "warning" }
  }

  // Récupère la date actuelle
  const now = new Date()
  const [year, month] = value.split("-").map(Number)

  // Récupère l'année et le mois actuels
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    // Vérifie si la date d'expiration est passée
    return { message: "La date d'expiration ne peut pas être passée.", type: "warning" }
  }

  const maxYear = currentYear + 6
  if (year > maxYear || (year === maxYear && month > currentMonth)) {
    // Vérifie si la date d'expiration est plus de 6 ans dans le futur
    return { message: "La date d'expiration ne peut pas être plus de 6 ans dans le futur.", type: "warning" }
  }

  // Retourne `undefined` si la date d'expiration est valide
  return undefined
}