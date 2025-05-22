import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '../../../../app/components/navigation/Navbar'
import { useRouter } from 'next/navigation'

// Mock du contexte panier
jest.mock('../../../../app/context/CartContext', () => ({
  useCart: () => ({
    cart: [{ id_event: 1, id_offer: 2 }],
    cartDetails: [
      {
        event: {
          id_event: 1,
          sport: { id_sport: 1, title: 'Athlétisme', image: 'athletisme.png' },
          location: { id_location: 1, name: 'Stade', city: 'Paris', total_seats: 50000 },
          date: '2024-08-01',
          start_time: '10:00',
          end_time: '12:00',
          price: 50,
          available_seats: 100
        },
        offer: {
          id_offer: 2,
          type: 'Standard',
          number_seats: 1,
          discount: 0
        }
      }
    ]
  })
}))

describe("Composant Navbar", () => {

  it("navigue vers la page du panier lorsque le bouton 'Voir votre panier' est cliqué", () => {

    // Mock de la fonction `router.push` pour simuler la navigation
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock, pathname: "/pages/cart" })

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
    expect(pushMock).toHaveBeenCalledWith("/pages/cart")

    // Vérifie que `router.push` a été appelé une fois
    expect(pushMock).toHaveBeenCalledTimes(1)
  })
})