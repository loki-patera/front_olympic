import { getMe } from '../../../lib/api/meApi'
import { fetchClient } from '../../../lib/fetchClient'

// Mock de la fonction fetchClient
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('getMe', () => {

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("retourne les infos utilisateur si la première requête réussit", async () => {

    // Simule une réponse de `fetchClient` avec les infos utilisateur
    (fetchClient as jest.Mock).mockResolvedValueOnce({
      firstname: 'Marie',
      lastname: 'Curie'
    })

    // Appelle la fonction `getMe`
    const result = await getMe()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: "/api/me",
      method: "GET"
    })

    // Vérifie que le résultat contient les infos utilisateur
    expect(result).toEqual({ firstname: 'Marie', lastname: 'Curie' })
  })

  it("rafraîchit le token et retourne les infos utilisateur si la première requête échoue mais la seconde réussit", async () => {
    
    // 1ère requête échoue (pas de firstname/lastname)
    (fetchClient as jest.Mock).mockResolvedValueOnce({ detail: "Token expiré" })
    // Rafraîchissement du token réussit
    ;(fetchClient as jest.Mock).mockResolvedValueOnce({ success: true })
    // 2ème requête réussit
    ;(fetchClient as jest.Mock).mockResolvedValueOnce({
      firstname: 'Pierre',
      lastname: 'Curie'
    })

    // Appelle la fonction `getMe`
    const result = await getMe()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments pour chaque requête
    expect(fetchClient).toHaveBeenNthCalledWith(1, {
      endpoint: "/api/me",
      method: "GET"
    })
    expect(fetchClient).toHaveBeenNthCalledWith(2, {
      endpoint: "/api/refresh",
      method: "POST"
    })
    expect(fetchClient).toHaveBeenNthCalledWith(3, {
      endpoint: "/api/me",
      method: "GET"
    })

    // Vérifie que le résultat contient les infos utilisateur
    expect(result).toEqual({ firstname: 'Pierre', lastname: 'Curie' })
  })

  it("retourne null si la première requête échoue et le refresh échoue", async () => {

    // 1ère requête échoue (pas de firstname/lastname)
    (fetchClient as jest.Mock).mockResolvedValueOnce({ detail: "Token expiré" })
    // Rafraîchissement du token échoue
    ;(fetchClient as jest.Mock).mockResolvedValueOnce({ success: false })

    // Appelle la fonction `getMe`
    const result = await getMe()

    // Vérifie que le résultat est null
    expect(result).toBeNull()
  })

  it("retourne null si une exception est levée", async () => {

    // Simule une erreur lors de l'appel à `fetchClient`
    (fetchClient as jest.Mock).mockRejectedValueOnce(new Error('Erreur réseau'))

    // Appelle la fonction `getMe`
    const result = await getMe()

    // Vérifie que le résultat est null
    expect(result).toBeNull()
  })
})