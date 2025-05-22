import { getCartDetails } from '../../../lib/api/cartApi'
import { fetchClient } from '../../../lib/fetchClient'
import { CartItem } from '../../../app/context/CartContext'
import { CartType } from '../../../app/types/cartType'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getCartDetails', () => {

  // Exemple d'ID d'événement et d'offre pour le panier
  const mockCart: CartItem[] = [
    { id_event: 1, id_offer: 2 }
  ]

  // Exemple de données pour le panier
  const mockCartDetails: CartType[] = [
    {
      event: {
        id_event: 1,
        sport: { id_sport: 1, title: 'Athlétisme', image: 'athletisme.png' },
        location: { id_location: 1, name: 'Stade', city: 'Paris', total_seats: 50000 },
        date: '2024-08-01',
        start_time: '10:00',
        end_time: '12:00',
        price: 50.00,
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

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it('appelle fetchClient avec le bon endpoint, la bonne méthode et les bonnes données', async () => {

    // Simule une réponse de `fetchClient`
    (fetchClient as jest.Mock).mockResolvedValueOnce(mockCartDetails)

    // Appelle la fonction `getCartDetails` avec les IDs d'événement et d'offre
    const result = await getCartDetails(mockCart)

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/api/cart',
      method: 'POST',
      data: mockCart
    })

    // Vérifie que le résultat correspond à la réponse mockée
    expect(result).toEqual(mockCartDetails)
  })
})