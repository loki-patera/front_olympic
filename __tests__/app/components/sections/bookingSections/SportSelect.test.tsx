import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SportSelect } from '../../../../../app/components/sections/bookingSections/SportSelect'
import { SportStore, useSportStore } from '../../../../../app/stores'

// Mock de la fonction `useSportStore` pour simuler le store
jest.mock('../../../../../app/stores', () => ({
  useSportStore: jest.fn()
}))

// Mock des données d'épreuves sportives
const sportsMock = [
  { id_sport: 1, title: "Athlétisme", image: "athletisme.jpg" },
  { id_sport: 2, title: "Natation", image: "natation.jpg" },
  { id_sport: 3, title: "Basketball", image: "basketball.jpg" }
]

describe("Composant SportSelect", () => {

  let setSportMock: jest.Mock

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.clearAllMocks()

    // Mock de la fonction `setSport`
    setSportMock = jest.fn()
  })

  it("affiche 'Toutes les épreuves sportives' par défaut quand aucun sport n'est sélectionné", () => {

    // Mock du store pour simuler l'absence d'épreuve sportive sélectionnée
    ((useSportStore as unknown) as jest.Mock).mockImplementation((cb: (state: SportStore) => void) =>
      cb({ sport: null, setSport: setSportMock })
    )

    // Rendu du composant `SportSelect` avec les épreuves sportives mockées
    render(<SportSelect sports={sportsMock} />)

    // Vérification que le texte "Toutes les épreuves sportives" est affiché
    expect(screen.getByText("Toutes les épreuves sportives")).toBeInTheDocument()
  })

  it("affiche le sport sélectionné depuis le store", () => {

    // Mock du store pour simuler une épreuve sportive sélectionnée
    ((useSportStore as unknown) as jest.Mock).mockImplementation((cb: (state: SportStore) => void) =>
      cb({ sport: "Natation", setSport: setSportMock })
    )

    // Rendu du composant `SportSelect` avec les épreuves sportives mockées
    render(<SportSelect sports={sportsMock} />)

    // Utilisation de `getByRole` pour cibler le bouton de la liste déroulante
    const listboxButton = screen.getByRole("button", { name: /sélectionnez une épreuve sportive/i })

    // Vérification que le texte sélectionné est affiché dans le bouton de la liste déroulante
    expect(listboxButton).toHaveTextContent("Natation")
  })

  it("appelle `setSport` et met à jour l'état local lors d'un changement de sélection", async () => {

    // Mock du store pour simuler une épreuve sportive sélectionnée
    ((useSportStore as unknown) as jest.Mock).mockImplementation((cb: (state: SportStore) => void) =>
      cb({ sport: "Natation", setSport: setSportMock })
    )

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

    // Vérifie que `setSport` a été appelé avec "Basketball"
    expect(setSportMock).toHaveBeenCalledWith("Basketball")

    // Vérifie que le texte sélectionné est mis à jour dans la liste déroulante
    expect(listboxButton).toHaveTextContent("Basketball")
  })
})