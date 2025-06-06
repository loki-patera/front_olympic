import { render, screen } from '@testing-library/react'
import { ConfirmPasswordField } from '../../../../../app/components/sign/fields'

describe("ConfirmPasswordField", () => {

  // Propriétés par défaut pour le composant ConfirmPasswordField
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false
  }

  it("affiche le label et le champ de confirmation du mot de passe", () => {

    // Rendu du composant ConfirmPasswordField avec les propriétés par défaut
    render(<ConfirmPasswordField {...defaultProps} />)

    // Vérification que le champ de confirmation du mot de passe est présent avec le label "Mot de passe de confirmation"
    expect(screen.getByLabelText(/Mot de passe de confirmation/i, { selector: 'input' })).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    // Rendu du composant ConfirmPasswordField avec des propriétés indiquant un champ non valide et touché
    render(<ConfirmPasswordField {...defaultProps} isValid={false} touched={true} />)

    // Vérification que le champ de confirmation du mot de passe a une bordure rouge
    const input = screen.getByLabelText(/Mot de passe de confirmation/i, { selector: 'input' })
    expect(input.className).toMatch(/outline-red-500/)
  })
})