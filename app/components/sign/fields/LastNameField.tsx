import { FieldProps } from '../../form/fields/fieldProps'

/**
 * Composant `LastNameField` pour afficher un champ de saisie pour le nom de famille.
 * 
 * @example
 * ```tsx
 * <LastNameField
 *    value={lastName}
 *    onChange={handleLastNameChange}
 *    onBlur={handleLastNameBlur}
 *    isValid={isLastNameValid}
 *    touched={lastNameTouched}
 * />
 * ```
 */
export const LastNameField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div>
      <label htmlFor="lastName" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Nom
      </label>

      <div className="mt-0.5">
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          placeholder="Dupont"
          value={value}
          // Gestion des changements dans le champ nom
          onChange={onChange}
          // Gestion de la perte de focus du champ nom
          onBlur={onBlur}
          className={`block w-full rounded-md px-3 py-1 text-sm/6 text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400
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