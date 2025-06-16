import { UserType } from '../../types'

/**
 * Type `FieldError` pour représenter une erreur de validation de champ
 * 
 * @property {string} message - Le message d'erreur à afficher
 * @property {"warning" | "error"} type - Le type d'erreur (avertissement ou erreur)
 */
export type FieldError = {
  message: string
  type: "warning" | "error"
}

/**
 * Fonction `validateEmail` pour valider un email
 * 
 * @param {UserType["email"]} value - L'email à valider
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si l'email est invalide, sinon `undefined`
 */
export const validateEmail = (value: UserType["email"]): FieldError | undefined => {

  if (value.length < 6) {
    // Si l'email contient moins de 6 caractères, retourne un message d'erreur
    return { message: "L'email doit contenir au moins 6 caractères.", type: "warning" }
  }
  if (value.length > 100) {
    // Si l'email dépasse 100 caractères, retourne un message d'erreur
    return { message: "L'email ne peut pas dépasser 100 caractères.", type: "warning" }
  }

  // Regex pour valider l'email
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  if (!emailRegex.test(value) && value !== "") {
    // Si l'email ne correspond pas au format requis, retourne un message d'erreur
    return {
      message: "L'email doit contenir au minimum un caractère avant et après le @, suivi d'un point et de 2 caractères minimum.",
      type: "warning"
    }
  }

  // Retourne `undefined` si l'email est valide
  return undefined
}

/**
 * Fonction `validateFirstname` pour valider un prénom
 * 
 * @param {UserType["firstname"]} value - Le prénom à valider
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si le prénom est invalide, sinon `undefined`
 */
