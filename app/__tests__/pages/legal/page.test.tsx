import { render, screen } from "@testing-library/react"
import Legal from "../../../pages/legal/page"

describe("Page Legal", () => {

  it("rend la page des mentions légales et affiche le titre", () => {

    // Rendu du composant Legal
    render(<Legal />)
    
    // Récupère le titre grâce à son texte
    const titleElement = screen.getByText("Mentions légales")

    // Vérifie que le titre est présent dans le document
    expect(titleElement).toBeInTheDocument()
  })
})