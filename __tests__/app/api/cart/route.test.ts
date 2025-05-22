import { POST } from "../../../../app/api/cart/route"
import { NextRequest, NextResponse } from "next/server"

describe("API POST /api/cart", () => {

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

  it("retourne les données pour le panier avec succès", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule les données pour la requête POST
    const mockCart = [{ id_event: 1, id_offer: 2 }]

    // Simule une réponse JSON pour le panier
    const mockCartDetails = [{ event: { id_event: 1 }, offer: { id_offer: 2 } }]  

    // Mock du body de la requête
    const req = {
      json: jest.fn().mockResolvedValueOnce(mockCart)
    } as unknown as NextRequest

    // Mock du fetch backend
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockCartDetails)
    } as any)

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la fonction fetch a été appelée avec l'URL correcte
    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend/event/cart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockCart)
      }
    )

    // Vérifie que la réponse a un statut 200 (OK)
    expect(response.status).toBe(200)

    // Récupère le JSON de la réponse
    const json = await response.json()

    // Vérifie que la réponse contient les détails pour le panier
    expect(json).toEqual(mockCartDetails)
  })

  it("retourne une erreur 500 en cas d'erreur interne", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule une erreur lors de l'appel à fetch
    const req = {
      json: jest.fn().mockRejectedValueOnce(new Error("Erreur JSON"))
    } as unknown as NextRequest

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a un statut 500
    expect(response.status).toBe(500)

    // Récupère le JSON de la réponse
    const json = await response.json()

    // Vérifie que le message d'erreur est correct
    expect(json).toEqual({ error: "Erreur interne du serveur" })
  })
})