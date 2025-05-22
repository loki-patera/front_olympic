import { getCompetitionsByEvent } from '../../../lib/api'
import { fetchClient } from '../../../lib/fetchClient'
import { CompetitionType } from '../../../app/types'

// Mock de la fonction `fetchClient`
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getCompetitionsByEvent', () => {

  // Exemple de données de compétition
  const mockCompetitions: CompetitionType[] = [
    {
      id_competition: 1,
      description: '100m Hommes',
      gender: 'Hommes',
      phase: 'Finale',
      event: {
        id_event: 1,
        sport: { id_sport: 1, title: 'Athlétisme', image: 'athletisme.png' },
        location: { id_location: 1, name: 'Stade', city: 'Paris', total_seats: 50000 },
        date: '2024-08-01',
        start_time: '10:00',
        end_time: '12:00',
        price: 50.00,
        available_seats: 100
      }
    }
  ]

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it('appelle fetchClient avec le bon endpoint et retourne les compétitions', async () => {

    // Simule une réponse de `fetchClient`
    (fetchClient as jest.Mock).mockResolvedValueOnce(mockCompetitions)

    // Appelle la fonction `getCompetitionsByEvent` avec un ID d'événement
    const result = await getCompetitionsByEvent(1)

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/api/competitions/1',
      method: 'GET'
    })

    // Vérifie que le résultat correspond à la réponse mockée
    expect(result).toEqual(mockCompetitions)
  })
})