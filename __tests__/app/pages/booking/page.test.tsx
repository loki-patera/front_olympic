import { getEvents, getOffers, getSeats, getSports } from '../../../../lib/api'
import Booking from '../../../../app/pages/booking/page'

// Mock de la fonction `getSports` et `getEvents` pour simuler les appels API
jest.mock('../../../../lib/api', () => ({
  getSports: jest.fn(),
  getEvents: jest.fn(),
  getSeats: jest.fn(),
  getOffers: jest.fn()
}))

describe('Page de réservation', () => {
  
  it("appelle getSports, getEvents, getSeats et getOffers pour récupérer leurs données", async () => {

    // Données simulées pour les mocks
    const mockSports = [
      { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
      { id_sport: 2, title: 'Football', image: 'football.jpg' }
    ]
    const mockEvents = [
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
    const mockOffers = [
      { id_offer: 1, type: 'solo', number_seats: 1, discount: 0 },
      { id_offer: 2, type: 'duo - 2 adultes', number_seats: 2, discount: 5 },
      { id_offer: 1, type: 'duo - 1 adulte / 1 enfant', number_seats: 2, discount: 10 },
      { id_offer: 2, type: 'trio - 3 adultes', number_seats: 3, discount: 8 },
      { id_offer: 2, type: 'famille', number_seats: 4, discount: 14 }
    ]
    const mockSeats = [
      { number_seats: 1 },
      { number_seats: 2 },
      { number_seats: 3 },
      { number_seats: 4 }
    ]

    // Configuration des mocks pour retourner les données simulées
    ;(getSports as jest.Mock).mockResolvedValue(mockSports)
    ;(getEvents as jest.Mock).mockResolvedValue(mockEvents)
    ;(getSeats as jest.Mock).mockResolvedValue(mockSeats)
    ;(getOffers as jest.Mock).mockResolvedValue(mockOffers)

    // Appel de la fonction `Booking`
    await Booking()

    // Vérification que les fonctions `getSports`, `getEvents`, `getSeats` et `getOffers` ont été appelées
    expect(getSports).toHaveBeenCalledTimes(1)
    expect(getEvents).toHaveBeenCalledTimes(1)
    expect(getSeats).toHaveBeenCalledTimes(1)
    expect(getOffers).toHaveBeenCalledTimes(1)

    // Vérification que les fonctions `getSports`, `getEvents`, `getSeats` et `getOffers` ont été appelées avec les bons arguments
    expect(getSports).toHaveReturnedWith(Promise.resolve(mockSports))
    expect(getEvents).toHaveReturnedWith(Promise.resolve(mockEvents))
    expect(getSeats).toHaveReturnedWith(Promise.resolve(mockSeats))
    expect(getOffers).toHaveReturnedWith(Promise.resolve(mockOffers))
  })

  it('exporte la constante revalidate à 60', () => {

    // Importation du module de la page
    const pageModule = require('../../../../app/pages/booking/page')

    // Vérification que la constante revalidate est bien définie et égale à 60
    expect(pageModule.revalidate).toBe(60)
  })
})