import { registerUser } from '../../../lib/api'
import { fetchClient } from '../../../lib/fetchClient'
import { UserType } from '../../../app/types'

// Mock de la fonction fetchClient
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('registerUser', () => {

  // Exemple de données utilisateur pour l'enregistrement
  const userData: Omit<UserType, "id_person"> = {
    email: "email@example.com",
    firstname: "John",
    lastname: "Doe",
    date_of_birth: "2000-01-01",
    country: "France",
    password: "secure§Password123"
  }

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("retourne success: true si l'enregistrement est réussi", async () => {

    // Simule une réponse de `fetchClient` indiquant que l'enregistrement a réussi
    (fetchClient as jest.Mock).mockResolvedValueOnce({ success: true })

    // Appelle la fonction `registerUser` avec les données utilisateur
    const result = await registerUser(userData)

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: "/api/registerUser",
      method: "POST",
      data: userData
    })

    // Vérifie que le résultat est un objet avec success: true
    expect(result).toEqual({ success: true })
  })

  it("retourne les erreurs si l'API en renvoie", async () => {

    // Simule une réponse de `fetchClient` indiquant une erreur d'enregistrement
    (fetchClient as jest.Mock).mockResolvedValueOnce({ success: false, errors: "Email déjà utilisé" })
    
    // Appelle la fonction `registerUser` avec les données utilisateur
    const result = await registerUser(userData)

    // Vérifie que le résultat contient les erreurs renvoyées par l'API
    expect(result).toEqual({ success: false, errors: "Email déjà utilisé" })
  })
})