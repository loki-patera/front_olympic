import { getEvents, getSports } from '../../../../lib/api'
import Booking from '../../../../app/pages/booking/page'

// Mock de la fonction `getSports` et `getEvents` pour simuler les appels API
jest.mock('../../../../lib/api', () => ({
  getSports: jest.fn(),
  getEvents: jest.fn()
}))

describe('Page de réservation', () => {
  
  it("devrait appeler getSports et getEvents pour récupérer les données des épreuves sportives et des événements", async () => {

    // Données simulées pour les mocks
    const mockSports = [
      { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
      { id_sport: 2, title: 'Football', image: 'football.jpg' }
    ]
    const mockEvents = [
      {
        id_event: 1,
        sport: {
          id_sport: 1,
          title: 'Basketball',
          image: 'basketball.jpg'
        },
        location: {
          id_location: 1,
          name: 'Stade Pierre-Mauroy',
          city: 'Lille',
          total_seats: 27000
        },
        date: '2025-05-12',
        start_time: '18:00:00',
        end_time: '20:00:00',
        price: "50.00",
        available_seats: 10000
      },
      {
        id_event: 2,
        sport: {
          id_sport: 2,
          title: 'Football',
          image: 'football.jpg'
        },
        location: {
          id_location: 2,
          name: 'Parc des Princes',
          city: 'Paris',
          total_seats: 48000
        },
        date: '2025-05-13',
        start_time: '20:00:00',
        end_time: '22:00:00',
        price: "75.00",
        available_seats: 20000
      }
    ]

    // Configuration des mocks pour retourner les données simulées
    ;(getSports as jest.Mock).mockResolvedValue(mockSports)
    ;(getEvents as jest.Mock).mockResolvedValue(mockEvents)

    // Appel de la fonction `Booking`
    await Booking()

    // Vérification que `getSports` a été appelé
    expect(getSports).toHaveBeenCalledTimes(1)

    // Vérification que `getEvents` a été appelé
    expect(getEvents).toHaveBeenCalledTimes(1)

    // Vérification que les données retournées par `getSports` sont correctes
    expect(getSports).toHaveReturnedWith(Promise.resolve(mockSports))

    // Vérification que les données retournées par `getEvents` sont correctes
    expect(getEvents).toHaveReturnedWith(Promise.resolve(mockEvents))
  })
})