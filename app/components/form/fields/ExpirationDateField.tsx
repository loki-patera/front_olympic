import { FieldProps } from './fieldProps'

/**
 * Composant `ExpirationDateField` pour afficher un champ de saisie pour la date d'expiration d'une carte de paiement.
 * 
 * @example
 * ```tsx
 * <ExpirationDateField
 *    value={expirationDate}
 *    onChange={handleExpirationDateChange}
 *    onBlur={handleExpirationDateBlur}
 *    isValid={isExpirationDateValid}
 *    touched={isExpirationDateTouched}
 * />
 * ```
 */
export const ExpirationDateField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  // Récupération de l'année et du mois actuels'
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  // Définition des dates minimale et maximale pour le champ de saisie de la date d'expiration
  const minDate = `${year}-${month}`
  const maxDate = `${year + 6}-${month}`

  return (

    <div className="col-span-3">
      <label htmlFor="expirationDate" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Date d'expiration
      </label>

      <div className="mt-0.5">
        <input
          id="expirationDate"
          name="expirationDate"
          type="month"
          required
          value={value}
          // Gestion des changements dans le champ date d'expiration
          onChange={onChange}
          // Gestion de la perte de focus du champ date d'expiration
          onBlur={onBlur}
          className={`block w-full rounded-md shadow-sm px-3 py-1 text-sm/6 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2
            outline-gray-300
            ${value && isValid ? 'text-gray-900' : 'text-gray-400'}
            ${!isValid && touched
              ? 'outline-red-500 focus:outline-red-500'
              : 'outline-gray-300 focus:outline-yellowjo-light'
            }`}
          min={minDate}
          max={maxDate}
        />
      </div>
    </div>
  )
}