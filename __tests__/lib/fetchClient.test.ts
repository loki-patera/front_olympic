import { fetchClient } from '../../lib/fetchClient'

// Mock global de la fonction fetch
global.fetch = jest.fn()

// Définition de l'URL de base de l'API pour les tests
process.env.API_URL = 'http://backend'

describe('fetchClient', () => {

  // Utilisation de la variable d'environnement de test pour l'URL de base
  const baseUrl = process.env.API_URL

  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks()
  })

  it("effectue une requête GET avec succès", async () => {

    // Mock de la réponse de la requête GET
    const mockResponse = { data: 'test' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    // Appel de la fonction fetchClient avec une requête GET
    const result = await fetchClient<{ data: string }>({
      endpoint: '/test',
      method: 'GET'
    })

    // Vérifie que la fonction `fetch` a été appelée avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/test`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    // Vérifie que le résultat retourné est celui attendu
    expect(result).toEqual(mockResponse)
  })

  it("effectue une requête POST avec succès", async () => {

    // Mock de la réponse de la requête POST
    const mockResponse = { success: true }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    // Appel de la fonction fetchClient avec une requête POST
    const result = await fetchClient<{ success: boolean }>({
      endpoint: '/test',
      method: 'POST',
      data: { key: 'value' }
    })

    // Vérifie que la fonction `fetch` a été appelée avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'value' })
    })

    // Vérifie que le résultat retourné est celui attendu
    expect(result).toEqual(mockResponse)
  })

  it("utilise l'URL interne si endpoint commence par /api/", async () => {

    // Mock de la réponse de la requête GET avec un endpoint interne
    const mockResponse = { data: 'internal' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    // Appel de la fonction fetchClient avec une requête GET sur un endpoint interne
    const result = await fetchClient<{ data: string }>({
      endpoint: '/api/test',
      method: 'GET'
    })

    // Vérifie que la fonction `fetch` a été appelée avec les bons arguments
    expect(fetch).toHaveBeenCalledWith('/api/test', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    // Vérifie que le résultat retourné est celui attendu
    expect(result).toEqual(mockResponse)
  })

  it("ajoute un en-tête Authorization si un token est fourni", async () => {

    // Mock de la réponse de la requête GET avec un token
    const mockResponse = { data: 'authorized' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })
  
    // Définition du token d'authentification
    const token = 'my-secret-token'
  
    // Appel de la fonction fetchClient avec une requête GET et un token
    const result = await fetchClient<{ data: string }>({
      endpoint: '/secure-endpoint',
      method: 'GET',
      token
    })
  
    // Vérifie que la fonction `fetch` a été appelée avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/secure-endpoint`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  
    // Vérifie que le résultat retourné est celui attendu
    expect(result).toEqual(mockResponse)
  })

  it("lève une erreur si la réponse n'est pas ok", async () => {

    // Mock de la réponse de la requête GET avec une erreur
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: jest.fn().mockResolvedValueOnce({})
    })

    // Vérifie que la fonction `fetchClient` lève une erreur lors d'une requête GET avec une réponse non ok
    await expect(
      fetchClient({ endpoint: '/test', method: 'GET' })
    ).rejects.toThrow('Erreur GET sur /test: 500 Internal Server Error')

    // Vérifie que la fonction `fetch` a été appelée avec les bons arguments
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/test`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
  })

  it("retourne un objet vide si la réponse n'est pas un JSON valide", async () => {

    // Mock de la réponse de la requête GET avec une réponse non JSON
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockRejectedValueOnce(new Error("Invalid JSON"))
    })
  
    // Appel de la fonction fetchClient avec une requête GET
    const result = await fetchClient<{ data?: string }>({
      endpoint: '/test',
      method: 'GET'
    })
  
    // Vérifie que le résultat retourné est un objet vide
    expect(result).toEqual({})
  })
})