import { loginUser } from '../../../lib/api'
import { fetchClient } from '../../../lib/fetchClient'
import { UserType } from '../../../app/types'

// Mock de la fonction fetchClient
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('loginUser', () => {

  // Exemple de données utilisateur pour la connexion
  const loginData: Pick<UserType, "email" | "password"> = {
    email: "email@example.com",
    password: "secure§Password123"
  }

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("retourne success: true si la connexion est réussie", async () => {

    // Simule une réponse de `fetchClient` indiquant que la connexion a réussi
    (fetchClient as jest.Mock).mockResolvedValueOnce({ success: true })

    // Appelle la fonction `loginUser` avec les données de connexion
    const result = await loginUser(loginData)

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: "/api/login",
      method: "POST",
      data: loginData
    })

    // Vérifie que le résultat est un objet avec success: true
    expect(result).toEqual({ success: true })
  })

  it("retourne le détail si la connexion échoue", async () => {

    // Simule une réponse de `fetchClient` indiquant que la connexion a échoué
    (fetchClient as jest.Mock).mockResolvedValueOnce({ detail: "Mot de passe incorrect" })

    // Appelle la fonction `loginUser` avec les données de connexion
    const result = await loginUser(loginData)

    // Vérifie que le résultat contient le détail de l'erreur
    expect(result).toEqual({ detail: "Mot de passe incorrect" })
  })
})