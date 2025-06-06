import { render, screen } from '@testing-library/react'
import { CountrySelect } from '../../../../../app/components/sign/fields'

describe("CountrySelect", () => {

  // Liste des pays pour les tests
  const countries = ["France", "Allemagne"]

  // Propriétés par défaut pour le composant CountrySelect
  const defaultProps = {
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    isValid: true,
    touched: false,
    countries,
  }

  it("affiche le label et la liste des pays", () => {

    render(<CountrySelect {...defaultProps} />)

    expect(screen.getByLabelText(/Pays/i)).toBeInTheDocument()
    expect(screen.getByText("Sélectionnez un pays")).toBeInTheDocument()
    expect(screen.getByText("France")).toBeInTheDocument()
    expect(screen.getByText("Allemagne")).toBeInTheDocument()
  })

  it("affiche une bordure rouge si non valide et touché", () => {

    render(<CountrySelect {...defaultProps} isValid={false} touched={true} />)

    const select = screen.getByLabelText(/Pays/i)
    expect(select.className).toMatch(/outline-red-500/)
  })

  it("applique la classe text-gray-900 si une valeur est saisie et valide", () => {
      
      // Rendu du composant CountrySelect avec une valeur valide
      render(<CountrySelect value="2000-01-01" onChange={jest.fn()} onBlur={jest.fn()} isValid={true} touched={false} countries={countries} />)
  
      // Vérification que le champ pays a la classe text-gray-900
      const input = screen.getByLabelText(/Pays/i)
      expect(input.className).toMatch(/text-gray-900/)
    })
})