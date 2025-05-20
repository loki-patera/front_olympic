import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SportSelect } from '../../../../../app/components/sections/bookingSections/SportSelect'
import { SportType } from '../../../../../app/types'

// Mock des données d'épreuves sportives
const sportsMock: SportType[] = [
  { id_sport: 1, title: "Athlétisme", image: "athletisme.jpg" },
  { id_sport: 2, title: "Natation", image: "natation.jpg" },
  { id_sport: 3, title: "Basketball", image: "basketball.jpg" }
]

// Mock de la fonction `setSport` du store Zustand
const setSportMock = jest.fn()
// Variable pour simuler l'épreuve sportive sélectionnée
let sportValue: SportType | null = null

// Mock du store Zustand pour simuler l'état de l'épreuve sportive sélectionnée
jest.mock('../../../../../app/stores', () => ({
  useSportStore: jest.fn((selector) => selector({ sport: sportValue, setSport: setSportMock }))
}))

afterEach(() => {
  // Réinitialisation des mocks après chaque test
  jest.clearAllMocks()
  // Réinitialisation du mock de la fonction `setSport`
  setSportMock.mockClear()
  // Réinitialisation de la valeur de l'épreuve sportive sélectionnée
  sportValue = null
})

describe('Composant SportSelect', () => {

  it("affiche 'Toutes les épreuves sportives' par défaut quand aucun sport n'est sélectionné", () => {

    // Simule l'absence d'épreuve sportive sélectionnée
    sportValue = null

    // Rendu du composant `SportSelect` avec les épreuves sportives mockées
    render(<SportSelect sports={sportsMock} />)

    // Vérification que le texte "Toutes les épreuves sportives" est affiché
    expect(screen.getByText("Toutes les épreuves sportives")).toBeInTheDocument()
  })

  it("affiche le sport sélectionné depuis le store", () => {

    // Simule une épreuve sportive sélectionnée
    sportValue = { id_sport: 2, title: "Natation", image: "natation.jpg" }

    // Rendu du composant `SportSelect` avec les épreuves sportives mockées
    render(<SportSelect sports={sportsMock} />)

    // Utilisation de `getByRole` pour cibler le bouton de la liste déroulante
    const listboxButton = screen.getByRole("button", { name: /sélectionnez une épreuve sportive/i })

    // Vérification que le texte sélectionné est affiché dans le bouton de la liste déroulante
    expect(listboxButton).toHaveTextContent("Natation")
  })

  it("appelle `setSport` et met à jour l'état local lors d'un changement de sélection", async () => {

    // Simule une épreuve sportive sélectionnée
    sportValue = { id_sport: 2, title: "Natation", image: "natation.jpg" }

    // Rendu du composant `SportSelect` avec les épreuves sportives mockées
    render(<SportSelect sports={sportsMock} />)

    // Simule un clic sur le bouton de la liste déroulante
    const listboxButton = screen.getByRole("button", { name: /sélectionnez une épreuve sportive/i })
    
    // Utilisation de userEvent pour simuler un vrai clic utilisateur
    const user = userEvent.setup()
    await user.click(listboxButton)

    // Vérifie que l'option "Basketball" est présente (la liste est donc ouverte)
    const option = await screen.findByText("Basketball")
    await user.click(option)

    // Vérifie que `setSport` a été appelé avec l'objet sport correspondant à "Basketball"
    expect(setSportMock).toHaveBeenCalledWith({ id_sport: 3, title: "Basketball", image: "basketball.jpg" })

    // Vérifie que le texte sélectionné est mis à jour dans la liste déroulante
    expect(listboxButton).toHaveTextContent("Basketball")
  })
})