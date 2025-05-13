import { getCompetitionsByEvent } from '../../../lib/api/competitionApi'
import { CompetitionType } from '../../../app/types'

// Mock de la fonction fetch
global.fetch = jest.fn()

describe('getCompetitionsByEvent', () => {

  // Mock de l'ID de l'événement
  const mockEventId = 1

  beforeEach(() => {

    // Réinitialise les mock avant chaque test
    jest.clearAllMocks()
  })

  it("récupère les compétitions liées à un événement sportif avec succès", async () => {

    // Simule une réponse de l'API
    const mockResponse: CompetitionType[] = [
      {
        id_competition: 1,
        description: "Compétition 1",
        gender: "Hommes",
        phase: "Phase 1",
        event: {
          id_event: 1,
          sport: { id_sport: 1, title: "Basketball", image: "basketball.jpg" },
          location: { id_location: 1, name: "Stade Pierre-Mauroy", city: "Lille", total_seats: 27000 },
          date: "2025-05-12",
          start_time: "18:00:00",
          end_time: "20:00:00",
          price: 50.0,
          available_seats: 10000
        }
      }
    ]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    // Appelle la fonction getCompetitionsByEvent avec l'ID de l'événement
    const result = await getCompetitionsByEvent(mockEventId)

    // Vérifie que fetch a été appelé avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`/api/competitions/${mockEventId}`, {
      method: 'GET'
    })

    // Vérifie que les données retournées sont correctes
    expect(result).toEqual(mockResponse)
  })

  it("lève une erreur si l'API retourne une réponse non valide", async () => {

    // Simule une réponse de l'API avec un statut d'erreur
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found"
    })

    // Vérifie que l'appel de la fonction getCompetitionsByEvent avec l'ID de l'événement lève une erreur
    await expect(getCompetitionsByEvent(mockEventId)).rejects.toThrow(
      "Erreur lors de la récupération des compétitions : Not Found"
    )

    // Vérifie que fetch a été appelé avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`/api/competitions/${mockEventId}`, {
      method: 'GET'
    })
  })

  it("lève une erreur si fetch échoue", async () => {

    // Simule une erreur de réseau
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"))

    // Vérifie que l'appel de la fonction getCompetitionsByEvent avec l'ID de l'événement lève une erreur
    await expect(getCompetitionsByEvent(mockEventId)).rejects.toThrow("Network Error")

    // Vérifie que fetch a été appelé avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`/api/competitions/${mockEventId}`, {
      method: 'GET'
    })
  })
})