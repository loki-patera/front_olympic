import { POST } from '../../../../app/api/logout/route'
import { NextRequest, NextResponse } from 'next/server'

describe("API POST /api/logout", () => {

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

  it("retourne success: true, supprime les cookies et appelle le backend si access existe", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Mock du cookie access
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: "access-token" })
      }
    } as unknown as NextRequest

    // Mock du fetch backend pour simuler la réponse de l'API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce({})
    } as any)

    // Appel de la fonction POST pour simuler la déconnexion
    const response = await POST(req)

    // Vérifie que fetch a été appelé avec les bons paramètres
    expect(global.fetch).toHaveBeenCalledWith(
      "http://backend/user/logout",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer access-token",
          "Content-Type": "application/json"
        }
      }
    )

    // Vérifie que la réponse a le statut 200
    expect(response.status).toBe(200)

    // Vérifie que le JSON retourné indique le succès
    const json = await response.json()
    expect(json).toEqual({ success: true })

    // Vérifie que les cookies ont été supprimés
    expect(response.cookies.set).toHaveBeenCalledWith('access', '', { maxAge: 0, path: '/' })
    expect(response.cookies.set).toHaveBeenCalledWith('refresh', '', { maxAge: 0, path: '/' })
  })

  it("retourne success: true et supprime les cookies même si access n'existe pas", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Mock sans cookie access
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined)
      }
    } as unknown as NextRequest

    // Mock du fetch backend pour simuler la réponse de l'API
    global.fetch = jest.fn()

    // Appel de la fonction POST pour simuler la déconnexion
    const response = await POST(req)

    // Vérifie que fetch n'a pas été appelé car il n'y a pas de token d'accès
    expect(global.fetch).not.toHaveBeenCalled()

    // Vérifie que la réponse a le statut 200
    expect(response.status).toBe(200)

    // Vérifie que le JSON retourné indique le succès
    const json = await response.json()
    expect(json).toEqual({ success: true })

    // Vérifie que les cookies ont été supprimés
    expect(response.cookies.set).toHaveBeenCalledWith('access', '', { maxAge: 0, path: '/' })
    expect(response.cookies.set).toHaveBeenCalledWith('refresh', '', { maxAge: 0, path: '/' })
  })

  it("retourne une erreur 500 en cas d'exception", async () => {

    // Mock qui lève une erreur
    const req = {
      cookies: {
        get: jest.fn().mockImplementation(() => { throw new Error("Erreur cookies") })
      }
    } as unknown as NextRequest

    // Appel de la fonction POST avec la requête simulée
    const response = await POST(req)

    // Vérifie que la réponse a le statut 500
    expect(response.status).toBe(500)

    // Vérifie que le JSON retourné contient le message d'erreur
    const json = await response.json()
    expect(json).toEqual({ detail: "Erreur lors de la déconnexion" })
  })
})