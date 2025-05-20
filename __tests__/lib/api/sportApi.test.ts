import { SportType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getSports', () => {
  
  // Importation de la fonction `getSports` après le mock de `fetchClient`
  let getSports: typeof import('../../../lib/api').getSports
  let fetchClient: jest.Mock

  beforeEach(() => {

    // Importation de la fonction `getSports` et du mock de `fetchClient`
    getSports = require('../../../lib/api').getSports
    fetchClient = require('../../../lib/fetchClient').fetchClient

    // Réinitialise tous les mocks
    jest.clearAllMocks()
  })

  it("appelle l'API et retourne la liste des sports avec l'URL d'image modifiée", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: SportType[] = [
      { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
      { id_sport: 2, title: 'Football', image: 'football.jpg' }
    ]
    fetchClient.mockResolvedValueOnce(mockResponse)

    // Appelle la fonction `getSports`
    const result = await getSports()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/event/sports',
      method: 'GET'
    })

    // Vérifie que le résultat contient les épreuves sportives avec l'URL de l'image modifiée
    expect(result).toEqual([
      { id_sport: 1, title: 'Basketball', image: '/api/sport/basketball.jpg' },
      { id_sport: 2, title: 'Football', image: '/api/sport/football.jpg' }
    ])
  })
})