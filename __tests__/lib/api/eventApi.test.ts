import { EventType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getEvents', () => {

  // Importation de la fonction `getEvents` après le mock de `fetchClient`
  let getEvents: typeof import('../../../lib/api').getEvents
  let fetchClient: jest.Mock

  beforeEach(() => {

    // Importation de la fonction `getEvents` et du mock de `fetchClient`
    getEvents = require('../../../lib/api').getEvents
    fetchClient = require('../../../lib/fetchClient').fetchClient

    // Réinitialise tous les mocks
    jest.clearAllMocks()
  })

  it("appelle l'API et retourne la liste des événements avec l'URL d'image du sport modifiée", async () => {

    // Simule une réponse de `fetchClient`
    const mockResponse: EventType[] = [
      {
        id_event: 1,
        sport: { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
        location: { id_location: 1, name: 'Stade Pierre-Mauroy', city: 'Lille', total_seats: 27000 },
        date: '2025-05-12',
        start_time: '18:00:00',
        end_time: '20:00:00',
        price: 50.00,
        available_seats: 10000
      },
      {
        id_event: 2,
        sport: { id_sport: 2, title: 'Football', image: 'football.jpg' },
        location: { id_location: 2, name: 'Parc des Princes', city: 'Paris', total_seats: 48000 },
        date: '2025-05-13',
        start_time: '20:00:00',
        end_time: '22:00:00',
        price: 75.00,
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
        price: 50.00,
        available_seats: 10000
      },
      {
        id_event: 2,
        sport: { id_sport: 2, title: 'Football', image: '/api/sport/football.jpg' },
        location: { id_location: 2, name: 'Parc des Princes', city: 'Paris', total_seats: 48000 },
        date: '2025-05-13',
        start_time: '20:00:00',
        end_time: '22:00:00',
        price: 75.00,
        available_seats: 20000
      }
    ])
  })
})