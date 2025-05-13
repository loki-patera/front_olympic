import { SportType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getSports', () => {
  
  // Importation de la fonction `getSports` après le mock de `fetchClient`
  let getSports: typeof import('../../../lib/api/sportApi').getSports
  let fetchClient: jest.Mock

  beforeEach(() => {

    // Réinitialise le module pour vider le cache
    jest.resetModules()

    // Réimporte les modules après la réinitialisation
    const sportApi = require('../../../lib/api/sportApi')
    getSports = sportApi.getSports
    fetchClient = require('../../../lib/fetchClient').fetchClient

    // Réinitialise tous les mocks
    jest.clearAllMocks()
  })

  it("appelle l'API si le cache est vide", async () => {

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

  it("met en cache les données après un appel à l'API", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: SportType[] = [
      { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' }
    ]
    fetchClient.mockResolvedValueOnce(mockResponse)

    // Appelle la fonction `getSports`
    const result = await getSports()

    // Vérifie que les données retournées sont correctes
    expect(result).toEqual([
      { id_sport: 1, title: 'Basketball', image: '/api/sport/basketball.jpg' }
    ])

    // Appelle à nouveau `getSports` pour vérifier que le cache est utilisé
    const cachedResult = await getSports()

    // Vérifie que `fetchClient` n'est pas appelé une deuxième fois
    expect(fetchClient).toHaveBeenCalledTimes(1)

    // Vérifie que les données du cache sont retournées
    expect(cachedResult).toEqual(result)
  })
})