import { GET } from "../../../../../app/api/sport/[imagePath]/route"
import { NextRequest } from "next/server"

describe("Gestionnaire GET pour les images des épreuves sportives", () => {

  // Sauvegarde des variables d'environnement avant les tests
  const mockEnv = process.env

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.resetAllMocks()
    // Réinitialise les variables d'environnement avant chaque test
    process.env = { ...mockEnv }
  })

  afterAll(() => {
    //Restaure les variables d'environnement après tous les tests
    process.env = mockEnv
  })

  it("retourne une erreur 400 si le paramètre imagePath est manquant", async () => {

    // Simule une requête `NextRequest` vide
    const req = {} as NextRequest

    // Simule les paramètres de la requête avec `imagePath` non défini
    const props = { params: Promise.resolve({ imagePath: undefined as any }) }  

    // Appelle la fonction `GET` avec la requête et les paramètres simulés
    const response = await GET(req, props)

    // Vérifie que la réponse a un statut 400 (Bad Request)
    expect(response.status).toBe(400)

    // Récupère le texte de la réponse
    const text = await response.text()

    // Vérifie que le texte de la réponse est "Requête invalide"
    expect(text).toBe("Requête invalide")
  })

  it("récupère l'image et la retourne avec les bons en-têtes", async () => {

    // Définit la variable d'environnement API_URL pour simuler l'URL du backend
    process.env.API_URL = "http://backend"

    // Simule une image binaire
    const fakeImage = Buffer.from([1, 2, 3, 4]) 
    global.fetch = jest.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(fakeImage) // Simule la méthode arrayBuffer pour retourner l'image binaire
    } as any)

    // Simule une requête `NextRequest` vide
    const req = {} as NextRequest

    // Simule les paramètres de la requête avec `imagePath` défini
    const props = { params: Promise.resolve({ imagePath: "test.jpg" }) }

    // Appelle la fonction `GET` avec la requête et les paramètres simulés
    const response = await GET(req, props)

    // Vérifie que la fonction `fetch` a été appelée avec l'URL correcte
    expect(global.fetch).toHaveBeenCalledWith("http://backend/media/sports/test.jpg")

    // Vérifie que le type MIME de la réponse est correct
    expect(response.headers.get("Content-Type")).toBe("image/jpeg")

    // Vérifie que le cache est configuré correctement
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable")

    // Récupère le buffer de l'image à partir de la réponse
    const buf = Buffer.from(await response.arrayBuffer())

    // Vérifie que le buffer de l'image retourné correspond à l'image simulée
    expect(buf.equals(fakeImage)).toBe(true)
  })
})