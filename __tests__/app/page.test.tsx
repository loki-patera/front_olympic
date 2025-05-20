import Home from '../../app/page'
import { getSports } from '../../lib/api'
import { SportType } from '../../app/types'

// Mock de la fonction `getSports`
jest.mock('../../lib/api', () => ({
  getSports: jest.fn()
}))

describe("Page d'accueil", () => {

  it("devrait appeler getSports et récupérer les données des épreuves sportives", async () => {

    // Données simulées pour le mock
    const mockSports: SportType[] = [
      { id_sport: 1, title: 'Basketball', image: 'basketball.jpg' },
      { id_sport: 2, title: 'Football', image: 'football.jpg' }
    ];

    // Configuration du mock pour retourner les données simulées
    (getSports as jest.Mock).mockResolvedValue(mockSports)

    // Appel de la fonction `Home`
    await Home()

    // Vérification que `getSports` a été appelé
    expect(getSports).toHaveBeenCalledTimes(1)

    // Vérification que les données retournées sont correctes
    expect(getSports).toHaveReturnedWith(Promise.resolve(mockSports))
  })

  it('exporte la constante revalidate à 60', () => {

    // Importation du module de la page
    const pageModule = require('../../app/page')

    // Vérification que la constante revalidate est bien définie et égale à 60
    expect(pageModule.revalidate).toBe(60)
  })
})