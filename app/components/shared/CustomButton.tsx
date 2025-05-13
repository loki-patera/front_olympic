/**
 * Interface `CustomButtonProps` définissant les propriétés du composant {@link CustomButton}.
 * 
 * @property className - Classes supplémentaires pour le style.
 * @property label - Texte du bouton.
 * @property type - Type de bouton (button, submit, reset).
 * @property onClick - Action à exécuter lors du clic sur le bouton.
 */
export interface CustomButtonProps {
  className?: string
  label: string
  type?: "button" | "submit" | "reset"
  onClick?(): void
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
  label,
  type = "button",
  onClick
}) => {

  // Styles de base du bouton
  const baseStyles = `px-4 border border-transparent font-semibold rounded-lg cursor-pointer text-white hover:text-gray-700
    hover:bg-yellowjo-light shadow-md shadow-gray-300 hover:ring hover:ring-offset-2 hover:ring-bluejo`

  return (

    <button
      className={`${baseStyles} ${className}`}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  )
}