import { UserType } from "../../types"

/**
 * Fonction `validateEmail` pour valider un email
 * 
 * @param {UserType["email"]} value - L'email à valider
 * 
 * @return {boolean} - Retourne `true` si l'email est valide, sinon `false`
 */
export const validateEmail = (value: UserType["email"]): boolean => {

  // Regex pour valider l'email
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  // Retourne vrai si l'email est valide
  return emailRegex.test(value) && value.length <= 100
}

/**
 * Fonction `validateFirstName` pour valider un prénom
 * 
 * @param {UserType["firstname"]} value - Le prénom à valider
 * 
 * @return {boolean} - Retourne `true` si le prénom est valide, sinon `false`
 */
export const validateFirstName = (value: UserType["firstname"]): boolean => {

  // Regex pour valider le prénom
  const firstNameRegex = /^(?=.{2,50}$)[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+(?:-[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+)*$/u

  // Retourne vrai si le prénom est valide
  return firstNameRegex.test(value)
}

/**
 * Fonction `validateLastName` pour valider un nom de famille
 * 
 * @param {UserType["lastname"]} value - Le nom de famille à valider
 * 
 * @return {boolean} - Retourne `true` si le nom de famille est valide, sinon `false`
 */
export const validateLastName = (value: UserType["lastname"]): boolean => {

  // Regex pour valider le nom
  const lastNameRegex = /^(?=.{2,50}$)[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+(?:-[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+)*$/u

  // Retourne vrai si le nom est valide
  return lastNameRegex.test(value)
}

/**
 * Fonction `validateBirthDate` pour valider une date de naissance
 * 
 * @param {UserType["date_of_birth"]} value - La date de naissance à valider
 * 
 * @return {boolean} - Retourne `true` si la date de naissance est valide et si l'utilisateur a au moins 18 ans, sinon `false`
 */
export const validateBirthDate = (value: UserType["date_of_birth"]): boolean => {

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

/**
 * Fonction `validatePassword` pour valider un mot de passe
 * 
 * @param {UserType["password"]} value - Le mot de passe à valider
 * 
 * @return {boolean} - Retourne `true` si le mot de passe est valide, sinon `false`
 */
export const validatePassword = (value: UserType["password"]): boolean => {

  // Caractères interdits dans le mot de passe
  const forbiddenChars = /[<>"'`;\/\\|&()\[\]{}]/

  // Vérifie si le mot de passe contient des caractères interdits
  if (forbiddenChars.test(value)) return false

  // Regex pour valider le mot de passe
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{16,}$/

  // Retourne vrai si le mot de passe est valide
  return passwordRegex.test(value)
}

/**
 * Fonction `validateConfirmPassword` pour valider la confirmation du mot de passe
 * 
 * @param {UserType["password"]} value - Le mot de passe de confirmation à valider
 * @param {UserType["password"]} password - Le mot de passe principal à comparer
 * 
 * @return {boolean} - Retourne `true` si le mot de passe de confirmation correspond au mot de passe principal, sinon `false`
 */
export const validateConfirmPassword = (value: UserType["password"], password: UserType["password"]): boolean => {

  // Retourne vrai si le mot de passe de confirmation correspond au mot de passe principal
  return value === password
}