import { render, screen, fireEvent } from '@testing-library/react'
import { SportSection } from '../../../../../app/components/sections/homeSection/SportSection'
import { useRouter } from 'next/navigation'
import { useSportStore } from '../../../../../app/stores'

// Mock de la fonction `useSportStore` pour simuler le store
jest.mock('../../../../../app/stores', () => ({
  useSportStore: jest.fn()
}))

// Mock de la fonction `setSport` pour simuler la mise à jour de l'épreuve sportive
const mockSetSport = jest.fn()

// Mock des données d'épreuves sportives
const sportsMock = [
  { id_sport: 1, title: 'Athlétisme', image: '/athletisme.jpg' },
  { id_sport: 2, title: 'Natation', image: '/natation.jpg' },
  { id_sport: 3, title: 'Basketball', image: '/basketball.jpg' }
]

describe("Composant SportSection", () => {

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.clearAllMocks()
  })

  it("filtre les épreuves sportives en fonction de la recherche", () => {

    // Rendu du composant `SportSection` avec les épreuves sportives mockées
    render(<SportSection sports={sportsMock} />)

    // Sélectionne le champ de recherche par son placeholder
    const input = screen.getByPlaceholderText("Entrez les premières lettres d'un sport ...")

    // Simule la saisie d'une valeur dans le champ de recherche
    fireEvent.change(input, { target: { value: 'Nat' } })

    // Vérifie que les épreuves sportives affichées correspondent à la recherche
    expect(screen.queryByText('Athlétisme')).not.toBeInTheDocument()
    expect(screen.getByText('Natation')).toBeInTheDocument()
    expect(screen.queryByText('Basketball')).not.toBeInTheDocument()
  })

  it("navigue vers la page de réservation lors du clic sur une épreuve sportive", () => {

    // Mock du store pour simuler la mise à jour de l'épreuve sportive sélectionnée
    ((useSportStore as unknown) as jest.Mock).mockImplementation(cb => cb({ setSport: mockSetSport }))

    // Mock de la fonction `router.push` pour simuler la navigation
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock, pathname: "/pages/booking" })

    // Rendu du composant `SportSection` avec les épreuves sportives mockées
    render(<SportSection sports={sportsMock} />)

    // Sélectionne l'image de l'épreuve sportive par son attribut alt
    const img = screen.getByAltText("Athlétisme")

    // Simule le clic sur l'image de l'épreuve sportive
    fireEvent.click(img)

    // Vérifie que la fonction `setSport` a été appelée avec le titre de l'épreuve sportive
    expect(mockSetSport).toHaveBeenCalledWith("Athlétisme")

    // Vérifie que la fonction `router.push` a été appelée avec le chemin "/pages/booking"
    expect(pushMock).toHaveBeenCalledWith("/pages/booking")
  })
})