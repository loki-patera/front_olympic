import { render, screen, fireEvent, act } from "@testing-library/react"
import { EventList } from "../../../../../../app/components/sections/bookingSections/eventSection/EventList"
import { useSportStore } from "../../../../../../app/stores/sportStore"
import { EventType } from "../../../../../../app/types/eventType"

// Mock du store pour simuler la sélection du sport
jest.mock("../../../../../../app/stores/sportStore")

const mockEvents: EventType[] = [
  {
    id_event: 1,
    sport: { id_sport: 1, title: "Natation", image: "natation.jpg" },
    location: { id_location: 1, name: "Stade Aquatique", city: "Paris", total_seats: 200 },
    date: "2024-08-01",
    start_time: "10:00",
    end_time: "12:00",
    price: 50,
    available_seats: 120
  },
  {
    id_event: 2,
    sport: { id_sport: 2, title: "Basketball", image: "basket.jpg" },
    location: { id_location: 2, name: "Arena", city: "Lyon", total_seats: 300 },
    date: "2024-08-02",
    start_time: "14:00",
    end_time: "16:00",
    price: 60,
    available_seats: 80
  }
]

describe("EventList", () => {

  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks()
  })

  it("filtre les événements selon le sport sélectionné", () => {

    // Mock du store pour simuler la sélection de l'épreuve sportive "Natation"
    ((useSportStore as unknown) as jest.Mock).mockImplementation(cb => cb({ sport: "Natation" }))

    // Rendu du composant EventList
    render(<EventList events={mockEvents} />)

    // Vérification que seul l'événement sportif "Natation" est affiché
    expect(screen.getByText("Natation")).toBeInTheDocument()

    // Vérification que l'événement "Basketball" n'est pas affiché
    expect(screen.queryByText("Basketball")).not.toBeInTheDocument()
  })

  it("affiche tous les événements si 'Toutes les épreuves sportives' est sélectionné", () => {

    // Mock du store pour simuler la sélection de toutes les épreuves sportives
    ((useSportStore as unknown) as jest.Mock).mockImplementation(cb => cb({ sport: "Toutes les épreuves sportives" }))

    // Rendu du composant EventList
    render(<EventList events={mockEvents} />)

    // Vérification que tous les événements sont affichés
    expect(screen.getByText("Natation")).toBeInTheDocument()
    expect(screen.getByText("Basketball")).toBeInTheDocument()
  })

  it("ouvre et ferme le tiroir d'un événement au clic", () => {

    // Mock du store pour simuler la sélection de l'épreuve sportive "Basketball"
    ((useSportStore as unknown) as jest.Mock).mockImplementation(cb => cb({ sport: "Basketball" }))

    // Rendu du composant EventList
    render(<EventList events={mockEvents} />)

    // Clique sur le bouton d'ouverture du premier EventCard
    const btn = screen.getAllByText(/Afficher les compétitions/i)[0]
    fireEvent.click(btn)

    // Le tiroir doit être ouvert (présence du texte de chargement ou d'une compétition)
    expect(screen.getByText(/Chargement des compétitions|Aucune compétition disponible/i)).toBeInTheDocument()

    // Clique à nouveau pour fermer
    fireEvent.click(btn)

    // Le tiroir doit être fermé (absence du texte de chargement ou d'une compétition)
    expect(screen.queryByText(/Chargement des compétitions|Aucune compétition disponible/i)).not.toBeInTheDocument()
  })

  it("ferme automatiquement le tiroir après 10 secondes", () => {

    jest.useFakeTimers()
    ;((useSportStore as unknown) as jest.Mock).mockImplementation(cb => cb({ sport: "Toutes les épreuves sportives" }))

    // Rendu du composant EventList
    render(<EventList events={mockEvents} />)

    // Clique sur le bouton d'ouverture du premier EventCard
    const btn = screen.getAllByText(/Afficher les compétitions/i)[0]
    fireEvent.click(btn)

    // Le tiroir doit être ouvert (présence du texte de chargement ou d'une compétition)
    expect(screen.getByText(/Chargement des compétitions|Aucune compétition disponible/i)).toBeInTheDocument()

    // Avance le temps de 10 secondes
    act(() => {
      jest.advanceTimersByTime(10000)
    })

    // Le tiroir doit être fermé (absence du texte de chargement ou d'une compétition)
    expect(screen.queryByText(/Chargement des compétitions|Aucune compétition disponible/i)).not.toBeInTheDocument()

    // Nettoyage
    jest.useRealTimers()
  })
})