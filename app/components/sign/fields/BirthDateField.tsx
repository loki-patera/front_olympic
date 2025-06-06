import { FieldProps } from './FieldProps'

/**
 * Composant `BirthDateField` pour afficher un champ de saisie pour la date de naissance.
 * 
 * @example
 * ```tsx
 * <BirthDateField
 *    value={birthDate}
 *    onChange={handleBirthDateChange}
 *    onBlur={handleBirthDateBlur}
 *    isValid={isBirthDateValid}
 *    touched={birthDateTouched}
 * />
 * ```
 */
export const BirthDateField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  // Récupération de la date actuelle
  const today = new Date()

  // Calcul de la date maximale pour être majeur (18 ans)
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 18)).toISOString().split('T')[0]

  return (

    <div>
      <label htmlFor="birthDate" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        Date de naissance
        <span className="relative flex items-center group">
          <button
            type="button"
            aria-label="Indique que l'utilisateur doit être majeur"
            className="ml-1 w-4 h-4 flex items-center justify-center rounded-full bg-yellowjo-light text-white text-xs font-bold
              focus:outline-none"
            tabIndex={0}
          >
            !
          </button>
          {/* Info-bulle pour la date de naissance */}
          <div
            className="absolute min-w-52 left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded text-gray-500 text-xs shadow-lg
              border border-yellowjo-light bg-gray-50 hidden group-hover:block"
          >
            Vous devez être majeur pour créer un compte
          </div>
        </span>
      </label>

      <div className="mt-0.5">
        <input
          id="birthDate"
          name="birthDate"
          type="date"
          required
          value={value}
          // Gestion des changements dans le champ date de naissance
          onChange={onChange}
          // Gestion de la perte de focus du champ date de naissance
          onBlur={onBlur}
          className={`block w-full rounded-md px-3 py-1 text-sm/6 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2
            outline-gray-300
            ${value && isValid ? 'text-gray-900' : 'text-gray-400'}
            ${!isValid && touched
              ? 'outline-red-500 focus:outline-red-500'
              : 'outline-gray-300 focus:outline-yellowjo-light'
            }`}
          min="1900-01-01"
          max={maxDate}
        />
      </div>
    </div>
  )
}