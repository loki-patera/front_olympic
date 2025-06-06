import { render, screen } from '@testing-library/react'
import { EmailField } from '../../../../../app/components/sign/fields'

describe("EmailField", () => {

  // Propriétés par défaut pour le composant EmailField
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false
  }

  it("affiche le label et le champ email", () => {

    // Rendu du composant EmailField avec les propriétés par défaut
    render(<EmailField {...defaultProps} />)

    // Vérification que le champ email est présent
    expect(screen.getByPlaceholderText(/exemple@email.com/i)).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    // Rendu du composant EmailField avec des propriétés indiquant un champ non valide et touché
    render(<EmailField {...defaultProps} isValid={false} touched={true} />)

    // Vérification que le champ email a une bordure rouge
    const input = screen.getByPlaceholderText(/exemple@email.com/i)
    expect(input.className).toMatch(/outline-red-500/)
  })
})