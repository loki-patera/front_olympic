import { FieldProps } from '../../form/fields/fieldProps'

/**
 * Composant `PasswordField` pour afficher un champ de saisie pour le mot de passe.
 * 
 * @example
 * ```tsx
 * <PasswordField
 *    value={password}
 *    onChange={handlePasswordChange}
 *    onBlur={handlePasswordBlur}
 *    isValid={isPasswordValid}
 *    touched={passwordTouched}
 * />
 * ```
 */
export const PasswordField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div>
      <label htmlFor="password" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Mot de passe
      </label>

      <input
        id="password"
        name="password"
        type="password"
        required
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`block w-full rounded-md px-3 py-1 text-sm/6 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 outline-gray-300
          ${!isValid && touched
            ? 'outline-red-500 focus:outline-red-500'
            : 'outline-gray-300 focus:outline-yellowjo-light'
          }`}
      />
    </div>
  )
}