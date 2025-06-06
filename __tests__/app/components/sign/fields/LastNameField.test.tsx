import { render, screen } from '@testing-library/react'
import { LastNameField } from '../../../../../app/components/sign/fields'

describe("LastNameField", () => {

  // Propriétés par défaut pour le composant LastNameField
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false
  }

  it("affiche le label et le champ nom", () => {

    // Rendu du composant LastNameField avec les propriétés par défaut
    render(<LastNameField {...defaultProps} />)

    // Vérification que le champ nom est présent avec le placeholder "Doe"
    expect(screen.getByPlaceholderText(/Doe/i)).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    // Rendu du composant LastNameField avec des propriétés indiquant un champ non valide et touché
    render(<LastNameField {...defaultProps} isValid={false} touched={true} />)

    // Vérification que le champ nom a une bordure rouge
    const input = screen.getByPlaceholderText(/Doe/i)
    expect(input.className).toMatch(/outline-red-500/)
  })
})