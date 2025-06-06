import { render, screen } from '@testing-library/react'
import { FirstNameField } from '../../../../../app/components/sign/fields'

describe("FirstNameField", () => {

  // Propriétés par défaut pour le composant FirstNameField
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false
  }

  it("affiche le label et le champ prénom", () => {

    // Rendu du composant FirstNameField avec les propriétés par défaut
    render(<FirstNameField {...defaultProps} />)

    // Vérification que le champ prénom est présent avec le placeholder "John"
    expect(screen.getByPlaceholderText(/John/i)).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    // Rendu du composant FirstNameField avec des propriétés indiquant un champ non valide et touché
    render(<FirstNameField {...defaultProps} isValid={false} touched={true} />)

    // Vérification que le champ prénom a une bordure rouge
    const input = screen.getByPlaceholderText(/John/i)
    expect(input.className).toMatch(/outline-red-500/)
  })
})