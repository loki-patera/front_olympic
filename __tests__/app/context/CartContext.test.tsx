import { render, act } from '@testing-library/react'
import { CartProvider, useCart } from '../../../app/context/CartContext'
import { getCartDetails as mockGetCartDetails } from '../../../lib/api'

// Mock de l'API cartApi
jest.mock('../../../lib/api/cartApi', () => ({
  getCartDetails: jest.fn()
}))

// Composant de test pour le contexte du panier
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, cartDetails } = useCart()
  return (
    <div>
      <button onClick={() => addToCart({ id_event: 1, id_offer: 2 })}>add</button>
      <button onClick={() => removeFromCart({ id_event: 1, id_offer: 2 })}>remove</button>
      <div data-testid="cart">{JSON.stringify(cart)}</div>
      <div data-testid="cartDetails">{JSON.stringify(cartDetails)}</div>
    </div>
  )
}

describe("CartContext", () => {

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("ajoute et retire un élément du panier", async () => {

    // Mock la réponse de getCartDetails
    (mockGetCartDetails as jest.Mock).mockResolvedValueOnce([
      { event: { id_event: 1 }, offer: { id_offer: 2 } }
    ])

    // Rendu du composant de test
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    // Ajout d'un élément
    await act(async () => {
      getByText("add").click()
    })

    // Vérifie que l'élément a été ajouté au panier
    expect(getByTestId("cart").textContent).toContain('"id_event":1')

    // Vérifie que la fonction `getCartDetails` a été appelée avec les bons arguments
    expect(mockGetCartDetails).toHaveBeenCalledWith([{ id_event: 1, id_offer: 2 }])

    // Simule la mise à jour des détails du panier
    await act(async () => {
      // Le useEffect va appeler getCartDetails, qui est déjà mocké
    })

    // Vérifie que les détails du panier contiennent l'élément ajouté
    expect(getByTestId("cartDetails").textContent).toContain('"id_event":1')

    // Retrait d'un élément
    await act(async () => {
      getByText("remove").click()
    })

    // Vérifie que l'élément a été retiré du panier
    expect(getByTestId("cart").textContent).not.toContain('"id_event":1')

    // Vérifie que les détails du panier sont vides après le retrait
    expect(getByTestId("cartDetails").textContent).toBe("[]")
  })

  it("retourne une erreur si useCart est utilisé hors CartProvider", () => {

    // Cache les erreurs React attendues
    const spy = jest.spyOn(console, "error").mockImplementation(() => {})

    // Composant qui utilise useCart sans CartProvider
    const Broken = () => {
      useCart()
      return null
    }

    // Vérifie que l'erreur est bien levée
    expect(() => render(<Broken />)).toThrow(
      "Le hook useCart doit être utilisé à l’intérieur d’un CartProvider"
    )

    // Restaure le comportement d'origine de console.error
    spy.mockRestore()
  })

  it("vide cartDetails si getCartDetails échoue", async () => {

    // Mock getCartDetails pour qu'il rejette une erreur
    (mockGetCartDetails as jest.Mock).mockRejectedValueOnce(new Error("Erreur API"))
  
    // Rendu du composant de test
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
  
    // Ajoute un élément pour déclencher l'appel à getCartDetails
    await act(async () => {
      getByText("add").click()
    })
  
    // `cartDetails` doit être vide après l'échec
    expect(getByTestId("cartDetails").textContent).toBe("[]")
  })
})