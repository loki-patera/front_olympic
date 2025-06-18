import { GET } from '../../../../app/api/me/route'
import { NextRequest, NextResponse } from 'next/server'

describe("API GET /api/me", () => {

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

  it("retourne les infos utilisateur si authentifié", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Mock du cookie access
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: "access-token" })
      }
    } as unknown as NextRequest

    // Simule les données de l'utilisateur à retourner
    const userData = { firstname: "Marie", lastname: "Curie" }

    // Mock du fetch backend pour simuler la réponse de l'API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(userData)
    } as any)

    // Appelle la fonction GET avec la requête simulée
    const response = await GET(req)

    // Vérifie que fetch a été appelé avec les bons paramètres
    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend/user/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer access-token"
        }
      }
    )

    // Vérifie que la réponse a le statut 200
    expect(response.status).toBe(200)

    // Vérifie que le JSON retourné contient les données de l'utilisateur
    const json = await response.json()
    expect(json).toEqual(userData)
  })

  it("retourne 401 si pas de cookie access", async () => {

    // Mock du cookie access non défini
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined)
      }
    } as unknown as NextRequest

    // Appelle la fonction GET avec la requête simulée
    const response = await GET(req)

    // Vérifie que la réponse a le statut 401
    expect(response.status).toBe(401)

    // Vérifie que le JSON retourné indique que l'utilisateur n'est pas authentifié
    const json = await response.json()
    expect(json).toEqual({ detail: "Non authentifié" })
  })

  it("retourne 401 si le token est invalide", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Mock du cookie access
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: "access-token" })
      }
    } as unknown as NextRequest

    // Mock du fetch backend pour simuler une réponse 401
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValueOnce({ detail: "Token invalide" })
    } as any)

    // Appelle la fonction GET avec la requête simulée
    const response = await GET(req)

    // Vérifie que la réponse a le statut 401
    expect(response.status).toBe(401)

    // Vérifie que le JSON retourné indique que le token est invalide
    const json = await response.json()
    expect(json).toEqual({ detail: "Token invalide" })
  })

  it("retourne 500 en cas d'exception", async () => {

    // Mock qui lève une erreur lors de la récupération du cookie
    const req = {
      cookies: {
        get: jest.fn().mockImplementation(() => { throw new Error("Erreur cookies") })
      }
    } as unknown as NextRequest

    // Appelle la fonction GET avec la requête simulée
    const response = await GET(req)

    // Vérifie que la réponse a le statut 500
    expect(response.status).toBe(500)

    // Vérifie que le JSON retourné contient le message d'erreur
    const json = await response.json()
    expect(json).toEqual({ detail: "Erreur lors de la récupération des informations de l'utilisateur" })
  })
})