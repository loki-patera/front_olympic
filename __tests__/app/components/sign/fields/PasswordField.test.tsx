import { render, screen } from '@testing-library/react'
import { PasswordField } from '../../../../../app/components/sign/fields'

describe("PasswordField", () => {

  // Propriétés par défaut pour le composant PasswordField
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false
  }

  it("affiche le label et le champ mot de passe", () => {

    // Rendu du composant PasswordField avec les propriétés par défaut
    render(<PasswordField {...defaultProps} />)

    // Vérification que le champ mot de passe est présent avec le label "Mot de passe"
    expect(screen.getByLabelText(/Mot de passe/i, { selector: 'input' })).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    // Rendu du composant PasswordField avec des propriétés indiquant un champ non valide et touché
    render(<PasswordField {...defaultProps} isValid={false} touched={true} />)

    // Vérification que le champ mot de passe a une bordure rouge
    const input = screen.getByLabelText(/Mot de passe/i, { selector: 'input' })
    expect(input.className).toMatch(/outline-red-500/)
  })
})