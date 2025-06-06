/**
 * Interface `CustomButtonProps` définissant les propriétés du composant {@link CustomButton}.
 * 
 * @property className - Classes supplémentaires pour le style.
 * @property disabled - Indique si le bouton est désactivé.
 * @property label - Texte du bouton.
 * @property type - Type de bouton (button, submit, reset).
 * @property onClick - Action à exécuter lors du clic sur le bouton.
 */
export interface CustomButtonProps {
  className?: string
  disabled?: boolean
  label: string
  type?: "button" | "submit" | "reset"
  onClick?(e?: React.MouseEvent<HTMLButtonElement>): void
}

/**
 * Composant réutilisable `CustomButton` pour afficher un élément bouton stylisé.
 *
 * @example
 * ```tsx
 * <CustomButton
 *    className="bg-blue-500"
 *    label="Réserver"
 *    onClick={handleClick}
 * />
 * ```
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  className = "",
  disabled = false,
  label,
  type = "button",
  onClick
}) => {

  // Styles de base du bouton
  const baseStyles = `px-4 border border-transparent font-semibold rounded-lg shadow-md ${disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:scale-105 active:scale-95 transition transform'}`

  return (

    <button
      className={`${baseStyles} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  )
}