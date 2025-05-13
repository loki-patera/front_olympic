import { EventType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getEvents', () => {

  // Importation de la fonction `getEvents` après le mock de `fetchClient`
  let getEvents: typeof import('../../../lib/api/eventApi').getEvents
  let fetchClient: jest.Mock

  beforeEach(() => {

    // Réinitialise le module pour vider le cache
    jest.resetModules()

    // Réimporte les modules après la réinitialisation
    const eventApi = require('../../../lib/api/eventApi')
    getEvents = eventApi.getEvents
    fetchClient = require('../../../lib/fetchClient').fetchClient

    // Réinitialise tous les mocks
    jest.clearAllMocks()
  })

  it("appelle l'API si le cache est vide", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: EventType[] = [
      {
        id_event: 1,
        sport: { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
        location: { id_location: 1, name: 'Stade Pierre-Mauroy', city: 'Lille', total_seats: 27000 },
        date: '2025-05-12',
        start_time: '18:00:00',
        end_time: '20:00:00',
        price: 50.0,
        available_seats: 10000
      },
      {
        id_event: 2,
        sport: { id_sport: 2, title: 'Football', image: 'football.jpg' },
        location: { id_location: 2, name: 'Parc des Princes', city: 'Paris', total_seats: 48000 },
        date: '2025-05-13',
        start_time: '20:00:00',
        end_time: '22:00:00',
        price: 75.0,
        available_seats: 20000
      }
    ]
    fetchClient.mockResolvedValueOnce(mockResponse)

    // Appelle la fonction `getEvents`
    const result = await getEvents()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/event/events',
      method: 'GET'
    })

    // Vérifie que le résultat contient les événements avec l'URL de l'image modifiée
    expect(result).toEqual([
      {
        id_event: 1,
        sport: { id_sport: 1, title: 'Basketball', image: '/api/sport/basketball.jpg' },
        location: { id_location: 1, name: 'Stade Pierre-Mauroy', city: 'Lille', total_seats: 27000 },
        date: '2025-05-12',
        start_time: '18:00:00',
        end_time: '20:00:00',
        price: 50.0,
        available_seats: 10000
      },
      {
        id_event: 2,
        sport: { id_sport: 2, title: 'Football', image: '/api/sport/football.jpg' },
        location: { id_location: 2, name: 'Parc des Princes', city: 'Paris', total_seats: 48000 },
        date: '2025-05-13',
        start_time: '20:00:00',
        end_time: '22:00:00',
        price: 75.0,
        available_seats: 20000
      }
    ])
  })

  it("met en cache les données après un appel à l'API", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: EventType[] = [
      {
        id_event: 1,
        sport: { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
        location: { id_location: 1, name: 'Stade Pierre-Mauroy', city: 'Lille', total_seats: 27000 },
        date: '2025-05-12',
        start_time: '18:00:00',
        end_time: '20:00:00',
        price: 50.0,
        available_seats: 10000
      }
    ]
    fetchClient.mockResolvedValueOnce(mockResponse)

    // Appelle la fonction `getEvents`
    const result = await getEvents()

    // Vérifie que les données retournées sont correctes
    expect(result).toEqual([
      {
        id_event: 1,
        sport: { id_sport: 1, title: 'Basketball', image: '/api/sport/basketball.jpg' },
        location: { id_location: 1, name: 'Stade Pierre-Mauroy', city: 'Lille', total_seats: 27000 },
        date: '2025-05-12',
        start_time: '18:00:00',
        end_time: '20:00:00',
        price: 50.0,
        available_seats: 10000
      }
    ])

    // Appelle à nouveau `getEvents` pour vérifier que le cache est utilisé
    const cachedResult = await getEvents()

    // Vérifie que `fetchClient` n'est pas appelé une deuxième fois
    expect(fetchClient).toHaveBeenCalledTimes(1)

    // Vérifie que les données du cache sont retournées
    expect(cachedResult).toEqual(result)
  })
})