import { render, screen } from "@testing-library/react"
import { Footer } from "../../components/Footer"

describe("Composant Footer", () => {

  it("rend le composant 'Footer' avec son contenu", () => {

    // Rendu du composant `Footer`
    render(<Footer />)

    // Récupère l'élément `footer` grâce à son attribut `data-testid`
    const footerElement = screen.getByTestId("footer")

    // Vérifie que l'élément `footer` est présent dans le document
    expect(footerElement).toBeInTheDocument()
  })
})