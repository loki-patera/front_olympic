import { apiService } from "../../services/apiService"

describe("apiService", () => {

  // Réinitialise les mocks après chaque test
  afterEach(() => {
    jest.clearAllMocks()
  })


  it("appelle fetch avec l'URL complète et les bons en-têtes", async () => {

    // Mock de la fonction `fetch` pour simuler une réponse réussie
    const mockResponse = { data: "test" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      // Simule la méthode `json()` de la réponse
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    })

    // Appel de la méthode `get` de `apiService`
    const result = await apiService.get("/example-endpoint")

    // Vérifie que `fetch` a été appelé avec l'URL complète
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/example-endpoint`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    )

    // Vérifie que la méthode retourne les données JSON
    expect(result).toEqual(mockResponse)
  })


  it("rejette la promesse en cas d'erreur", async () => {

    // Mock d'une erreur dans `fetch` pour simuler un échec de la requête
    const mockError = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError)

    // Vérifie que la promesse est rejetée avec l'erreur
    await expect(apiService.get("/example-endpoint")).rejects.toThrow(
      "Network error"
    )

    // Vérifie que `fetch` a été appelé
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_HOST}/example-endpoint`,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    )
  })
})