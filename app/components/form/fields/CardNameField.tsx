import { FieldProps } from './fieldProps'

/**
 * Composant `CardNameField` pour afficher un champ de saisie pour le nom de la carte de crédit.
 *
 * @example
 * ```tsx
 * <CardNameField
 *    value={cardName}
 *    onChange={handleCardNameChange}
 *    onBlur={handleCardNameBlur}
 *    isValid={isCardNameValid}
 *    touched={isCardNameTouched}
 * />
 * ```
 */
export const CardNameField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div className="col-span-4">
      <label htmlFor="cardName" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Nom sur la carte
      </label>
      
      <div className="mt-0.5">
        <input
          id="cardName"
          name="cardName"
          type="text"
          required
          placeholder="Jean-Charles Dupont"
          value={value}
          // Gestion des changements dans le champ nom de la carte
          onChange={onChange}
          // Gestion de la perte de focus du champ nom de la carte
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