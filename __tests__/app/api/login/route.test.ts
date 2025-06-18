import { POST } from '../../../../app/api/login/route'
import { NextRequest, NextResponse } from 'next/server'

describe("API POST /api/login", () => {

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

  it("retourne success: true et définit les cookies si la connexion est réussie", async () => {

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

    // Simule les données de connexion de l'utilisateur
    const loginData = {
      email: "email@example.com",
      password: "secure§Password123"
    }

    // Simule les tokens d'accès et de rafraîchissement retournés par le backend
    const mockTokens = {
      access: "access-token",
      refresh: "refresh-token"
    }

    // Mock du body de la requête
    const req = {
      json: jest.fn().mockResolvedValueOnce(loginData)
    } as unknown as NextRequest

    // Mock du fetch backend pour simuler la réponse de l'API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockTokens)
    } as any)

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que fetch a été appelé avec les bons paramètres
    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend/user/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      }
    )

    // Vérifie que la réponse a le statut 200
    expect(response.status).toBe(200)

    // Vérifie que le JSON retourné indique le succès
    const json = await response.json()
    expect(json).toEqual({ success: true })

    // Vérifie que les cookies ont été définis
    expect(response.cookies.set).toHaveBeenCalledWith("access", "access-token", expect.any(Object))
    expect(response.cookies.set).toHaveBeenCalledWith("refresh", "refresh-token", expect.any(Object))

    // Restaure l'environnement original après le test
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalNodeEnv,
      writable: true,
      configurable: true
    })
  })

  it("retourne la réponse backend si la connexion échoue", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule les données de connexion de l'utilisateur
    const loginData = {
      email: "email@example.com",
      password: "wrongPassword"
    }

    // Simule l'erreur retournée par le backend en cas de connexion échouée
    const mockError = { detail: "Mot de passe incorrect" }

    // Mock du body de la requête
    const req = {
      json: jest.fn().mockResolvedValueOnce(loginData)
    } as unknown as NextRequest

    // Mock du fetch backend pour simuler la réponse de l'API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValueOnce(mockError)
    } as any)

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a le statut 401
    expect(response.status).toBe(401)

    // Vérifie que le JSON retourné correspond à l'erreur simulée
    const json = await response.json()
    expect(json).toEqual(mockError)
  })

  it("retourne une erreur 500 en cas d'exception", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Mock du body de la requête qui simule une erreur lors de la récupération des données JSON
    const req = {
      json: jest.fn().mockRejectedValueOnce(new Error("Erreur JSON"))
    } as unknown as NextRequest

    // Appelle la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a le statut 500
    expect(response.status).toBe(500)

    // Vérifie que le JSON retourné contient le message d'erreur
    const json = await response.json()
    expect(json).toEqual({ detail: "Erreur interne du serveur" })
  })
})