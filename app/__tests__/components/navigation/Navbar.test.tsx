import { render, screen, fireEvent } from "@testing-library/react"
import { Navbar } from "../../../components/navigation/Navbar"
import { useRouter } from "next/navigation"

describe("Composant Navbar", () => {

  it("navigue vers la page du panier lorsque le bouton 'Voir votre panier' est cliqué", () => {

    // Mock de la fonction `router.push` pour simuler la navigation
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock, pathname: "/" })   // !!! À modifier quand la page du panier sera créée !!!

    // Rendu du composant `Navbar`
    render(<Navbar />)

    // Récupère le menu du panier grâce à son attribut `aria-label`
    const menuButton = screen.getByLabelText("Menu du panier")

    // Simule un clic sur le bouton du menu du panier
    fireEvent.click(menuButton)

    // Ou simule la pression de la touche "Entrée" sur le bouton du menu du panier
    fireEvent.keyDown(menuButton, { key: 'Enter', code: 'Enter' })
    
    // Récupère le bouton "Voir votre panier" grâce à son label
    const button = screen.getByText("Voir votre panier")

    // Simule un clic sur le bouton
    fireEvent.click(button)

    // Vérifie que `router.push` a été appelé avec "/"
    expect(pushMock).toHaveBeenCalledWith("/")                                    // !!! À modifier quand la page du panier sera créée !!!

    // Vérifie que `router.push` a été appelé une fois
    expect(pushMock).toHaveBeenCalledTimes(1)
  })
})