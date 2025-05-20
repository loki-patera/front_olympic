import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EventCard } from "../../../../../../../app/components/sections/bookingSections/eventSection/card/EventCard"
import * as api from "../../../../../../../lib/api"
import { CompetitionType, EventType, LocationType, OfferType, SportType } from "../../../../../../../app/types"
import { useState } from "react"

// Mock de l'API pour simuler la récupération des compétitions
jest.mock("../../../../../../../lib/api")

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
  price: 50.00,
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
const mockOffers: OfferType[] = [
  { id_offer: 1, type: "duo - 2 adultes", number_seats: 2, discount: 0 },
  { id_offer: 2, type: "duo - 1 adulte / 1 enfant", number_seats: 2, discount: 5 },
  { id_offer: 3, type: "famille", number_seats: 4, discount: 10 }
]
const mockSeats: OfferType[] = [
  mockOffers[0],
  mockOffers[2]
]

describe("EventCard", () => {

  // Mock de la fonction onToggle pour simuler l'ouverture et la fermeture du tiroir
  const onToggle = jest.fn()

  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    jest.clearAllMocks()
  })

  it("appelle onToggle lors du clic sur le texte d'ouverture", async () => {

    // Rendu du composant EventCard avec les props
    render(
      <EventCard
        event={mockEvent}
        isOpen={false}
        onToggle={onToggle}
        seats={mockSeats}
        offers={mockOffers}
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
          seats={mockSeats}
          offers={mockOffers}
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
          seats={mockSeats}
          offers={mockOffers}
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

  it("revient en face avant quand on clique sur le bouton Retour", async () => {

    // Rendu du composant EventCard avec les props
    render(
      <EventCard
        event={mockEvent}
        isOpen={false}
        onToggle={onToggle}
        seats={mockSeats}
        offers={mockOffers}
      />
    )
  
    // Ouvre la face arrière de la carte
    fireEvent.click(screen.getByRole("button", { name: "Voir les offres" }))
    const card = screen.getByTestId("event-card-1")
    const flipContainer = card.querySelector('.w-full.h-full.transition-transform')

    // Vérifie que la carte est bien retournée
    expect(flipContainer?.className).toContain('rotate-x-180')

    // Clique sur le bouton Retour
    fireEvent.click(screen.getByRole("button", { name: "Retour" }))

    // Vérifie que la carte n'est plus retournée (face avant)
    await waitFor(() => {
      expect(flipContainer?.className).not.toContain('rotate-x-180')
    })
  })

  it("ferme la face arrière de la carte lors d'un clic extérieur", async () => {

    // Ajout un élément extérieur au DOM
    const outside = document.createElement('div')
    outside.setAttribute('data-testid', 'outside')
    document.body.appendChild(outside)
  
    // Rendu du composant EventCard avec les props
    render(
      <EventCard
        event={mockEvent}
        isOpen={false}
        onToggle={onToggle}
        seats={mockSeats}
        offers={mockOffers}
      />
    )
  
    // Ouvre la face arrière de la carte
    fireEvent.click(screen.getByRole("button", { name: "Voir les offres" }))
    const card = screen.getByTestId("event-card-1")
    const flipContainer = card.querySelector('.w-full.h-full.transition-transform')
  
    // Vérifie que la carte est bien retournée
    expect(flipContainer?.className).toContain('rotate-x-180')
  
    // Simule un clic extérieur
    fireEvent.mouseDown(outside)
  
    // Vérifie que la carte revient en face avant
    await waitFor(() => {
      expect(flipContainer?.className).not.toContain('rotate-x-180')
    })
  
    // Nettoie l'élément extérieur
    document.body.removeChild(outside)
  })

  it("calcule correctement le sous-total, la réduction et le total lors de la sélection des places et de l'offre", async () => {

    // Utilisation de userEvent pour simuler les interactions utilisateur
    const user = userEvent.setup()
    
    // Rendu du composant EventCard avec les props
    render(
      <EventCard
        event={mockEvent}
        isOpen={false}
        onToggle={onToggle}
        seats={mockSeats}
        offers={mockOffers}
      />
    )
  
    // Ouvre la face arrière de la carte
    fireEvent.click(screen.getByRole("button", { name: "Voir les offres" }))
  

    // Ouvre la liste déroulante pour sélectionner le nombre de places
    const seatSelect = screen.getByRole("button", { name: /Sélectionnez le nombre de places/i })
    
    // Simule un clic sur le bouton de la liste déroulante
    await user.click(seatSelect)

    // Récupère toutes les options
    const seatOptions = await screen.findAllByRole("option")

    // Trouve le parent qui a le rôle "option"
    const option4 = seatOptions.find(opt => opt.textContent?.trim() === "4")
    
    // Vérifie que l'option existe
    expect(option4).toBeDefined()

    // Simule un clic sur l'option
    await user.click(option4!)


    // Ouvre la liste déroulante pour sélectionner l'offre
    const offreSelect = screen.getByRole("button", { name: /Sélectionnez une offre/i })

    // Simule un clic sur le bouton de la liste déroulante
    await user.click(offreSelect)

    // Récupère toutes les options
    const offreOptions = await screen.findAllByRole("option")

    // Trouve l'option "famille"
    const familleOption = offreOptions.find(opt => opt.textContent?.toLowerCase().includes("famille"))

    // Vérifie que l'option existe
    expect(familleOption).toBeDefined()

    // Simule un clic sur l'option
    await user.click(familleOption!)
  

    // Vérifie les montants affichés
    await waitFor(() => {
      // Sous-total : 4 * 50 = 200 €
      expect(screen.getByText(/Sous-total →/)).toHaveTextContent("200.00 €")
      // Réduction : 10 %
      expect(screen.getByText(/Réduction →/)).toHaveTextContent("10 %")
      // Total : 200 - 20 = 180 €
      expect(screen.getByText(/Prix total →/)).toHaveTextContent("180.00 €")
    })
  })
})