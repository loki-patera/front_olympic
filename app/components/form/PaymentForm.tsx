import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { CustomButton } from '../shared/CustomButton'
import { CardNameField, CardNumberField, CVCField, ExpirationDateField } from './fields'
import { cardNameValidate, cardNumberValidate, cvcValidate, ErrorFieldType, expirationDateValidate } from './validations'

export const PaymentForm= ():React.JSX.Element => {

  // --------------------------------------------------------------------- États ---------------------------------------------------------------------

  // État local pour le numéro de carte de crédit
  const [cardNumber, setCardNumber] = useState<string>("")

  // État local pour la validité du numéro de carte de crédit
  const [isCardNumberValid, setIsCardNumberValid] = useState<boolean>(false)

  // État local pour savoir si le champ numéro de carte de crédit a été touché
  const [isCardNumberTouched, setIsCardNumberTouched] = useState<boolean>(false)


  // État local pour le nom de la carte de crédit
  const [cardName, setCardName] = useState<string>("")

  // État local pour la validité du nom de la carte de crédit
  const [isCardNameValid, setIsCardNameValid] = useState<boolean>(false)

  // État local pour savoir si le champ nom de la carte de crédit a été touché
  const [isCardNameTouched, setIsCardNameTouched] = useState<boolean>(false)


  // État local pour la date d'expiration de la carte
  const [expirationDate, setExpirationDate] = useState<string>("")

  // État local pour la validité de la date d'expiration
  const [isExpirationDateValid, setIsExpirationDateValid] = useState<boolean>(false)

  // État local pour savoir si le champ date d'expiration a été touché
  const [isExpirationDateTouched, setIsExpirationDateTouched] = useState<boolean>(false)


  // État local pour le code de sécurité (CVC) de la carte
  const [cvc, setCVC] = useState<string>("")

  // État local pour la validité du code de sécurité (CVC)
  const [isCVCValid, setIsCVCValid] = useState<boolean>(false)

  // État local pour savoir si le champ CVC a été touché
  const [isCVCTouched, setIsCVCTouched] = useState<boolean>(false)

  
  // État local pour le champ bloquant
  const [blockingField, setBlockingField] = useState<string | null>(null)

  // État local pour les erreurs de champ
  const [fieldErrors, setFieldErrors] = useState<Record<string, ErrorFieldType>>({})

  // État local pour les erreurs globales
  const [globalError, setGlobalError] = useState<string>("")

  // ------------------------------------------------------------ Fonctions de validation ------------------------------------------------------------

  // Fonction pour valider le numéro de carte de crédit
  const validateCardNumber = (value: string):void => {

    // Récupère l'état de validité du numéro de carte de crédit en utilisant la fonction de validation
    const error = cardNumberValidate(value)

    // Met à jour l'état de validité du numéro de carte de crédit
    setIsCardNumberValid(!error)

    if (error) {
      // Si le numéro de carte de crédit est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, cardNumber: error }))
    } else {
      // Si le numéro de carte de crédit est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { cardNumber, ...rest } = prev
        return rest
      })
    }
    // Si le champ bloquant est le numéro de carte de crédit et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "cardNumber" && !error) setBlockingField(null)    
  }

  // Fonction pour valider le nom de la carte de crédit
  const validateCardName = (value: string):void => {

    // Récupère l'état de validité du nom de la carte de crédit
    const error = cardNameValidate(value)

    // Met à jour l'état de validité du nom de la carte de crédit
    setIsCardNameValid(!error)

    if (error) {
      // Si le nom de la carte de crédit est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, cardName: error }))
    } else {
      // Si le nom de la carte de crédit est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { cardName, ...rest } = prev
        return rest
      })
    }

    // Si le champ bloquant est le nom de la carte et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "cardName" && !error) setBlockingField(null)
  }

  // Fonction pour valider la date d'expiration de la carte
  const validateExpirationDate = (value: string):void => {

    // Récupère l'état de validité de la date d'expiration en utilisant la fonction de validation
    const error = expirationDateValidate(value)

    // Met à jour l'état de validité de la date d'expiration
    setIsExpirationDateValid(!error)

    if (error) {
      // Si la date d'expiration de la carte est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, expirationDate: error }))
    } else {
      // Si la date d'expiration de la carte est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { expirationDate, ...rest } = prev
        return rest
      })
    }
    
    // Si le champ bloquant est la date d'expiration de la carte et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "expirationDate" && !error) setBlockingField(null)
  }

  // Fonction pour valider le code de sécurité CVC de la carte de crédit
  const validateCVC = (value: string):void => {

    // Récupère l'état de validité du code de sécurité CVC en utilisant la fonction de validation
    const error = cvcValidate(value)

    // Met à jour l'état de validité du code de sécurité CVC
    setIsCVCValid(!error)

    if (error) {
      // Si le code de sécurité CVC est invalide, met à jour l'état des erreurs de champ
      setFieldErrors(prev => ({ ...prev, cvc: error }))
    } else {
      // Si le code de sécurité CVC est valide, réinitialise les erreurs de champ
      setFieldErrors(prev => {
        const { cvc, ...rest } = prev
        return rest
      })
    }

    // Si le champ bloquant est le code de sécurité CVC et qu'il n'y a pas d'erreur, réinitialise le champ bloquant
    if (blockingField === "cvc" && !error) setBlockingField(null)
  }

  // ------------------------------------------------------------ Gestion des changements ------------------------------------------------------------

  // Fonction pour gérer les changements dans le champ numéro de carte de crédit
  const handleCardNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")

    // Récupère la valeur du champ numéro de carte de crédit et supprime les caractères non numériques
    let value = e.target.value.replace(/\D/g, "")

    // Limite la longueur du numéro de carte de crédit à 16 chiffres
    value = value.slice(0, 16)

    // Ajoute un espace tous les 4 chiffres
    const formatted = value.replace(/(.{4})/g, "$1 ").trim()

    // Met à jour l'état du numéro de carte de crédit
    setCardNumber(formatted)

    // Valide le numéro de carte de crédit
    validateCardNumber(formatted)
  }

  // Fonction pour gérer les changements dans le champ nom de la carte de crédit
  const handleCardNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")

    // Récupère la valeur du champ nom de la carte de crédit et supprime les caractères non autorisés
    let value = e.target.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿÇç \-]/g, "")

    // Met à jour l'état du nom de la carte de crédit
    setCardName(value)

    // Valide le nom de la carte de crédit
    validateCardName(value)
  }

  // Fonction pour gérer les changements dans le champ date d'expiration
  const handleExpirationDateChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")

    // Récupère la valeur du champ date d'expiration
    const { value } = e.target

    // Met à jour l'état de la date d'expiration
    setExpirationDate(value)

    // Valide la date d'expiration
    validateExpirationDate(value)
  }

  // Fonction pour gérer les changements dans le champ CVC
  const handleCVCChange: ChangeEventHandler<HTMLInputElement> = (e) => {

    // Réinitialise les erreurs globales
    setGlobalError("")

    // Récupère la valeur du champ CVC et supprime les caractères non numériques
    let value = e.target.value.replace(/\D/g, "")

    // Limite la longueur du numéro de sécurité CVC à 3 chiffres
    value = value.slice(0, 3)

    // Met à jour l'état du CVC
    setCVC(value)

    // Valide le CVC
    validateCVC(value)
  }

  // ---------------------------------------------------------- Gestion de la perte de focus ---------------------------------------------------------
  
  // Fonction pour gérer la perte de focus du champ numéro de carte de crédit
  const handleCardNumberBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ numéro de carte de crédit comme touché
    setIsCardNumberTouched(true)

    // Valide le numéro de carte de crédit
    validateCardNumber(cardNumber)
  }

  // Fonction pour gérer la perte de focus du champ nom de la carte de crédit
  const handleCardNameBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ nom de la carte de crédit comme touché
    setIsCardNameTouched(true)

    // Valide le nom de la carte de crédit
    validateCardName(cardName)
  }

  // Fonction pour gérer la perte de focus du champ date d'expiration
  const handleExpirationDateBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ date d'expiration comme touché
    setIsExpirationDateTouched(true)

    // Valide la date d'expiration
    validateExpirationDate(expirationDate)
  }

  // Fonction pour gérer la perte de focus du champ CVC
  const handleCVCBlur: FocusEventHandler<HTMLInputElement> = () => {

    // Marque le champ CVC comme touché
    setIsCVCTouched(true)

    // Valide le CVC
    validateCVC(cvc)
  }

  // ------------------------------------------------------ Gestion du bouton pour le paiement -------------------------------------------------------

  const isButtonDisabled =
    !isCardNumberValid ||
    !isCardNameValid ||
    !isExpirationDateValid ||
    !isCVCValid ||
    !cardNumber ||
    !cardName ||
    !expirationDate ||
    !cvc

  // ------------------------------------------------------------- Affichage des erreurs -------------------------------------------------------------

  const renderErrors = () => {

    return (
      <div>
        {["cardNumber", "cardName", "expirationDate", "cvc"].map(field =>
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

    <>
      <form className="space-y-2">
        <div className="mt-6 grid grid-cols-4 gap-y-4 gap-x-4">

          <CardNumberField
            value={cardNumber}
            onChange={handleCardNumberChange}
            onBlur={handleCardNumberBlur}
            isValid={isCardNumberValid}
            touched={isCardNumberTouched}
          />

          <CardNameField
            value={cardName}
            onChange={handleCardNameChange}
            onBlur={handleCardNameBlur}
            isValid={isCardNameValid}
            touched={isCardNameTouched}
          />

          <ExpirationDateField
            value={expirationDate}
            onChange={handleExpirationDateChange}
            onBlur={handleExpirationDateBlur}
            isValid={isExpirationDateValid}
            touched={isExpirationDateTouched}
          />

          <CVCField
            value={cvc}
            onChange={handleCVCChange}
            onBlur={handleCVCBlur}
            isValid={isCVCValid}
            touched={isCVCTouched}
          />
        </div>

        <CustomButton
          className="w-full mt-4 py-1.5 text-base text-white bg-bluejo active:bg-bluejo-dark shadow-bluejo-light"
          disabled={isButtonDisabled}
          label="Procéder au paiement"
        />

        {renderErrors()}
      </form>

      {globalError && (
        <div
          className="mt-2 px-4 py-0.5 w-fit mx-auto rounded-lg bg-red-100 border border-red-400 text-red-700 text-xs text-center"
          role="alert"
        >
          {globalError}
        </div>
      )}
    </>
  )
}