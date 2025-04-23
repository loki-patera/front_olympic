import { render, screen, waitFor } from "@testing-library/react"
import Home from "../page"

describe("Page Home", () => {

  it("rend la page d'accueil avec son contenu", async () => {

    // Rendu du composant `Home`
    render(<Home />)

    // Vérifie que `Header` est rendu
    expect(screen.getByTestId("header")).toBeInTheDocument()

    // Attend que `SportSection` soit chargé
    await waitFor(() => {
      // Vérifie que `SportSection` est rendu
      expect(screen.getByTestId("sport-section")).toBeInTheDocument()
    })
  })
})