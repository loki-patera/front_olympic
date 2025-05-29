/**
 * Fonction `validateEmail` pour valider un email
 * 
 * @param {string} value - L'email à valider
 * 
 * @return {boolean} - Retourne `true` si l'email est valide, sinon `false`
 */
export const validateEmail = (value: string): boolean => {

  // Regex pour valider l'email
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  // Retourne vrai si l'email est valide
  return emailRegex.test(value) && value.length <= 100
}

/**
 * Fonction `validateFirstName` pour valider un prénom
 * 
 * @param {string} value - Le prénom à valider
 * 
 * @return {boolean} - Retourne `true` si le prénom est valide, sinon `false`
 */
export const validateFirstName = (value: string): boolean => {

  // Regex pour valider le prénom
  const firstNameRegex = /^(?=.{2,50}$)[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+(?:-[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+)*$/u

  // Retourne vrai si le prénom est valide
  return firstNameRegex.test(value)
}

/**
 * Fonction `validateLastName` pour valider un nom de famille
 * 
 * @param {string} value - Le nom de famille à valider
 * 
 * @return {boolean} - Retourne `true` si le nom de famille est valide, sinon `false`
 */
export const validateLastName = (value: string): boolean => {

  // Regex pour valider le nom
  const lastNameRegex = /^(?=.{2,50}$)[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+(?:-[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+)*$/u

  // Retourne vrai si le nom est valide
  return lastNameRegex.test(value)
}

/**
 * Fonction `validateBirthDate` pour valider une date de naissance
 * 
 * @param {string} value - La date de naissance à valider
 * 
 * @return {boolean} - Retourne `true` si la date de naissance est valide et si l'utilisateur a au moins 18 ans, sinon `false`
 */
export const validateBirthDate = (value: string): boolean => {

  // Regex pour valider la date de naissance
  const birthDateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

  // Si la date de naissance n'est pas valide, retourne faux
  if (!birthDateRegex.test(value)) return false

  // Conversion de la date de naissance en année, mois et jour
  const [year, month, day] = value.split('-').map(Number)

  // Création d'un objet Date pour la date de naissance
  const birth = new Date(year, month - 1, day)

  // Récupération de la date d'aujourd'hui
  const today = new Date()

  // Date minimale pour être majeur (18 ans)
  const minBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

  // Retourne vrai si la date de naissance est valide et si l'utilisateur a au moins 18 ans
  return birth <= minBirth
}