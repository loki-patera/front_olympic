import { FieldProps } from './FieldProps'

/**
 * Interface `CountrySelectProps` définissant les propriétés du composant {@link CountrySelect}.
 * 
 * @extends FieldProps
 * 
 * @property onChange - Fonction appelée lors du changement de valeur du champ de sélection.
 * @property onBlur - Fonction appelée lors de la perte de focus du champ de sélection.
 * @property countries - Liste des pays à afficher dans le champ de sélection.
 */
export interface CountrySelectProps extends Omit<FieldProps, "onChange" | "onBlur"> {
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  onBlur(e: React.FocusEvent<HTMLSelectElement>): void
  countries: string[]
}

/**
 * Composant `CountrySelect` pour afficher un champ de sélection pour le pays.
 * 
 * @example
 * ```tsx
 * <CountrySelect
 *    value={country}
 *    onChange={handleCountryChange}
 *    onBlur={handleCountryBlur}
 *    isValid={isCountryValid}
 *    touched={countryTouched}
 *    countries={countries}
 * />
 * ```
 */
export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched,
  countries
}) => {

  return (

    <div>
      <label htmlFor="country" className="text-sm/6 font-medium text-bluejo-dark">
        Pays
      </label>

      <div className="mt-0.5">
        <select
          id="country"
          name="country"
          required
          value={value}
          // Gestion des changements dans le champ pays
          onChange={onChange}
          // Gestion de la perte de focus du champ pays
          onBlur={onBlur}
          className={`block w-full rounded-md px-3 py-2 text-sm/6 outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2
            outline-gray-300
            ${value ? 'text-gray-900' : 'text-gray-400'}
            ${!isValid && touched 
              ? 'outline-red-500 focus:outline-red-500'
              : 'outline-gray-300 focus:outline-yellowjo-light'
            }`}
        >
          <option className="text-gray-400" value="">Sélectionnez un pays</option>
          {countries.map(country => (
            <option className="text-gray-900" key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
    </div>
  )
}