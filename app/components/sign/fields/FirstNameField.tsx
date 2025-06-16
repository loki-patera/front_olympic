import { FieldProps } from './FieldProps'

/**
 * Composant `FirstNameField` pour afficher un champ de saisie pour le prénom.
 * 
 * @example
 * ```tsx
 * <FirstNameField
 *    value={firstName}
 *    onChange={handleFirstNameChange}
 *    onBlur={handleFirstNameBlur}
 *    isValid={isFirstNameValid}
 *    touched={firstNameTouched}
 * />
 * ```
 */
export const FirstNameField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div>
      <label htmlFor="firstName" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Prénom
      </label>

      <div className="mt-0.5">
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          placeholder="John"
          value={value}
          // Gestion des changements dans le champ prénom
          onChange={onChange}
          // Gestion de la perte de focus du champ prénom
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