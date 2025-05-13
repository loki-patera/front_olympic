import { GET } from "../../../../../app/api/competitions/[eventId]/route"
import { NextRequest, NextResponse } from "next/server"

describe("Gestionnaire GET pour les compétitions", () => {

  // Sauvegarde des variables d'environnement avant les tests
  const mockEnv = process.env

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.resetAllMocks()
    // Réinitialise les variables d'environnement avant chaque test
    process.env = { ...mockEnv }

    // Mock de NextResponse.json
    jest.spyOn(NextResponse, "json").mockImplementation((data, init) => {
      return {
        status: init?.status || 200,
        json: async () => data,
        headers: new Map(Object.entries(init?.headers || {})),
      } as any
    })
  })

  afterAll(() => {
    // Restaure les variables d'environnement après tous les tests
    process.env = mockEnv
  })

  it("retourne une erreur 400 si le paramètre eventId est manquant", async () => {

    // Simule une requête `NextRequest` vide
    const req = {} as NextRequest

    // Simule les paramètres de la requête avec `eventId` non défini
    const props = { params: Promise.resolve({ eventId: undefined as any }) }

    // Appelle la fonction `GET` avec la requête et les paramètres simulés
    const response = await GET(req, props)

    // Vérifie que la réponse a un statut 400 (Bad Request)
    expect(response.status).toBe(400)

    // Récupère le JSON de la réponse
    const json = await response.json()

    // Vérifie que le message d'erreur est correct
    expect(json).toEqual({ error: "L'identifiant de l'événement est requis" })
  })

  it("récupère les compétitions et les retourne avec succès", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule une réponse JSON pour les compétitions
    const mockCompetitions = [
      { id_competition: 1, description: "Compétition 1", gender: "Hommes", phase: "Phase 1" },
      { id_competition: 2, description: "Compétition 2", gender: "Femmes", phase: "Phase 2" }
    ]
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCompetitions)
    } as any)

    // Simule une requête `NextRequest` vide
    const req = {} as NextRequest

    // Simule les paramètres de la requête avec `eventId` défini
    const props = { params: Promise.resolve({ eventId: "123" }) }

    // Appelle la fonction `GET` avec la requête et les paramètres simulés
    const response = await GET(req, props)

    // Vérifie que la fonction `fetch` a été appelée avec l'URL correcte
    expect(global.fetch).toHaveBeenCalledWith("http://backend/event/competitions/123")

    // Vérifie que la réponse a un statut 200 (OK)
    expect(response.status).toBe(200)

    // Récupère le JSON de la réponse
    const json = await response.json()

    // Vérifie que les compétitions retournées sont correctes
    expect(json).toEqual(mockCompetitions)
  })

  it("retourne une erreur 500 en cas d'erreur interne", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule une erreur lors de l'appel à fetch
    global.fetch = jest.fn().mockRejectedValue(new Error("Erreur réseau"))

    // Simule une requête `NextRequest` vide
    const req = {} as NextRequest

    // Simule les paramètres de la requête avec `eventId` défini
    const props = { params: Promise.resolve({ eventId: "123" }) }

    // Appelle la fonction `GET` avec la requête et les paramètres simulés
    const response = await GET(req, props)

    // Vérifie que la réponse a un statut 500 (Internal Server Error)
    expect(response.status).toBe(500)

    // Récupère le JSON de la réponse
    const json = await response.json()

    // Vérifie que le message d'erreur est correct
    expect(json).toEqual({ error: "Erreur interne du serveur" })
  })
})