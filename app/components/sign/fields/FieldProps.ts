/**
 * Interface `FieldProps` définissant les propriétés des champs de formulaire.
 * 
 * @property value - Valeur actuelle du champ.
 * @property onChange - Fonction appelée lors du changement de valeur du champ.
 * @property onBlur - Fonction appelée lors de la perte de focus du champ.
 * @property isValid - Indicateur de validité du champ.
 * @property touched - Indicateur si le champ a été touché (interagi) par l'utilisateur.
 */
export interface FieldProps {
  value: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
  onBlur(e: React.FocusEvent<HTMLInputElement>): void
  isValid: boolean
  touched: boolean
}