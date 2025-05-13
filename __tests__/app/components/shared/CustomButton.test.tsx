import { render, screen } from '@testing-library/react'
import { CustomButton, CustomButtonProps } from '../../../../app/components/shared/CustomButton'

describe("Composant CustomButton", () => {

  // Propriétés par défaut utilisées pour les tests
  const defaultProps: CustomButtonProps = {
    className: "custom-class",
    label: "Cliquez ici",
    type: "button",
    onClick: jest.fn()           // Fonction simulée pour gérer les clics
  }


  it("rend le bouton avec le type par défaut 'button' si aucun type n'est fourni", () => {

    // Rendu du composant sans spécifier le type
    render(<CustomButton {...defaultProps} type={undefined} />)
    
    // Récupère le bouton par son texte
    const button = screen.getByText("Cliquez ici")

    // Vérifie que le bouton est présent dans le document
    expect(button).toHaveAttribute("type", "button")
  })


  it("rend le bouton avec le style de base si aucune classe supplémentaire n'est fournie", () => {

    // Rendu du composant sans spécifier de classe
    render(<CustomButton {...defaultProps} className={undefined} />)

    // Récupère le bouton par son texte
    const button = screen.getByText("Cliquez ici")

    // Styles de base du bouton
    const baseStyles = 'cursor-pointer'

    // Vérifie que le bouton a seulement la classe de style de base
    expect(button).toHaveAttribute( 
      "class",
      expect.stringContaining(baseStyles)
    )
  })
})