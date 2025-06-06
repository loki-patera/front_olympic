import { render, screen } from '@testing-library/react'
import { BirthDateField } from '../../../../../app/components/sign/fields'

describe("BirthDateField", () => {

  // Propriétés par défaut pour le composant BirthDateField
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false,
  }

  it("affiche le label et le champ date", () => {

    // Rendu du composant BirthDateField avec les propriétés par défaut
    render(<BirthDateField {...defaultProps} />)

    // Vérification que le champ date de naissance est présent avec le label "Date de naissance"
    expect(screen.getByLabelText(/Date de naissance/i, { selector: 'input' })).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    // Rendu du composant BirthDateField avec des propriétés indiquant un champ non valide et touché
    render(<BirthDateField {...defaultProps} isValid={false} touched={true} />)

    // Vérification que le champ date de naissance a une bordure rouge
    const input = screen.getByLabelText(/Date de naissance/i, { selector: 'input' })
    expect(input.className).toMatch(/outline-red-500/)
  })

  it("applique la classe text-gray-900 si une valeur est saisie et valide", () => {
    
    // Rendu du composant BirthDateField avec une valeur valide
    render(<BirthDateField value="2000-01-01" onChange={jest.fn()} onBlur={jest.fn()} isValid={true} touched={false} />)

    // Vérification que le champ date de naissance a la classe text-gray-900
    const input = screen.getByLabelText(/Date de naissance/i, { selector: 'input' })
    expect(input.className).toMatch(/text-gray-900/)
  })
})