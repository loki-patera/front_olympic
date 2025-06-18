import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

// Mock du contexte utilisateur
jest.mock('../../../../app/context/UserContext', () => ({
  useUser: () => ({
    user: { firstname: 'Marie', lastname: 'Curie' },
    logout: jest.fn()
  })
}))

describe("Composant Navbar", () => {

  it("navigue vers la page du panier lorsque le bouton 'Voir votre panier' est cliqué", async () => {

    // Mock de la fonction `router.push` pour simuler la navigation
    const pushMock = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock, pathname: "/pages/cart" })

    // Rendu du composant `Navbar`
    render(<Navbar />)

    // Ouvre le menu du panier
    await userEvent.click(screen.getByLabelText("Menu du panier"))

    // Récupère le bouton "Voir votre panier" (rendu dans le menu)
    const button = await screen.findByRole('button', { name: /voir votre panier/i })

    // Simule un clic sur le bouton
    fireEvent.click(button)

    // Vérifie que `router.push` a été appelé avec "/pages/cart"
    expect(pushMock).toHaveBeenCalledWith("/pages/cart")
  })
})