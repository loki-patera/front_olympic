import { POST } from '../../../../app/api/check-email/route'
import { NextRequest, NextResponse } from 'next/server'

describe("API POST /api/check-email", () => {

  // Sauvegarde des variables d'environnement avant les tests
  const mockEnv = process.env

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.resetAllMocks()
    // Réinitialise les variables d'environnement avant chaque test
    process.env = { ...mockEnv }

    // Mock de NextResponse.json pour simuler la réponse JSON
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

  it("retourne le résultat de vérification de l'email avec succès", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule un email pour la vérification
    const mockEmail = "test@email.com"

    // Simule le résultat de la vérification de l'email
    const mockResult = { exists: true }

    // Mock du body de la requête
    const req = {
      json: jest.fn().mockResolvedValueOnce({ email: mockEmail })
    } as unknown as NextRequest

    // Mock du fetch backend pour simuler la réponse de l'API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResult)
    } as any)

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la fonction fetch a été appelée avec l'URL correcte et les bons paramètres
    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend/user/check-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mockEmail })
      }
    )

    // Vérifie que la réponse a le statut 200
    expect(response.status).toBe(200)

    // Récupère le JSON de la réponse
    const json = await response.json()

    // Vérifie que le JSON retourné correspond au résultat simulé
    expect(json).toEqual(mockResult)
  })

  it("retourne une erreur 500 en cas d'exception", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule une erreur lors de la récupération du JSON
    const req = {
      json: jest.fn().mockRejectedValueOnce(new Error("Erreur JSON"))
    } as unknown as NextRequest

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a le statut 500
    expect(response.status).toBe(500)

    // Récupère le JSON de la réponse
    const json = await response.json()
    
    // Vérifie que le JSON retourné contient l'erreur attendue
    expect(json).toEqual({ error: "Erreur interne du serveur" })
  })
})