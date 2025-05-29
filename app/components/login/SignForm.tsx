'use client'

import { useState } from 'react'
import { CustomButton } from '../shared/CustomButton'
import { checkEmailExists } from '../../../lib/api'
import countries from 'world-countries'
import { validateEmail, validateFirstName, validateLastName, validateBirthDate } from './validation'
import { BirthDateField, CountrySelect, EmailField, FirstNameField, LastNameField } from './fields'

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
  const [email, setEmail] = useState<string>("")

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
  const [firstName, setFirstName] = useState<string>("")

  // État local pour la validité du prénom
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false)

  // État local pour savoir si le champ prénom a été touché
  const [firstNameTouched, setFirstNameTouched] = useState<boolean>(false)


  // État local pour le nom lors de la création de compte
  const [lastName, setLastName] = useState<string>("")

  // État local pour la validité du nom
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(false)

  // État local pour savoir si le champ nom a été touché
  const [lastNameTouched, setLastNameTouched] = useState<boolean>(false)


  // État local pour la date de naissance
  const [birthDate, setBirthDate] = useState<string>("")

  // État local pour la validité de la date de naissance
  const [isBirthDateValid, setIsBirthDateValid] = useState<boolean>(false)

  // État local pour savoir si le champ date de naissance a été touché
  const [birthDateTouched, setBirthDateTouched] = useState<boolean>(false)


  // État local pour le pays
  const [country, setCountry] = useState<string>("")

  // État local pour savoir si le champ pays a été touché
  const [countryTouched, setCountryTouched] = useState<boolean>(false)


  // ----------------------------------------------------------------- Liste des pays ----------------------------------------------------------------

  // Liste des pays pour le champ de sélection
  const countryList = countries
    .map(c => ({
      code: c.cca2,
      name: c.translations.fra?.common || c.name.common
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }))
  

  // ------------------------------------------------------------ Gestions des changements -----------------------------------------------------------

  // Fonction pour gérer les changements dans le champ email
  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état de l'email
    setEmail(value)

    // Vérifie si l'email est valide et met à jour l'état de validité
    setIsEmailValid(validateEmail(value))

    // Réinitialise l'état de `emailExists` à null à chaque changement
    setEmailExists(null)
  }

  // Fonction pour gérer les changements dans le champ prénom
  const handleFirstNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du prénom
    setFirstName(value)

    // Vérifie si le prénom est valide et met à jour l'état de validité
    setIsFirstNameValid(validateFirstName(value))
  }

  // Fonction pour gérer les changements dans le champ nom
  const handleLastNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du nom
    setLastName(value)

    // Vérifie si le nom est valide et met à jour l'état de validité
    setIsLastNameValid(validateLastName(value))
  }

  // Fonction pour gérer les changements dans le champ date de naissance
  const handleBirthDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état de la date de naissance
    setBirthDate(value)

    // Vérifie si la date de naissance est valide et met à jour l'état de validité
    setIsBirthDateValid(validateBirthDate(value))
  }

  // Fonction pour gérer les changements dans le champ pays
  const handleCountryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état du pays
    setCountry(value)
  }


  // ---------------------------------------------------------- Gestion de la perte de focus ---------------------------------------------------------

  // Fonction pour gérer la perte de focus du champ email
  const handleEmailBlur: React.FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ email comme touché
    setEmailTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ prénom
  const handleFirstNameBlur: React.FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ prénom comme touché
    setFirstNameTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ nom
  const handleLastNameBlur: React.FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ nom comme touché
    setLastNameTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ date de naissance
  const handleBirthDateBlur: React.FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ date de naissance comme touché
    setBirthDateTouched(true)
  }

  // Fonction pour gérer la perte de focus du champ pays
  const handleCountryBlur: React.FocusEventHandler<HTMLSelectElement> = () => {

    // Marque le champ pays comme touché
    setCountryTouched(true)
  }


  // ------------------------------------------------------------ Soumission du formulaire -----------------------------------------------------------

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {

    // Empêche le comportement par défaut du formulaire et le rechargement de la page
    e.preventDefault()

    // Si en mode création de compte
    if (isCreatingAccount) {

      return
    }

    // Met l'état de chargement à true
    setLoading(true)

    // Réinitialise l'état de `emailExists` à null avant la vérification
    setEmailExists(null)

    try {

      // Appelle l'API pour vérifier si l'email existe
      const exists = await checkEmailExists(email)

      // Met à jour l'état `emailExists` avec le résultat de la vérification
      setEmailExists(exists)

    } catch {

      // En cas d'erreur, considère que l'email n'existe pas
      setEmailExists(false)

    } finally {

      // Met à jour l'état de chargement à false après la vérification
      setLoading(false)
    }
  }

  // Fonction pour gérer la création d'un nouveau compte
  const handleCreateAccount: React.MouseEventHandler<HTMLButtonElement> = (e) => {

    // Empêche le comportement par défaut du bouton
    e.preventDefault()

    // Met à jour l'état pour indiquer que l'on est en mode création de compte
    setIsCreatingAccount(true)

    // Réinitialise l'état de `emailExists` à null
    setEmailExists(null)
  }


  // ---------------------------------------------------------------- Bouton désactivé ---------------------------------------------------------------

  const isButtonDisabled =
    loading ||                      // En cours de chargement ou
    !isEmailValid ||                // Email invalide ou
    (isCreatingAccount && (         // En mode création de compte et :
      !isFirstNameValid ||            // Prénom invalide ou
      !isLastNameValid ||             // Nom invalide ou
      !isBirthDateValid ||            // Date de naissance invalide ou
      !country                        // Pays non sélectionné
    ))
  
  return (

    <main className="flex-1 flex items-center justify-center my-8">
      <div className="w-full max-w-md px-8">
          
        <h2 className="text-center text-2xl/9 font-bold text-gray-900">
          {isCreatingAccount ? "Complétez les informations suivantes" : "Entrez votre email"}
        </h2>

        <div className="mt-10">
          <form
            className="space-y-3"
            // Gestion de la soumission du formulaire
            onSubmit={handleSubmit}
          >
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
                  value={firstName}
                  onChange={handleFirstNameChange}
                  onBlur={handleFirstNameBlur}
                  isValid={isFirstNameValid}
                  touched={firstNameTouched}
                />

                <LastNameField
                  value={lastName}
                  onChange={handleLastNameChange}
                  onBlur={handleLastNameBlur}
                  isValid={isLastNameValid}
                  touched={lastNameTouched}
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
                  touched={countryTouched}
                  countryList={countryList}
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
              {emailExists === false && !isCreatingAccount ? (
                <CustomButton
                  className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                  disabled={isButtonDisabled}
                  label={loading ? "Vérification..." : "Créer un nouveau compte"}
                  type="button"
                  onClick={handleCreateAccount}
                />
              ) : (
                <CustomButton
                  className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                  disabled={isButtonDisabled}
                  label={loading ? "Vérification..." : "Continuer"}
                  type="submit"
                />
              )}
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}