import { FieldProps } from './fieldProps'

/**
 * Composant `CardNumberField` pour afficher un champ de saisie pour le numéro de carte de crédit.
 *
 * @example
 * ```tsx
 * <CardNumberField
 *    value={cardNumber}
 *    onChange={handleCardNumberChange}
 *    onBlur={handleCardNumberBlur}
 *    isValid={isCardNumberValid}
 *    touched={isCardNumberTouched}
 * />
 * ```
 */
export const CardNumberField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div className="col-span-4">
      <label htmlFor="cardNumber" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Numéro de carte de crédit
      </label>
      
      <div className="mt-0.5">
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          required
          placeholder="1234 5678 9012 3456"
          value={value}
          // Gestion des changements dans le champ numéro de carte
          onChange={onChange}
          // Gestion de la perte de focus du champ numéro de carte
          onBlur={onBlur}
          className={`block w-full rounded-md shadow-sm px-3 py-1 text-sm/6 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400
            focus:outline-2 focus:-outline-offset-2 outline-gray-300
            ${!isValid && touched
              ? 'outline-red-500 focus:outline-red-500'
              : 'outline-gray-300 focus:outline-yellowjo-light'
            }`}
        />
      </div>
    </div>
  )
}