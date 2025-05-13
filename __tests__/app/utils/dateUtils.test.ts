import { formatDate, formatTime } from '../../../app/utils/dateUtils'

describe("formatDate", () => {

  it("formate une date valide au format 'jour mois année'", () => {

    // Simule une date pour le test
    const result = formatDate("2023-10-25")

    // Vérifie que la date est formatée correctement
    expect(result).toBe("25 octobre 2023")
  })
})


describe('formatTime', () => {

  it("formate une heure valide au format '00h00'", () => {

    // Simule une heure pour le test
    const result = formatTime("14:30:00")

    // Vérifie que l'heure est formatée correctement
    expect(result).toBe("14h30")
  })
})