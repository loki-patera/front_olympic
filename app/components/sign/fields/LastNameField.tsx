import { FieldProps } from './FieldProps'

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
        <span className="relative flex items-center group">
          <button
            type="button"
            aria-label="Affiche le format de nom valide"
            className="ml-1 w-4 h-4 flex items-center justify-center rounded-full bg-yellowjo-light text-white text-xs font-bold
              focus:outline-none"
            tabIndex={0}
          >
            !
          </button>
          {/* Info-bulle pour le nom */}
          <div
            className="absolute min-w-52 left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded text-gray-500 text-xs shadow-lg
              border border-yellowjo-light bg-gray-50 hidden group-hover:block"
          >
            Format attendu : <br />
            <span className="font-mono">Doe / Dupond-Durand</span>
          </div>
        </span>
      </label>

      <div className="mt-0.5">
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          placeholder="Doe"
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