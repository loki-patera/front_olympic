import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { SportSection } from "../../../../components/sections/homeSection/SportSection"
import { apiService } from "../../../../services/apiService"
import { useRouter } from "next/navigation"

// Mock de `apiService` pour simuler les appels API
jest.mock("../../../../services/apiService", () => ({
  apiService: {
    get: jest.fn()
  }
}))


describe("Composant SportSection", () => {

  // Réinitialise les mocks avant chaque test
  beforeEach(() => {
    jest.clearAllMocks()
  })


  it("filtre les sports en fonction du texte saisi", async () => {

    // Mock de la réponse de l'API
    const mockSports = {
      data: [
        { id_sport: 1, title: "Football", image_url: "/images/football.jpg" },
        { id_sport: 2, title: "Basketball", image_url: "/images/basketball.jpg" }
      ]
    };
    (apiService.get as jest.Mock).mockResolvedValueOnce(mockSports)

    // Rendu du composant `SportSection`
    render(<SportSection />)

    // Attendre que les sports soient affichés
    await waitFor(() => {
      expect(screen.getByText("Football")).toBeInTheDocument()
      expect(screen.getByText("Basketball")).toBeInTheDocument()
    })

    // Récupère le champ de recherche grâce à son attribut `placeholder`
    const searchInput = screen.getByPlaceholderText("Entrez les premières lettres d'un sport ...")

    // Simule la saisie de "Foot" dans le champ de recherche
    fireEvent.change(searchInput, { target: { value: "Foot" } })

    // Vérifie que seul "Football" est affiché
    expect(screen.getByText("Football")).toBeInTheDocument()

    // Vérifie que "Basketball" n'est pas affiché
    expect(screen.queryByText("Basketball")).not.toBeInTheDocument()
  })


  it("navigue vers la page de réservation lorsqu'un sport est cliqué", async () => {

    // Mock de la réponse de l'API
    const mockSports = {
      data: [
        { id_sport: 1, title: "Football", image_url: "/images/football.jpg" },
      ]
    };
    (apiService.get as jest.Mock).mockResolvedValueOnce(mockSports)

    // Mock de la fonction `router.push` pour simuler la navigation
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock, pathname: "/" }) // !!! À modifier quand la page de réservation sera créée !!!

    // Rendu du composant `SportSection`
    render(<SportSection />)

    // Attendre que les sports soient affichés
    await waitFor(() => {
      expect(screen.getByText("Football")).toBeInTheDocument()
    })

    // Récupère l'image du sport grâce à son attribut `alt`
    const sportImage = screen.getByAltText("Football")

    // Simule un clic sur l'image du sport
    fireEvent.click(sportImage)

    // Vérifie que `router.push` a été appelé avec "/booking"
    expect(pushMock).toHaveBeenCalledWith("/")                                  // !!! À modifier quand la page de réservation sera créée !!!

    // Vérifie que `router.push` a été appelé une fois
    expect(pushMock).toHaveBeenCalledTimes(1)
  })
})