export const validateFirstname = (value: UserType["firstname"]): FieldError | undefined => {

  if (value.length < 2) {
    // Si le prénom contient moins de 2 caractères, retourne un message d'erreur
    return { message: "Le prénom doit contenir au moins 2 caractères.", type: "warning" }
  }
  if (value.length > 50) {
    // Si le prénom dépasse 50 caractères, retourne un message d'erreur
    return { message: "Le prénom ne peut pas dépasser 50 caractères.", type: "warning" }
  }

  // Regex pour valider le prénom
  const firstnameRegex = /^(?=.{2,50}$)[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+(?:-[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+)*$/u

  if (!firstnameRegex.test(value) && value !== "") {
    // Si le prénom ne correspond pas au format requis, retourne un message d'erreur
    return {
      message: "Le prénom doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les prénoms composés.",
      type: "warning"
    }
  }

  // Retourne `undefined` si le prénom est valide
  return undefined
}

/**
 * Fonction `validateLastname` pour valider un nom de famille
 * 
 * @param {UserType["lastname"]} value - Le nom de famille à valider
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si le nom de famille est invalide, sinon `undefined`
 */
export const validateLastname = (value: UserType["lastname"]): FieldError | undefined => {

  if (value.length < 2) {
    // Si le nom de famille contient moins de 2 caractères, retourne un message d'erreur
    return { message: "Le nom de famille doit contenir au moins 2 caractères.", type: "warning" }
  }
  if (value.length > 50) {
    // Si le nom de famille dépasse 50 caractères, retourne un message d'erreur
    return { message: "Le nom de famille ne peut pas dépasser 50 caractères.", type: "warning" }
  }

  // Regex pour valider le nom de famille
  const lastnameRegex = /^(?=.{2,50}$)[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+(?:-[A-ZÀ-ÖÙ-Ý][a-zà-öù-ÿ]+)*$/u

  if (!lastnameRegex.test(value) && value !== "") {
    // Si le nom de famille ne correspond pas au format requis, retourne un message d'erreur
    return {
      message: "Le nom de famille doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les noms composés.",
      type: "warning"
    }
  }

  // Retourne `undefined` si le nom de famille est valide
  return undefined
}

/**
 * Fonction `validateBirthDate` pour valider une date de naissance
 * 
 * @param {UserType["date_of_birth"]} value - La date de naissance à valider
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si la date de naissance est invalide, sinon `undefined`
 */
export const validateBirthDate = (value: UserType["date_of_birth"]): FieldError | undefined => {

  // Regex pour valider la date de naissance
  const birthDateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

  if (!birthDateRegex.test(value)) {
    // Si la date de naissance ne correspond pas au format requis, retourne un message d'erreur
    return { message: "La date de naissance n'est pas conforme.", type: "warning" }
  }

  // Conversion de la date de naissance en année, mois et jour
  const [year, month, day] = value.split('-').map(Number)

  // Création d'un objet Date pour la date de naissance
  const birth = new Date(year, month - 1, day)

  // Récupération de la date d'aujourd'hui
  const today = new Date()

  // Date minimale pour être majeur (18 ans)
  const minBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

  if (birth > minBirth) {
    // Si la date de naissance est postérieure à la date minimale, retourne un message d'erreur
    return { message: "Vous devez avoir au moins 18 ans pour créer un compte.", type: "warning" }
  }
  if (birth < new Date(1900, 0, 1)) {
    // Si la date de naissance est antérieure à 1900, retourne un message d'erreur
    return { message: "La date de naissance doit être postérieure à 1900.", type: "warning" }
  }

  // Retourne `undefined` si la date de naissance est valide
  return undefined
}

/**
 * Fonction `validateCountry` pour valider un pays
 * 
 * @param {UserType["country"]} value - Le pays à valider
 * @param {string[]} countries - La liste des pays autorisés
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si le pays est invalide, sinon `undefined`
 */
export const validateCountry = (value: UserType["country"], countries: string[]): FieldError | undefined => {

  if (value.length > 75) {
    // Si le pays dépasse 75 caractères, retourne un message d'erreur
    return { message: "Le pays ne peut pas dépasser 75 caractères.", type: "warning" }
  }
  if (!countries.includes(value)) {
    // Si le pays n'est pas dans la liste des pays autorisés, retourne un message d'erreur
    return { message: "Ce pays ne fait pas partie de la liste des pays autorisés.", type: "warning" }
  }

  // Retourne `undefined` si le pays est valide
  return undefined
}

/**
 * Fonction `validatePassword` pour valider un mot de passe
 * 
 * @param {UserType["password"]} value - Le mot de passe à valider
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si le mot de passe est invalide, sinon `undefined`
 */
export const validatePassword = (value: UserType["password"]): FieldError | undefined => {

  // Caractères interdits dans le mot de passe
  const forbiddenChars = /[<>"'`;\/\\|&()\[\]{}]/

  if (forbiddenChars.test(value)) {
    // Si le mot de passe contient des caractères interdits, retourne un message d'erreur
    return { message: "Des caractères interdits sont présents dans le mot de passe.", type: "warning" }
  }
  if (value.length < 16) {
    // Si le mot de passe contient moins de 16 caractères, retourne un message d'erreur
    return { message: "Le mot de passe doit contenir au moins 16 caractères.", type: "warning" }
  }
  if (value.length > 128) {
    // Si le mot de passe dépasse 128 caractères, retourne un message d'erreur
    return { message: "Le mot de passe ne peut pas dépasser 128 caractères.", type: "warning" }
  }

  // Regex pour valider le mot de passe
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{16,128}$/

  if (!passwordRegex.test(value)) {
    // Si le mot de passe ne correspond pas au format requis, retourne un message d'erreur
    return {
      message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      type: "warning"
    }
  }

  // Retourne `undefined` si le mot de passe est valide
  return undefined
}

/**
 * Fonction `validateConfirmPassword` pour valider la confirmation du mot de passe
 * 
 * @param {UserType["password"]} value - Le mot de passe de confirmation à valider
 * @param {UserType["password"]} password - Le mot de passe principal à comparer
 * 
 * @return {FieldError | undefined} - Retourne un objet d'erreur si le mot de passe de confirmation est invalide, sinon `undefined`
 */
export const validateConfirmPassword = (value: UserType["password"], password: UserType["password"]): FieldError | undefined => {

  if (value !== password) {
    // Si le mot de passe de confirmation ne correspond pas au mot de passe principal, retourne un message d'erreur
    return { message: "Le second mot de passe doit correspondre au mot de passe principal.", type: "warning" }
  }

  // Retourne `undefined` si le mot de passe de confirmation est valide
  return undefined
}