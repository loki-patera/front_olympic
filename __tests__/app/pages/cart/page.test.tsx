import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cart from '../../../../app/pages/cart/page'
import { useCart } from '../../../../app/context/CartContext'

// Mock de la fonction `setSport` du store Zustand
const setSportMock = jest.fn()

// Mock du store Zustand pour simuler l'état de l'épreuve sportive sélectionnée
jest.mock('../../../../app/stores', () => ({
  useSportStore: () => ({ setSport: setSportMock, sport: null })
}))

// Mock de la fonction `useCart` du contexte
jest.mock('../../../../app/context/CartContext', () => ({
  useCart: jest.fn()
}))

// Mock du composant Link
jest.mock('next/link', () => {
  return ({ children, ...props }: any) => <span {...props}>{children}</span>
})

describe("Cart page", () => {

  it("appelle removeFromCart avec les bons arguments quand on clique sur Supprimer", () => {

    // Mock de la fonction removeFromCart
    const mockRemove = jest.fn()
    ;(useCart as jest.Mock).mockReturnValue({
      cartDetails: [
        {
          event: {
            price: 100,
            id_event: 42,
            sport: { title: "Test" },
            location: { name: "Stade", city: "Paris" },
            date: "2024-07-30",
            start_time: "",
            end_time: ""
          },
          offer: { id_offer: 7, type: "VIP", number_seats: 1, discount: 0 }
        }
      ],
      removeFromCart: mockRemove
    })
  
    // Rendu du composant Cart
    render(<Cart />)

    // Clic sur le bouton "Supprimer"
    screen.getByText("Supprimer").click()

    // Vérifie que `removeFromCart` a été appelé avec les bons arguments
    expect(mockRemove).toHaveBeenCalledWith({ id_event: 42, id_offer: 7 })
  })

  it("calcule correctement le total du panier", () => {

    // Panier avec deux réservations
    (useCart as jest.Mock).mockReturnValue({
      cartDetails: [
        {
          event: {
            price: 100.00,
            id_event: 1,
            sport: { title: "" },
            location: { name: "", city: "" },
            date: "2024-07-30",
            start_time: "",
            end_time: ""
          },
          offer: { id_offer: 1, type: "offre1", number_seats: 2, discount: 10 }
        },
        {
          event: {
            price: 50.00,
            id_event: 2,
            sport: { title: "" },
            location: { name: "", city: "" },
            date: "2024-07-30",
            start_time: "",
            end_time: ""
          },
          offer: { id_offer: 2, type: "offre2", number_seats: 1, discount: 0 }
        }
      ],
      removeFromCart: jest.fn()
    })

    // Rendu du composant Cart
    render(<Cart />)

    // Calcul attendu : (100*2*0.9) + (50*1*1) = 180 + 50 = 230
    expect(screen.getByText("230.00 €")).toBeInTheDocument()
  })
  
  it("appelle setSport(null) quand on clique sur 'Ajouter une réservation'", async () => {
  
    // Rendu du composant Cart
    render(<Cart />)

    // Simule un clic utilisateur
    const user = userEvent.setup()

    // Clic sur le lien
    await user.click(screen.getByText("Ajouter une réservation"))

    // Vérifie que setSport(null) a été appelé
    expect(setSportMock).toHaveBeenCalledWith(null)
  })

  it("affiche le message 'Votre panier est vide' si cartDetails est vide", () => {

    // Mock de la fonction useCart pour simuler un panier vide
    (useCart as jest.Mock).mockReturnValue({
      cartDetails: [],
      removeFromCart: jest.fn()
    })
  
    // Rendu du composant Cart
    render(<Cart />)
  
    // Vérifie que le message "Votre panier est vide" est affiché
    expect(screen.getByText("Votre panier est vide")).toBeInTheDocument()
  })
})