'use client'

import { ChangeEventHandler, FocusEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CustomButton } from '../shared/CustomButton'
import { checkEmailExists, loginUser, registerUser } from '../../../lib/api'
import { validateEmail, validateFirstname, validateLastname, validateBirthDate, validateCountry, validatePassword, validateConfirmPassword,
  FieldError } from './validation'
import { BirthDateField, ConfirmPasswordField, CountrySelect, EmailField, FirstNameField, LastNameField, PasswordField } from './fields'
import { UserType } from '../../types'
import { useUser } from '../../context'

/**
 * Composant `SignForm` pour gérer la connexion ou la création de compte.
 * 
 * @example
 * ```tsx
 * <SignForm />
 * ```
 */
export const SignForm = (): React.JSX.Element => {

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Récupération de la fonction de connexion du contexte utilisateur
  const { login } = useUser()

  // --------------------------------------------------------------------- États ---------------------------------------------------------------------

  // État local pour l'email
  const [email, setEmail] = useState<UserType["email"]>("")

  // État local pour la validité de l'email
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

  // État local pour savoir si le champ email a été touché
  const [emailTouched, setEmailTouched] = useState<boolean>(false)

  // État local pour stocker si l'email existe ou non
  const [emailExists, setEmailExists] = useState<boolean | null>(null)


  // État local pour gérer le chargement
  const [loading, setLoading] = useState<boolean>(false)

  // État local pour l'étape de connexion
  const [isSignIn, setIsSignIn] = useState<boolean>(false)

  // État local pour l'étape avant la création de compte
  const [isBeforeSignUp, setIsBeforeSignUp] = useState<boolean>(false)


  // État local pour le prénom lors de la création de compte
  const [firstname, setFirstname] = useState<UserType["firstname"]>("")

  // État local pour la validité du prénom
  const [isFirstnameValid, setIsFirstnameValid] = useState<boolean>(false)

  // État local pour savoir si le champ prénom a été touché
  const [firstnameTouched, setFirstnameTouched] = useState<boolean>(false)


  // État local pour le nom lors de la création de compte
  const [lastname, setLastname] = useState<UserType["lastname"]>("")

  // État local pour la validité du nom
  const [isLastnameValid, setIsLastnameValid] = useState<boolean>(false)

  // État local pour savoir si le champ nom a été touché
  const [lastnameTouched, setLastnameTouched] = useState<boolean>(false)


  // État local pour la date de naissance
  const [birthDate, setBirthDate] = useState<UserType["date_of_birth"]>("")

  // État local pour la validité de la date de naissance
  const [isBirthDateValid, setIsBirthDateValid] = useState<boolean>(false)

  // État local pour savoir si le champ date de naissance a été touché
  const [birthDateTouched, setBirthDateTouched] = useState<boolean>(false)


  // État local pour le pays
  const [country, setCountry] = useState<UserType["country"]>("")

  // État local pour la validité du pays
  const [isCountryValid, setIsCountryValid] = useState<boolean>(false)

  // État local pour savoir si le champ pays a été touché
  const [countryTouched, setCountryTouched] = useState<boolean>(false)


  // État local pour l'étape de la création de compte
  const [isSignUp, setIsSignUp] = useState<boolean>(false)


  // État local pour le mot de passe
  const [password, setPassword] = useState<UserType["password"]>("")

  // État local pour la validité du mot de passe
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

  // État local pour savoir si le champ mot de passe a été touché
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false)


  // État local pour le mot de passe de confirmation
  const [confirmPassword, setConfirmPassword] = useState<UserType["password"]>("")

  // État local pour la validité du mot de passe de confirmation
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<boolean>(false)

  // État local pour savoir si le champ de confirmation du mot de passe a été touché
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState<boolean>(false)


  // État local pour le message de succès
  const [successMessage, setSuccessMessage] = useState<string>("")

  // État local pour le champ bloquant
  const [blockingField, setBlockingField] = useState<string | null>(null)

  // État local pour les messages d'erreur de chaque champ
  const [fieldErrors, setFieldErrors] = useState<Record<string, FieldError>>({})

  // État local pour les erreurs globales
  const [globalError, setGlobalError] = useState<string>("")


  // ----------------------------------------------------------------- Liste des pays ----------------------------------------------------------------

  const countries = [
    "Afghanistan", "Afrique du Sud", "Ahvenanmaa", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Anguilla", "Antarctique",
    "Antigua-et-Barbuda", "Arabie Saoudite", "Argentine", "Arménie", "Aruba", "Australie", "Autriche", "Azerbaïdjan", "Bahamas", "Bahreïn",
    "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bermudes", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine",
    "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi", "Cambodge", "Cameroun", "Canada", "Chili", "Chine", "Chypre",
    "Cité du Vatican", "Colombie", "Comores", "Congo", "Congo (Rép. dém.)", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d'Ivoire",
    "Croatie", "Cuba", "Curaçao", "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne",
    "Estonie", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France", "Gabon", "Gambie", "Géorgie", "Géorgie du Sud-et-les Îles Sandwich du Sud",
    "Ghana", "Gibraltar", "Grèce", "Grenade", "Groenland", "Guadeloupe", "Guam", "Guatemala", "Guernesey", "Guinée", "Guinée équatoriale",
    "Guinée-Bissau", "Guyana", "Guyane", "Haïti", "Honduras", "Hong Kong", "Hongrie", "Île Bouvet", "Île Christmas", "Île de Man", "Île Maurice",
    "Île Norfolk", "Îles Caïmans", "Îles Cocos", "Îles Cook", "Îles du Cap-Vert", "Îles Féroé", "Îles Heard-et-MacDonald", "Îles Malouines",
    "Îles Mariannes du Nord", "Îles Marshall", "Îles mineures éloignées des États-Unis", "Îles Pitcairn", "Îles Salomon", "Îles Turques-et-Caïques",
    "Îles Vierges britanniques", "Îles Vierges des États-Unis", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie",
    "Jamaïque", "Japon", "Jersey", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Kosovo", "Koweït", "Laos", "Lesotho", "Lettonie",
    "Liban", "Liberia", "Libye", "Liechtenstein", "Lituanie", "Luxembourg", "Macao", "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi",
    "Maldives", "Mali", "Malte", "Maroc", "Martinique", "Mauritanie", "Mayotte", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie",
    "Monténégro", "Montserrat", "Mozambique", "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigéria", "Niue", "Norvège", "Nouvelle-Calédonie",
    "Nouvelle-Zélande", "Oman", "Ouganda", "Ouzbékistan", "Pakistan", "Palaos (Palau)", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée",
    "Paraguay", "Pays-Bas", "Pays-Bas caribéens", "Pérou", "Philippines", "Pologne", "Polynésie française", "Porto Rico", "Portugal", "Qatar",
    "République centrafricaine", "République dominicaine", "Réunion", "Roumanie", "Royaume-Uni", "Russie", "Rwanda", "Sahara Occidental",
    "Saint-Barthélemy", "Saint-Christophe-et-Niévès", "Saint-Marin", "Saint-Martin", "Saint-Pierre-et-Miquelon", "Saint-Vincent-et-les-Grenadines",
    "Sainte-Hélène, Ascension et Tristan da Cunha", "Sainte-Lucie", "Salvador", "Samoa", "Samoa américaines", "São Tomé et Príncipe", "Sénégal",
    "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède",
    "Suisse", "Surinam", "Svalbard et Jan Mayen", "Swaziland", "Syrie", "Tadjikistan", "Taïwan", "Tanzanie", "Tchad", "Tchéquie",
    "Terres australes et antarctiques françaises", "Territoire britannique de l'océan Indien", "Thaïlande", "Timor oriental", "Togo", "Tokelau",
    "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu", "Ukraine", "Uruguay", "Vanuatu", "Venezuela", "Viêt Nam",
    "Wallis-et-Futuna", "Yémen", "Zambie", "Zimbabwe"
  ]
  

  // ------------------------------------------------------------ Gestions des changements -----------------------------------------------------------

  // Fonction pour gérer les changements dans le champ email
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état de l'email
    setEmail(value)

    // Récupère l'état de validité de l'email en utilisant la fonction de validation
    const error = validateEmail(value)

    // Met à jour l'état de validité de l'email
    setIsEmailValid(!error)

    if (error) {
      // Si l'email est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, email: error }))
    } else {
      // Si l'email est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { email, ...rest } = prev
        return rest
      })
    }

    // Réinitialise l'état de `emailExists` à null à chaque changement
    setEmailExists(null)

    // Réinitialise le message de succès
    setSuccessMessage("")

    // Si le champ bloquant est l'email et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "email" && !error) setBlockingField(null)
  }

  // Fonction pour gérer les changements dans le champ prénom
  const handleFirstnameChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du prénom
    setFirstname(value)

    // Récupère l'état de validité du prénom en utilisant la fonction de validation
    const error = validateFirstname(value)

    // Met à jour l'état de validité du prénom
    setIsFirstnameValid(!error)

    if (error) {
      // Si le prénom est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, firstname: error }))
    } else {
      // Si le prénom est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { firstname, ...rest } = prev
        return rest
      })
    }

    // Si le champ bloquant est le prénom et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "firstname" && !error) setBlockingField(null)
  }

  // Fonction pour gérer les changements dans le champ nom
  const handleLastnameChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du nom
    setLastname(value)

    // Récupère l'état de validité du nom de famille en utilisant la fonction de validation
    const error = validateLastname(value)
    
    // Met à jour l'état de validité du nom de famille
    setIsLastnameValid(!error)

    if (error) {
      // Si le nom de famille est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, lastname: error }))
    } else {
      // Si le nom de famille est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { lastname, ...rest } = prev
        return rest
      })
    }

    // Si le champ bloquant est le nom et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "lastname" && !error) setBlockingField(null)
  }

  // Fonction pour gérer les changements dans le champ date de naissance
  const handleBirthDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état de la date de naissance
    setBirthDate(value)

    // Récupère l'état de validité de la date de naissance en utilisant la fonction de validation
    const error = validateBirthDate(value)

    // Met à jour l'état de validité de la date de naissance
    setIsBirthDateValid(!error)

    if (error) {
      // Si la date de naissance est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, date_of_birth: error }))
    } else {
      // Si la date de naissance est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { date_of_birth, ...rest } = prev
        return rest
      })
    }

    // Si le champ bloquant est la date de naissance et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "date_of_birth" && !error) setBlockingField(null)
  }

  // Fonction pour gérer les changements dans le champ pays
  const handleCountryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du pays
    setCountry(value)

    // Récupère l'état de validité du pays en utilisant la fonction de validation
    const error = validateCountry(value, countries)

    // Met à jour l'état de validité du pays
    setIsCountryValid(!error)

    if (error) {
      // Si le pays est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, country: error }))
    } else {
      // Si le pays est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { country, ...rest } = prev
        return rest
      })
    }

    // Si le champ bloquant est le pays et que le pays est valide, réinitialise le champ bloquant
    if (blockingField === "country" && !error) setBlockingField(null)
  }

  // Fonction pour gérer les changements dans le champ mot de passe
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du mot de passe
    setPassword(value)

    // Récupère l'état de validité du mot de passe en utilisant la fonction de validation
    const error = validatePassword(value)

    // Met à jour l'état de validité du mot de passe
    setIsPasswordValid(!error)

    if (error) {
      // Si le mot de passe est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, password: error }))
    } else {
      // Si le mot de passe est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { password, ...rest } = prev
        return rest
      })
    }

    // Met à jour la validité du mot de passe de confirmation en fonction du nouveau mot de passe
    setIsConfirmPasswordValid(!validateConfirmPassword(confirmPassword, value))

    // Si le champ bloquant est le mot de passe et qu'il y a une erreur, réinitialise le champ bloquant
    if (blockingField === "password" && !error) setBlockingField(null)
  }

  // Fonction pour gérer les changements dans le champ de confirmation du mot de passe
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du mot de passe de confirmation
    setConfirmPassword(value)

    // Récupère l'état de validité du mot de passe de confirmation en utilisant la fonction de validation
    const error = validateConfirmPassword(value, password)

    // Met à jour l'état de validité du mot de passe de confirmation
    setIsConfirmPasswordValid(!error)

    if (error) {
      // Si le mot de passe de confirmation est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, confirmPassword: error }))
    } else {
      // Si le mot de passe de confirmation est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { confirmPassword, ...rest } = prev
        return rest
      })
    }
  }


  // ---------------------------------------------------------- Gestion de la perte de focus ---------------------------------------------------------

  // Fonction pour gérer la perte de focus du champ email
  const handleEmailBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ email comme touché
    setEmailTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ prénom
  const handleFirstnameBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ prénom comme touché
    setFirstnameTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ nom
  const handleLastnameBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ nom comme touché
    setLastnameTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ date de naissance
  const handleBirthDateBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ date de naissance comme touché
    setBirthDateTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ pays
  const handleCountryBlur: FocusEventHandler<HTMLSelectElement> = () => {

    // Marque le champ pays comme touché
    setCountryTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ mot de passe
  const handlePasswordBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ mot de passe comme touché
    setPasswordTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ de confirmation du mot de passe
  const handleConfirmPasswordBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ de confirmation du mot de passe comme touché
    setConfirmPasswordTouched(true)
  }


  // ------------------------------------------------------------ Soumission du formulaire -----------------------------------------------------------

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

    // Empêche le comportement par défaut du formulaire et le rechargement de la page
    e.preventDefault()

    // Si à l'étape de connexion
    if (isSignIn) {

      // Met à jour l'état de chargement à true
      setLoading(true)

      try {

        // Appelle l'API pour connecter l'utilisateur
        const result = await loginUser({ email, password })

        // Si l'API retourne un objet avec la clé "success" à true
        if ("success" in result && result.success) {

          // Appel de la fonction de connexion du contexte utilisateur
          await login()

          // Redirection vers la page d'accueil
          router.push("/")
          
          return
        }
        // Si l'API retourne un objet avec la clé "detail"
        else if ("detail" in result) {

          // Met à jour l'état des erreurs globales
          setGlobalError(result.detail)
        }
      } catch (error) {

        // Met à jour l'état des erreurs globales avec un message d'erreur
        setGlobalError("La connexion a échoué suite à un problème technique. Veuillez réessayer plus tard.")

      } finally {

        // Met à jour l'état de chargement à false après la soumission
        setLoading(false)
      }
      return
    }

    // Si à la première étape de la création de compte
    if (isBeforeSignUp && !isSignUp) {

      // Passe à l'étape suivante de la création de compte
      setIsSignUp(true)

      // Réinitialise les erreurs globales
      setGlobalError("")

      return
    }

    // Si à l'étape finale de la création de compte
    if (isSignUp) {

      // Met à jour l'état de chargement à true
      setLoading(true)

      try {
        // Appelle l'API pour enregistrer l'utilisateur
        const result = await registerUser({
          email,
          firstname,
          lastname,
          date_of_birth: birthDate,
          country,
          password
        })

        if (result.success) {

          // En cas de succès de l'inscription, affiche un message de succès
          setSuccessMessage("Inscription réussie !")

          // Réinitialise tous les champs du formulaire et les états associés
          setEmail("")
          setIsEmailValid(false)
          setEmailTouched(false)
          setEmailExists(null)
          setIsBeforeSignUp(false)
          setFirstname("")
          setIsFirstnameValid(false)
          setFirstnameTouched(false)
          setLastname("")
          setIsLastnameValid(false)
          setLastnameTouched(false)
          setBirthDate("")
          setIsBirthDateValid(false)
          setBirthDateTouched(false)
          setCountry("")
          setIsCountryValid(false)
          setCountryTouched(false)
          setIsSignUp(false)
          setPassword("")
          setIsPasswordValid(false)
          setPasswordTouched(false)
          setConfirmPassword("")
          setIsConfirmPasswordValid(false)
          setConfirmPasswordTouched(false)
          setFieldErrors({})

        } else if (result.errors) {

          // Récupération des erreurs de l'API
          const errors: Record<string, string[]> = result.errors

          // Initialisation d'un objet pour stocker les erreurs de chaque champ
          const newFieldErrors: Record<string, FieldError> = {}

          // Parcours des erreurs et les ajoute à l'objet `newFieldErrors`
          Object.entries(errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              newFieldErrors[field] = {
                message: messages[0],     // Prend le premier message d'erreur
                type: "error"             // Définit le type d'erreur
              }
            }
          })

          // Met à jour l'état des erreurs de champ avec les nouvelles erreurs
          setFieldErrors(newFieldErrors)

          // Marque les champs en erreur comme touchés et invalides
          if (errors.email) {
            setEmailTouched(true)
            setIsEmailValid(false)
            setBlockingField("email")
          }
          if (errors.firstname) {
            setFirstnameTouched(true)
            setIsFirstnameValid(false)
            setBlockingField("firstname")
          }
          if (errors.lastname) {
            setLastnameTouched(true)
            setIsLastnameValid(false)
            setBlockingField("lastname")
          }
          if (errors.date_of_birth) {
            setBirthDateTouched(true)
            setIsBirthDateValid(false)
            setBlockingField("date_of_birth")
          }
          if (errors.country) {
            setCountryTouched(true)
            setIsCountryValid(false)
            setBlockingField("country")
          }
          if (errors.password) {
            setPasswordTouched(true)
            setIsPasswordValid(false)
            setBlockingField("password")
          }

          // Si une erreur concerne un champ de l'étape précédente, on revient à cette étape
          if (errors.email || errors.firstname || errors.lastname || errors.date_of_birth || errors.country) {
            setIsSignUp(false)
          }
        }
      } catch (error) {

        // Réinitialise les erreurs de champ
        setFieldErrors({})

        // Réinitialise le message de succès
        setSuccessMessage("")

        // En cas d'erreur technique, retourne au formulaire de connexion
        setIsSignUp(false)
        setIsBeforeSignUp(false)

        // Met à jour l'état des erreurs globales avec un message d'erreur
        setGlobalError("L'inscription a échoué suite à un problème technique. Veuillez réessayer plus tard.")
        
      } finally {

        // Met à jour l'état de chargement à false après la soumission
        setLoading(false)
      }
      return
    }

    // Met l'état de chargement à true
    setLoading(true)

    // Réinitialise l'état de `emailExists` à null avant la vérification
    setEmailExists(null)

    try {

      // Réinitialise les erreurs globales
      setGlobalError("")

      // Appelle l'API pour vérifier si l'email existe
      const exists = await checkEmailExists(email)

      // Met à jour l'état `emailExists` avec le résultat de la vérification
      setEmailExists(exists)

      if (exists) {

        // Si l'email existe, passe à l'étape de connexion
        setIsSignIn(true)
      }

    } catch (error) {

      // En cas d'erreur, considère que l'email n'existe pas
      setEmailExists(null)

      // Met à jour l'état des erreurs globales avec un message d'erreur
      setGlobalError("Erreur technique lors de la vérification de l'email. Veuillez réessayer plus tard.")

    } finally {

      // Met à jour l'état de chargement à false après la vérification
      setLoading(false)
    }
  }

  // Fonction pour gérer la création d'un nouveau compte
  const handleCreateAccount: MouseEventHandler<HTMLButtonElement> = (e) => {

    // Empêche le comportement par défaut du bouton
    e.preventDefault()

    // Met à jour l'état de la première étape de la création de compte
    setIsBeforeSignUp(true)

    // Réinitialise l'état de `emailExists` à null
    setEmailExists(null)

    // Réinitialise les erreurs de champ
    setFieldErrors({})
  }

  // ---------------------------------------------------------------- Bouton désactivé ---------------------------------------------------------------

  const isButtonDisabled =
    !!(loading ||                     // En cours de chargement ou
      !isEmailValid ||                // Email invalide ou
      (isBeforeSignUp && (            // Si on est à la première étape de création de compte
        !isFirstnameValid ||            // Prénom invalide ou
        !isLastnameValid ||             // Nom invalide ou
        !isBirthDateValid ||            // Date de naissance invalide ou
        !isCountryValid                 // Pays invalide
      )) ||
      (isSignUp && (                  // Si on est à l'étape finale de création de compte
        !isPasswordValid ||             // Mot de passe invalide ou
        !isConfirmPasswordValid         // Mot de passe de confirmation invalide
      ))
    )
  
  // ---------------------------------------------------------------- Affichage des erreurs ----------------------------------------------------------

  // Fonction pour afficher les erreurs spécifiques à l'étape
  const renderStepErrors = () => {
    if (!isSignUp) {
      return (
        <div>
          {["email", "firstname", "lastname", "date_of_birth", "country"].map(field =>
            fieldErrors[field]?.message && (
              <div
                key={field}
                className={`mt-2 px-4 py-0.5 w-fit mx-auto rounded-lg text-xs text-center border
                  ${fieldErrors[field].type === "error"
                    ? "bg-red-100 border-red-400 text-red-700"
                    : "bg-yellow-100 border-yellow-400 text-yellow-800"
                  }`}
                role="alert"
              >
                {fieldErrors[field].message}
              </div>
            )
          )}
        </div>
      )
    }
    return (
      <div>
        {["password", "confirmPassword"].map(field =>
          fieldErrors[field] && (
            <div
              key={field}
              className={`mt-2 px-4 py-0.5 w-fit mx-auto rounded-lg text-xs text-center border
                ${fieldErrors[field].type === "error"
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-yellow-100 border-yellow-400 text-yellow-800"
                }`}
              role="alert"
            >
              {fieldErrors[field].message}
            </div>
          )
        )}
      </div>
    )
  }

  return (

    <main className="flex-1 flex items-center justify-center my-8">
      <div className="w-full max-w-md px-8">
          
        <h2 className="text-center text-2xl/9 font-bold text-gray-900">
          {isSignUp
            ? "Créez votre mot de passe"
            : isSignIn
              ? "Entrez votre mot de passe"
              : isBeforeSignUp
                ? "Complétez les informations suivantes"
                : "Connectez-vous ou créez un compte"}
        </h2>

        <div className="mt-10">
          <form
            className="space-y-3"
            // Gestion de la soumission du formulaire
            onSubmit={handleSubmit}
          >
            {!isSignUp && !isSignIn ? (
              <>
                <EmailField
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  isValid={isEmailValid}
                  touched={emailTouched}
                />

                {isBeforeSignUp && (
                  <>
                    <FirstNameField
                      value={firstname}
                      onChange={handleFirstnameChange}
                      onBlur={handleFirstnameBlur}
                      isValid={isFirstnameValid}
                      touched={firstnameTouched}
                    />

                    <LastNameField
                      value={lastname}
                      onChange={handleLastnameChange}
                      onBlur={handleLastnameBlur}
                      isValid={isLastnameValid}
                      touched={lastnameTouched}
                    />

                    <BirthDateField
                      value={birthDate}
                      onChange={handleBirthDateChange}
                      onBlur={handleBirthDateBlur}
                      isValid={isBirthDateValid}
                      touched={birthDateTouched}
                    />

                    <CountrySelect
                      value={country}
                      onChange={handleCountryChange}
                      onBlur={handleCountryBlur}
                      isValid={isCountryValid}
                      touched={countryTouched}
                      countries={countries}
                    />
                  </>
                )}
              </>
            ) : isSignIn ? (
              <PasswordField
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                isValid={isPasswordValid}
                touched={passwordTouched}
              />
            ) : (
              <>
                <PasswordField
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  isValid={isPasswordValid}
                  touched={passwordTouched}
                />
                <ConfirmPasswordField
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                  isValid={isConfirmPasswordValid}
                  touched={confirmPasswordTouched}
                />
              </>
            )}

            <div className="flex justify-center mt-5">
              {!isSignUp && !isSignIn ? (
                emailExists === false && !isBeforeSignUp ? (
                  <CustomButton
                    className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                    disabled={isButtonDisabled}
                    label="Créer un nouveau compte"
                    type="button"
                    // Gestion du clic pour la création de compte
                    onClick={handleCreateAccount}
                  />
                ) : (
                  <CustomButton
                    className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                    disabled={isButtonDisabled}
                    label={loading ? "Vérification..." : "Continuer"}
                    type="submit"
                  />
                )
              ) : isSignIn ? (
                <CustomButton
                  className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                  disabled={loading || !isPasswordValid}
                  label={loading ? "Connexion..." : "Se connecter"}
                  type="submit"
                />
              ) : (
                <CustomButton
                  className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                  disabled={
                    loading ||
                    !isPasswordValid ||
                    !isConfirmPasswordValid
                  }
                  label={loading ? "Vérification..." : "Confirmer l'inscription"}
                  type="submit"
                />
              )}
            </div>

            {/* Si email inconnu et pas en mode création de compte */}
            {emailExists === false && !isBeforeSignUp && (
              <div
                className="px-4 py-0.5 w-fit mx-auto rounded-lg bg-red-100 border border-red-400 text-red-700 text-xs"
                role="alert"
              >
                Email inconnu !
              </div>
            )}

            {renderStepErrors()}

          </form>
        </div>

        {successMessage && !isBeforeSignUp && !isSignUp && (
          <div
            className="mt-4 px-4 py-0.5 w-fit mx-auto rounded-lg bg-green-100 border border-green-400 text-green-700 text-xs text-center"
            role="alert"
          >
            {successMessage}
          </div>
        )}

        {globalError && (
          <div
            className="mt-4 px-4 py-0.5 w-fit mx-auto rounded-lg bg-red-100 border border-red-400 text-red-700 text-xs text-center"
            role="alert"
          >
            {globalError}
          </div>
        )}
      </div>
    </main>
  )
}