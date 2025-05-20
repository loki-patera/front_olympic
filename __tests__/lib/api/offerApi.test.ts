import { OfferType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getOffers', () => {

  // Importation de la fonction `getOffers` après le mock de `fetchClient`
  let getOffers: typeof import('../../../lib/api').getOffers
  let fetchClient: jest.Mock

  beforeEach(() => {

    // Importation de la fonction `getOffers` et du mock `fetchClient`
    getOffers = require('../../../lib/api').getOffers
    fetchClient = require('../../../lib/fetchClient').fetchClient

    // Réinitialise tous les mocks
    jest.clearAllMocks()
  })

  it("appelle l'API et retourne la liste des offres", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: OfferType[] = [
      { id_offer: 1, type: 'duo', number_seats: 2, discount: 0 },
      { id_offer: 2, type: 'famille', number_seats: 4, discount: 10 }
    ]
    fetchClient.mockResolvedValueOnce(mockResponse)

    // Appelle la fonction `getOffers`
    const result = await getOffers()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/offer/offers',
      method: 'GET'
    })

    // Vérifie que le résultat correspond à la réponse mockée
    expect(result).toEqual(mockResponse)
  })
})