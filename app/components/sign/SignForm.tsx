'use client'

import { ChangeEventHandler, FocusEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react'
import { CustomButton } from '../shared/CustomButton'
import { checkEmailExists, registerUser } from '../../../lib/api'
import { validateEmail, validateFirstname, validateLastname, validateBirthDate, validateCountry, validatePassword, validateConfirmPassword } from './validation'
import { BirthDateField, ConfirmPasswordField, CountrySelect, EmailField, FirstNameField, LastNameField, PasswordField } from './fields'
import { UserType } from '../../types'

/**
 * Composant `SignForm` pour gérer la connexion ou la création de compte.
 * 
 * @example
 * ```tsx
 * <SignForm />
 * ```
 */
export const SignForm = (): React.JSX.Element => {

  // --------------------------------------------------------------------- États ---------------------------------------------------------------------

  // État local pour l'email
  const [email, setEmail] = useState<UserType["email"]>("")

  // État local pour la validité de l'email
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)

  // État local pour savoir si le champ email a été touché
  const [emailTouched, setEmailTouched] = useState<boolean>(false)

  // État local pour stocker si l'email existe ou non
  const [emailExists, setEmailExists] = useState<boolean | null>(null)


  // État local pour gérer le chargement lors de la vérification de l'email
  const [loading, setLoading] = useState<boolean>(false)

  // État local pour déterminer le mode de création de compte
  const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false)


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


  // État local pour gérer l'étape du mot de passe
  const [isPasswordStep, setIsPasswordStep] = useState<boolean>(false)


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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

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

    // Récupère la validité de l'email en utilisant la fonction de validation
    const valid = validateEmail(value)

    // Met à jour l'état de validité de l'email
    setIsEmailValid(valid)

    // Réinitialise les erreurs du champ email
    setFieldErrors(prev => ({ ...prev, email: valid ? "" : prev.email }))

    // Réinitialise l'état de `emailExists` à null à chaque changement
    setEmailExists(null)

    // Réinitialise le message de succès
    setSuccessMessage("")

    // Si le champ bloquant est l'email et que l'email est valide
    if (blockingField === "email" && valid) {
      // Réinitialise le champ bloquant
      setBlockingField(null)
    }
  }

  // Fonction pour gérer les changements dans le champ prénom
  const handleFirstnameChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du prénom
    setFirstname(value)

    // Récupère la validité du prénom en utilisant la fonction de validation
    const valid = validateFirstname(value)

    // Met à jour l'état de validité du prénom
    setIsFirstnameValid(valid)

    // Réinitialise les erreurs du champ prénom
    setFieldErrors(prev => ({ ...prev, firstname: valid ? "" : prev.firstname }))

    // Si le champ bloquant est le prénom et que le prénom est valide
    if (blockingField === "firstname" && valid) {
      // Réinitialise le champ bloquant
      setBlockingField(null)
    }
  }

  // Fonction pour gérer les changements dans le champ nom
  const handleLastnameChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du nom
    setLastname(value)

    // Récupère la validité du nom en utilisant la fonction de validation
    const valid = validateLastname(value)

    // Met à jour l'état de validité du nom
    setIsLastnameValid(valid)

    // Réinitialise les erreurs du champ nom
    setFieldErrors(prev => ({ ...prev, lastname: valid ? "" : prev.lastname }))

    // Si le champ bloquant est le nom et que le nom est valide
    if (blockingField === "lastname" && valid) {
      // Réinitialise le champ bloquant
      setBlockingField(null)
    }
  }

  // Fonction pour gérer les changements dans le champ date de naissance
  const handleBirthDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état de la date de naissance
    setBirthDate(value)

    // Récupère la validité de la date de naissance en utilisant la fonction de validation
    const valid = validateBirthDate(value)

    // Met à jour l'état de validité de la date de naissance
    setIsBirthDateValid(valid)

    // Réinitialise les erreurs du champ date de naissance
    setFieldErrors(prev => ({ ...prev, date_of_birth: valid ? "" : prev.date_of_birth }))

    // Si le champ bloquant est la date de naissance et que la date de naissance est valide
    if (blockingField === "date_of_birth" && valid) {
      // Réinitialise le champ bloquant
      setBlockingField(null)
    }
  }

  // Fonction pour gérer les changements dans le champ pays
  const handleCountryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du pays
    setCountry(value)

    // Récupère la validité du pays en utilisant la fonction de validation
    const valid = validateCountry(value, countries)

    // Met à jour l'état de validité du pays
    setIsCountryValid(valid)

    // Réinitialise les erreurs du champ pays
    setFieldErrors(prev => ({ ...prev, country: valid ? "" : prev.country }))

    // Si le champ bloquant est le pays et que le pays est valide
    if (blockingField === "country" && valid) {
      // Réinitialise le champ bloquant
      setBlockingField(null)
    }
  }

  // Fonction pour gérer les changements dans le champ mot de passe
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du mot de passe
    setPassword(value)

    // Récupère la validité du mot de passe en utilisant la fonction de validation
    const valid = validatePassword(value)

    // Met à jour l'état de validité du mot de passe
    setIsPasswordValid(valid)

    // Met à jour la validité du mot de passe de confirmation en fonction du nouveau mot de passe
    setIsConfirmPasswordValid(validateConfirmPassword(confirmPassword, value))

    // Réinitialise les erreurs du champ mot de passe
    setFieldErrors(prev => ({ ...prev, password: valid ? "" : prev.password }))

    // Si le champ bloquant est le mot de passe et que le mot de passe est valide
    if (blockingField === "password" && valid) {
      // Réinitialise le champ bloquant
      setBlockingField(null)
    }
  }

  // Fonction pour gérer les changements dans le champ de confirmation du mot de passe
  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")
    
    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du mot de passe de confirmation
    setConfirmPassword(value)

    // Récupère la validité du mot de passe de confirmation en utilisant la fonction de validation
    const valid = validateConfirmPassword(value, password)

    // Met à jour l'état de validité du mot de passe de confirmation
    setIsConfirmPasswordValid(valid)
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

    // Si l'email existe
    if (emailExists === true) {

      return
    }

    // Si en mode création de compte et pas à l'étape du mot de passe
    if (isCreatingAccount && !isPasswordStep) {

      // Passe à l'étape du mot de passe
      setIsPasswordStep(true)

      // Réinitialise les erreurs globales
      setGlobalError("")

      return
    }

    // Si à l'étape du mot de passe
    if (isPasswordStep) {

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

          // En cas de succès, affiche un message de succès
          setSuccessMessage("Inscription réussie !")

          // Réinitialise tous les champs du formulaire et les états associés
          setEmail("")
          setIsEmailValid(false)
          setEmailTouched(false)
          setEmailExists(null)
          setIsCreatingAccount(false)
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
          setIsPasswordStep(false)
          setPassword("")
          setIsPasswordValid(false)
          setPasswordTouched(false)
          setConfirmPassword("")
          setIsConfirmPasswordValid(false)
          setConfirmPasswordTouched(false)
          setFieldErrors({})

        } else if (result.errors) {

          // Récupération des erreurs de l'API
          const errors: any = result.errors

          // Initialisation d'un objet pour stocker les erreurs de chaque champ
          const newFieldErrors: Record<string, string> = {}

          // Parcours des erreurs et les ajoute à l'objet `newFieldErrors`
          Object.entries(errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              newFieldErrors[field] = messages[0]
            } else if (typeof messages === "string") {
              newFieldErrors[field] = messages
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
            setIsPasswordStep(false)
          }
        }
      } catch (error) {

        // Réinitialise les erreurs de champ
        setFieldErrors({})

        // Réinitialise le message de succès
        setSuccessMessage("")

        // En cas d'erreur technique, retourne au formulaire de connexion
        setIsPasswordStep(false)
        setIsCreatingAccount(false)

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

    // Met à jour l'état pour indiquer que l'on est en mode création de compte
    setIsCreatingAccount(true)

    // Réinitialise l'état de `emailExists` à null
    setEmailExists(null)

    // Réinitialise les erreurs de champ
    setFieldErrors({})
  }

  // ---------------------------------------------------------------- Bouton désactivé ---------------------------------------------------------------

  const isButtonDisabled =
    !!(loading ||                     // En cours de chargement ou
      !isEmailValid ||                // Email invalide ou
      (isCreatingAccount && (         // En mode création de compte et :
        !isFirstnameValid ||            // Prénom invalide ou
        !isLastnameValid ||             // Nom invalide ou
        !isBirthDateValid ||            // Date de naissance invalide ou
        !isCountryValid ||              // Pays invalide ou
        (blockingField &&               // Si un champ est bloquant
          (!isPasswordStep
            ? ["email", "firstname", "lastname", "date_of_birth", "country"].includes(blockingField)
            : ["password", "confirmPassword"].includes(blockingField)
          )
        )
      ))
    )
  
  // ---------------------------------------------------------------- Affichage des erreurs ----------------------------------------------------------

  // Fonction pour afficher les erreurs spécifiques à l'étape
  const renderStepErrors = () => {
    if (!isPasswordStep) {
      return (
        <div>
          {["email", "firstname", "lastname", "date_of_birth", "country"].map(field =>
            fieldErrors[field] && (
              <div
                key={field}
                className="mt-2 px-4 py-0.5 w-fit mx-auto rounded-lg bg-red-100 border border-red-400 text-red-700 text-sm text-center"
              >
                {fieldErrors[field]}
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
              className="mt-2 px-4 py-0.5 w-fit mx-auto rounded-lg bg-red-100 border border-red-400 text-red-700 text-sm text-center"
            >
              {fieldErrors[field]}
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
          {isPasswordStep
            ? "Créez votre mot de passe"
            : isCreatingAccount
              ? "Complétez les informations suivantes"
              : "Connectez-vous ou créez un compte"}
        </h2>

        <div className="mt-10">
          <form
            className="space-y-3"
            // Gestion de la soumission du formulaire
            onSubmit={handleSubmit}
          >
            {!isPasswordStep ? (
              <>
                <EmailField
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  isValid={isEmailValid}
                  touched={emailTouched}
                />

                {isCreatingAccount && (
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

            {/* Si email inconnu et pas en mode création de compte */}
            {emailExists === false && !isCreatingAccount && (
              <div
                className="px-4 py-0.5 w-fit mx-auto rounded-lg bg-red-100 border border-red-400 text-red-700 text-xs"
                role="alert"
              >
                Email inconnu !
              </div>
            )}

            {/* Si email reconnu */}
            {emailExists === true && (
              <div
                className="px-4 py-0.5 w-fit mx-auto rounded-lg bg-green-100 border border-green-400 text-green-700 text-xs"
                role="alert"
              >
                Email reconnu !
              </div>
            )}

            <div className="flex justify-center mt-5">
              {!isPasswordStep ? (
                emailExists === false && !isCreatingAccount ? (
                  <CustomButton
                    className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                    disabled={isButtonDisabled}
                    label={loading ? "Vérification..." : "Créer un nouveau compte"}
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

            {renderStepErrors()}

          </form>
        </div>

        {successMessage && !isCreatingAccount && !isPasswordStep && (
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