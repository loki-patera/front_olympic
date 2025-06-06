import { checkEmailExists } from '../../../lib/api'
import { fetchClient } from '../../../lib/fetchClient'

// Mock de la fonction fetchClient
jest.mock('../../../lib/fetchClient', () => ({
  fetchClient: jest.fn()
}))

describe('checkEmailExists', () => {

  beforeEach(() => {
    // Réinitialise tous les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("retourne true si l'email existe", async () => {

    // Simule une réponse de `fetchClient` indiquant que l'email existe
    (fetchClient as jest.Mock).mockResolvedValueOnce({ exists: true })

    // Appelle la fonction `checkEmailExists` avec un email de test
    const result = await checkEmailExists('test@email.com')

    // Vérifie que `fetchClient` a été appelé avec les bons arguments
    expect(fetchClient).toHaveBeenCalledWith({
      endpoint: '/api/check-email',
      method: 'POST',
      data: { email: 'test@email.com' }
    })

    // Vérifie que le résultat est true
    expect(result).toBe(true)
  })

  it("retourne false si l'email n'existe pas", async () => {

    // Simule une réponse de fetchClient indiquant que l'email n'existe pas
    (fetchClient as jest.Mock).mockResolvedValueOnce({ exists: false })

    // Appelle la fonction `checkEmailExists` avec un email de test
    const result = await checkEmailExists('notfound@email.com')

    // Vérifie que le résultat est false
    expect(result).toBe(false)
  })
})