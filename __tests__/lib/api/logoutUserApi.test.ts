import { logoutUser } from '../../../lib/api/logoutUserApi'
import { fetchClient } from '../../../lib/fetchClient'

// Mock de la fonction fetchClient
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('logoutUser', () => {

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("retourne success: true si la déconnexion est réussie", async () => {

    // Simule une réponse de `fetchClient` indiquant que la déconnexion a réussi
    (fetchClient as jest.Mock).mockResolvedValueOnce({ success: true })

    // Appelle la fonction `logoutUser`
    const result = await logoutUser()

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: "/api/logout",
      method: "POST"
    })

    // Vérifie que le résultat est un objet avec success: true
    expect(result).toEqual({ success: true })
  })
})