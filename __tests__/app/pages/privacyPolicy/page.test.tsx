import { render, screen } from "@testing-library/react"
import PrivacyPolicy from "../../../../app/pages/privacyPolicy/page"

describe("Page PrivacyPolicy", () => {

  it("rend la page de la politique de confidentialité et affiche le titre", () => {

    // Rendu du composant PrivacyPolicy
    render(<PrivacyPolicy />)
    
    // Récupère le titre grâce à son texte
    const titleElement = screen.getByText("Politique de confidentialité")

    // Vérifie que le titre est présent dans le document
    expect(titleElement).toBeInTheDocument()
  })
})