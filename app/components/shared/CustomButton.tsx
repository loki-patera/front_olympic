/**
 * Types de propriétés pour le composant {@link CustomButton}
 */
export interface CustomButtonProps {
  /** Classes supplémentaires pour le style */
  className?: string
  /** Texte du bouton */
  label: string
  /** Action à exécuter lors du clic sur le bouton */
  onClick?(): void
  /** Type de bouton (button, submit, reset) */
  type?: "button" | "submit" | "reset"
}

/**
 * Composant réutilisable `CustomButton` pour afficher un élément bouton stylisé
 *
 * @example
 * ```tsx
 * <CustomButton
 *  label="Réserver"
 *  onClick={handleClick}
 *  className="bg-blue-500"
 * />
 * ```
 */
export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = ""
}) => {

  // Styles de base du bouton
  const baseStyles = `px-7 border border-transparent text-base font-semibold rounded-md cursor-pointer
    text-white hover:text-gray-700 bg-bluejo hover:bg-yellowjo
    shadow-md shadow-gray-300
    hover:ring-2 hover:ring-offset-2 hover:ring-bluejo`

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