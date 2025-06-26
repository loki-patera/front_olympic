import { FieldProps } from './fieldProps'

/**
 * Composant `CVCField` pour afficher un champ de saisie pour le code de sécurité (CVC) d'une carte de paiement.
 *
 * @example
 * ```tsx
 * <CVCField
 *    value={cvc}
 *    onChange={handleCVCChange}
 *    onBlur={handleCVCBlur}
 *    isValid={isCVCValid}
 *    touched={isCVCTouched}
 * />
 * ```
 */
export const CVCField: React.FC<FieldProps> = ({
  value,
  onChange,
  onBlur,
  isValid,
  touched
}) => {

  return (

    <div>
      <label htmlFor="cvc" className="text-sm/6 font-medium text-bluejo-dark flex items-center gap-2">
        CVC
      </label>
      
      <div className="mt-0.5">
        <input
          id="cvc"
          name="cvc"
          type="text"
          required
          placeholder="123"
          value={value}
          // Gestion des changements dans le champ CVC
          onChange={onChange}
          // Gestion de la perte de focus du champ CVC
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