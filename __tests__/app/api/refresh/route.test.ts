import { POST } from '../../../../app/api/refresh/route'
import { NextRequest, NextResponse } from 'next/server'

describe("API POST /api/refresh", () => {

  // Sauvegarde des variables d'environnement avant les tests
  const mockEnv = process.env

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.resetAllMocks()
    // Réinitialise les variables d'environnement avant chaque test
    process.env = { ...mockEnv }

    // Mock NextResponse.json pour simuler la réponse JSON
    jest.spyOn(NextResponse, "json").mockImplementation((data, init) => {
      return {
        status: init?.status || 200,
        json: async () => data,
        cookies: {
          set: jest.fn()
        },
        headers: new Map(Object.entries(init?.headers || {})),
      } as any
    })
  })

  afterAll(() => {
    // Restaure les variables d'environnement après tous les tests
    process.env = mockEnv
  })

  it("retourne success: true et définit le cookie access si le refresh est valide", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Sauvegarde l'environnement original pour le restaurer après le test
    const originalNodeEnv = process.env.NODE_ENV

    // Définit NODE_ENV à "test" pour simuler l'environnement de test
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "test",
      writable: true,
      configurable: true
    })

    // Mock du cookie refresh
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: "refresh-token" })
      }
    } as unknown as NextRequest

    // Simule la réponse du backend avec un nouveau token d'accès
    const mockBackendResponse = { access: "new-access-token" }
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockBackendResponse)
    } as any)

    // Appelle la fonction POST pour simuler le rafraîchissement du token
    const response = await POST(req)

    // Vérifie que fetch a été appelé avec les bons paramètres
    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend/user/token/refresh",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: "refresh-token" })
      }
    )

    // Vérifie que la réponse a le statut 200
    expect(response.status).toBe(200)

    // Vérifie que le JSON retourné indique le succès
    const json = await response.json()
    expect(json).toEqual({ success: true })

    // Vérifie que le cookie access a été défini avec le nouveau token
    expect(response.cookies.set).toHaveBeenCalledWith("access", "new-access-token", expect.any(Object))

    // Restaure l'environnement original après le test
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalNodeEnv,
      writable: true,
      configurable: true
    })
  })

  it("retourne 401 si le cookie refresh est absent", async () => {

    // Simule l'absence du cookie refresh
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined)
      }
    } as unknown as NextRequest

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a le statut 401
    expect(response.status).toBe(401)

    // Vérifie que le JSON retourné indique un échec
    const json = await response.json()
    expect(json).toEqual({ success: false })
  })

  it("retourne 401 si le backend ne retourne pas de token d'accès", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Mock du cookie refresh
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: "refresh-token" })
      }
    } as unknown as NextRequest

    // Simule une réponse backend sans access
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValueOnce({})
    } as any)

    // Appelle la fonction POST pour simuler le rafraîchissement du token
    const response = await POST(req)

    // Vérifie que la réponse a le statut 401
    expect(response.status).toBe(401)

    // Vérifie que le JSON retourné indique un échec
    const json = await response.json()
    expect(json).toEqual({ success: false })
  })

  it("retourne 500 en cas d'exception", async () => {

    // Simule une erreur lors de la récupération du cookie
    const req = {
      cookies: {
        get: jest.fn().mockImplementation(() => { throw new Error("Erreur cookies") })
      }
    } as unknown as NextRequest

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a le statut 500
    expect(response.status).toBe(500)

    // Vérifie que le JSON retourné indique une erreur
    const json = await response.json()
    expect(json).toEqual({ success: false })
  })
})