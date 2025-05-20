import { render, screen, fireEvent, act } from "@testing-library/react"
import { EventList } from "../../../../../../app/components/sections/bookingSections/eventSection/EventList"
import { EventType, OfferType, SportType } from "../../../../../../app/types"

// Mock des données
const sports: SportType[] = [
  { id_sport: 1, title: "Natation", image: "natation.jpg" },
  { id_sport: 2, title: "Basketball", image: "basket.jpg" }
]

const mockEvents: EventType[] = [
  {
    id_event: 1,
    sport: sports[0],
    location: { id_location: 1, name: "Stade Aquatique", city: "Paris", total_seats: 200 },
    date: "2024-08-01",
    start_time: "10:00",
    end_time: "12:00",
    price: 50,
    available_seats: 120
  },
  {
    id_event: 2,
    sport: sports[1],
    location: { id_location: 2, name: "Arena", city: "Lyon", total_seats: 300 },
    date: "2024-08-02",
    start_time: "14:00",
    end_time: "16:00",
    price: 60,
    available_seats: 80
  }
]

const mockOffers: OfferType[] = [
  { id_offer: 1, type: "duo - 2 adultes", number_seats: 2, discount: 0 },
  { id_offer: 1, type: "duo - 1 adulte / 1 enfant", number_seats: 2, discount: 0 },
  { id_offer: 2, type: "famille", number_seats: 4, discount: 10 }
]
const mockSeats: OfferType[] = [
  mockOffers[0],
  mockOffers[2]
]

// Variable pour simuler l'épreuve sportive sélectionnée
let sportValue: SportType | null = null

// Mock du store Zustand pour simuler l'état de l'épreuve sportive sélectionnée
jest.mock('../../../../../../app/stores', () => ({
  useSportStore: jest.fn((selector) => selector({ sport: sportValue}))
}))

afterEach(() => {
  // Réinitialisation des mocks après chaque test
  jest.clearAllMocks()
  // Réinitialisation de la valeur de l'épreuve sportive sélectionnée
  sportValue = null
})

describe("EventList", () => {

  it("filtre les événements selon le sport sélectionné", () => {

    // Sélection de l'épreuve sportive "Natation"
    sportValue = sports[0]

    // Rendu du composant EventList
    render(<EventList events={mockEvents} seats={mockSeats} offers={mockOffers} />)

    // Vérification que seul l'événement sportif "Natation" est affiché
    expect(screen.getByText("Natation")).toBeInTheDocument()

    // Vérification que l'événement "Basketball" n'est pas affiché
    expect(screen.queryByText("Basketball")).not.toBeInTheDocument()
  })

  it("affiche tous les événements si aucun sport n'est sélectionné", () => {

    // Sélection de toutes les épreuves sportives
    sportValue = null

    // Rendu du composant EventList
    render(<EventList events={mockEvents} seats={mockSeats} offers={mockOffers} />)

    // Vérification que tous les événements sont affichés
    expect(screen.getByText("Natation")).toBeInTheDocument()
    expect(screen.getByText("Basketball")).toBeInTheDocument()
  })

  it("ouvre et ferme le tiroir d'un événement au clic", () => {

    // Sélection de l'épreuve sportive "Basketball"
    sportValue = sports[1]

    // Rendu du composant EventList
    render(<EventList events={mockEvents} seats={mockSeats} offers={mockOffers} />)

    // Clique sur le bouton d'ouverture du premier EventCard
    const btn = screen.getAllByText(/Afficher les compétitions/i)[0]
    fireEvent.click(btn)

    // Le tiroir doit être ouvert (présence d'une animation de chargement)
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)

    // Clique à nouveau pour fermer
    fireEvent.click(btn)

    // Le tiroir doit être fermé (absence de l'animation de chargement)
    expect(document.querySelectorAll('.animate-pulse').length).toBe(0)
    // Vérification que le texte "Aucune compétition disponible" n'est pas présent
    expect(screen.queryByText(/Aucune compétition disponible/i)).not.toBeInTheDocument()
  })

  it("ferme automatiquement le tiroir après 10 secondes", () => {

    // Utilisation de fake timers pour simuler le passage du temps
    jest.useFakeTimers()

    // Sélection de toutes les épreuves sportives
    sportValue = null

    // Rendu du composant EventList
    render(<EventList events={mockEvents} seats={mockSeats} offers={mockOffers} />)

    // Clique sur le bouton d'ouverture du premier EventCard
    const btn = screen.getAllByText(/Afficher les compétitions/i)[0]
    fireEvent.click(btn)

    // Le tiroir doit être ouvert (présence d'une animation de chargement)
    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0)

    // Avance le temps de 10 secondes
    act(() => {
      jest.advanceTimersByTime(10000)
    })

    // Le tiroir doit être fermé (absence de l'animation de chargement)
    expect(document.querySelectorAll('.animate-pulse').length).toBe(0)
    // Vérification que le texte "Aucune compétition disponible" n'est pas présent
    expect(screen.queryByText(/Aucune compétition disponible/i)).not.toBeInTheDocument()

    // Nettoyage
    jest.useRealTimers()
  })
})