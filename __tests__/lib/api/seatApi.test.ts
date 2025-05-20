import { OfferType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getSeats', () => {

  // Importation de la fonction `getSeats` après le mock de `fetchClient`
  let getSeats: typeof import('../../../lib/api').getSeats
  let fetchClient: jest.Mock

  beforeEach(() => {

    // Importation de la fonction `getSeats` et du mock `fetchClient`
    getSeats = require('../../../lib/api').getSeats
    fetchClient = require('../../../lib/fetchClient').fetchClient

    // Réinitialise tous les mocks
    jest.clearAllMocks()
  })

  it("appelle l'API et retourne la liste des nombre de places", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: OfferType[] = [
      { id_offer: 1, type: 'duo', number_seats: 2, discount: 0 },
      { id_offer: 2, type: 'famille', number_seats: 4, discount: 10 }
    ]
    fetchClient.mockResolvedValueOnce(mockResponse)

    // Appelle la fonction `getSeats`
    const result = await getSeats()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/offer/seats',
      method: 'GET'
    })

    // Vérifie que le résultat correspond à la réponse mockée
    expect(result).toEqual(mockResponse)
  })
})