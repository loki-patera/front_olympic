import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import { EventCard } from "../../../../../../app/components/sections/bookingSections/event/EventCard"
import * as api from "../../../../../../lib/api"
import { EventType, SportType } from "../../../../../../app/types"
import { CompetitionType, LocationType } from "../../../../../../app/types"
import { useState } from "react"

// Mock de l'API pour simuler la récupération des compétitions
jest.mock("../../../../../../lib/api")

const mockSport: SportType = {
  id_sport: 1,
  title: "Natation",
  image: "natation.jpg"
}

const mockLocation: LocationType = {
  id_location: 1,
  name: "Stade Aquatique",
  city: "Paris",
  total_seats: 200
}

const mockEvent: EventType = {
  id_event: 1,
  sport: mockSport,
  location: mockLocation,
  date: "2024-08-01",
  start_time: "10:00",
  end_time: "12:00",
  price: 50,
  available_seats: 120
}

const mockCompetitions: CompetitionType[] = [
  {
    id_competition: 1,
    description: "100m nage libre",
    gender: "Hommes",
    phase: "Finale",
    event: mockEvent
  },
  {
    id_competition: 2,
    description: "200m papillon",
    gender: "Femmes",
    phase: "Demi-finale",
    event: mockEvent
  }
]

describe("EventCard", () => {

  // Mock de la fonction onToggle pour simuler l'ouverture et la fermeture du tiroir
  const onToggle = jest.fn()

  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks()
  })

  it("affiche les informations principales de l'événement", () => {

    // Rendu du composant EventCard avec les props mockées
    render(
      <EventCard
        event={mockEvent}
        isOpen={false}
        onToggle={onToggle}
      />
    )

    // Vérification de la présence des informations de l'événement
    expect(screen.getByText("Natation")).toBeInTheDocument()
    expect(screen.getByText("Stade Aquatique (Paris)")).toBeInTheDocument()
    expect(screen.getByText(/Places disponibles/)).toHaveTextContent("120")
    expect(screen.getByText(/Prix/)).toHaveTextContent("50")
    expect(screen.getByText("Afficher les compétitions ▼")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Natation" })).toBeInTheDocument()
  })

  it("appelle onToggle lors du clic sur le texte d'ouverture", async () => {

    // Rendu du composant EventCard avec les props mockées
    render(
      <EventCard
        event={mockEvent}
        isOpen={false}
        onToggle={onToggle}
      />
    )

    // Simule un clic sur le texte pour ouvrir le tiroir
    await act(async () => {
      fireEvent.click(screen.getByText("Afficher les compétitions ▼"))
    })
    
    // Vérifie que la fonction onToggle a été appelée
    expect(onToggle).toHaveBeenCalled()
  })

  it("affiche le tiroir et les compétitions après ouverture", async () => {

    // Mock l'API pour retourner des compétitions
    (api.getCompetitionsByEvent as jest.Mock).mockResolvedValueOnce(mockCompetitions)

    // Gère l'état d'ouverture via un composant parent factice
    function Wrapper() {
      const [open, setOpen] = useState(false)
      return (
        <EventCard
          event={mockEvent}
          isOpen={open}
          onToggle={() => setOpen(o => !o)}
        />
      )
    }

    // Rendu du composant avec le wrapper
    render(<Wrapper />)

    // Ouvre le tiroir
    fireEvent.click(screen.getByText(/Afficher les compétitions/i))

    // Attend que les compétitions soient affichées
    await waitFor(() => {
      expect(screen.getByText("100m nage libre")).toBeInTheDocument()
      expect(screen.getByText("200m papillon")).toBeInTheDocument()
    })
  })

  it("affiche un message d'erreur si la récupération des compétitions échoue", async () => {

    // Mock l'API pour qu'elle rejette la promesse
    (api.getCompetitionsByEvent as jest.Mock).mockRejectedValueOnce(new Error("Erreur API"))
  
    // Gère l'état d'ouverture via un composant parent factice
    function Wrapper() {
      const [open, setOpen] = useState(false)
      return (
        <EventCard
          event={mockEvent}
          isOpen={open}
          onToggle={() => setOpen(o => !o)}
        />
      )
    }
  
    // Rendu du composant avec le wrapper
    render(<Wrapper />)
  
    // Ouvre le tiroir
    fireEvent.click(screen.getByText(/Afficher les compétitions/i))
  
    // Attend que le message d'erreur soit affiché
    await waitFor(() => {
      expect(screen.getByText("Erreur lors du chargement des compétitions.")).toBeInTheDocument()
    })
  })

  it("affiche le nombre de places en rouge si < 100", () => {

    // Simule un événement sportif avec moins de 100 places disponibles
    const event = { ...mockEvent, available_seats: 80 }

    // Rendu du composant EventCard avec les props mockées
    render(
      <EventCard
        event={event}
        isOpen={false}
        onToggle={onToggle}
      />
    )

    // Sélectionne le span contenant le nombre de places disponibles
    const span = screen.getByText("80")

    // Vérifie que le nombre de places est affiché en rouge
    expect(span).toHaveClass("text-red-500")
  })
})