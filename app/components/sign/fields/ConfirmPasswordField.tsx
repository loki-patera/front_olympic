import { FieldProps } from './FieldProps'

/**
 * Composant `ConfirmPasswordField` pour afficher un champ de saisie pour la confirmation du mot de passe.
 * 
 * @example
 * ```tsx
 * <ConfirmPasswordField
 *    value={confirmPassword}
 *    onChange={handleConfirmPasswordChange}
 *    onBlur={handleConfirmPasswordBlur}
 *    isValid={isConfirmPasswordValid}
 *    touched={confirmPasswordTouched}
 * />
 * ```
 */
export const ConfirmPasswordField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div>
      <label htmlFor="confirmPassword" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Mot de passe de confirmation
        <span className="relative flex items-center group">
          <button
            type="button"
            aria-label="Affiche le format de mot de passe valide"
            className="ml-1 w-4 h-4 flex items-center justify-center rounded-full bg-yellowjo-light text-white text-xs font-bold
              focus:outline-none"
            tabIndex={0}
          >
            !
          </button>
          {/* Info-bulle pour le mot de passe de confirmation */}
          <div
            className="absolute min-w-40 left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded text-gray-500 text-xs shadow-lg
              border border-yellowjo-light bg-gray-50 hidden group-hover:block"
          >
            Doit correspondre au mot de passe principal
          </div>
        </span>
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
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