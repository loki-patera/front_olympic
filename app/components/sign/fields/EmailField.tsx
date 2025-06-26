import { FieldProps } from '../../form/fields/fieldProps'

/**
 * Composant `EmailField` pour afficher un champ de saisie pour l'email.
 *  
 * @example
 * ```tsx
 * <EmailField
 *    value={email}
 *    onChange={handleEmailChange}
 *    onBlur={handleEmailBlur}
 *    isValid={isEmailValid}
 *    touched={emailTouched}
 * />
 * ```
 */
export const EmailField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div>
      <label htmlFor="email" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Adresse email
      </label>

      <div className="mt-0.5">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="exemple@email.com"
          value={value}
          // Gestion des changements dans le champ email
          onChange={onChange}
          // Gestion de la perte de focus du champ email
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