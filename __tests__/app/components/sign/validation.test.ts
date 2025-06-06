import {
  validateEmail,
  validateFirstname,
  validateLastname,
  validateBirthDate,
  validateCountry,
  validatePassword,
  validateConfirmPassword
} from '../../../../app/components/sign/validation'

describe("validateEmail", () => {

  it("valide un email correct", () => {
    
    // Vérifie si l'email est correct
    expect(validateEmail("test@example.com")).toBe(true)
  })

  it("refuse un email invalide", () => {

    // Vérifie si l'email ne correspond pas aux critères
    expect(validateEmail("test@.com")).toBe(false)
    expect(validateEmail("test@com")).toBe(false)
    expect(validateEmail("test.com")).toBe(false)
    expect(validateEmail("test@exemple.com".repeat(10))).toBe(false) // trop long
  })
})

describe("validateFirstname", () => {

  it("valide un prénom correct", () => {

    // Vérifie si le prénom est correct
    expect(validateFirstname("Jean")).toBe(true)
    expect(validateFirstname("Élodie")).toBe(true)
    expect(validateFirstname("Jean-Pierre")).toBe(true)
  })

  it("refuse un prénom invalide", () => {

    // Vérifie si le prénom ne correspond pas aux critères
    expect(validateFirstname("jean")).toBe(false)
    expect(validateFirstname("J")).toBe(false)
    expect(validateFirstname("Jean-Pierre-")).toBe(false)
    expect(validateFirstname("")).toBe(false)
  })
})

describe("validateLastname", () => {

  it("valide un nom correct", () => {

    // Vérifie si le nom est correct
    expect(validateLastname("Dupont")).toBe(true)
    expect(validateLastname("Legrand")).toBe(true)
    expect(validateLastname("Martin-Durand")).toBe(true)
  })

  it("refuse un nom invalide", () => {

    // Vérifie si le nom ne correspond pas aux critères
    expect(validateLastname("dupont")).toBe(false)
    expect(validateLastname("D")).toBe(false)
    expect(validateLastname("Martin-")).toBe(false)
    expect(validateLastname("")).toBe(false)
  })
})

describe("validateBirthDate", () => {

  it("valide une date de naissance correcte (majeur)", () => {

    // Définit une date de naissance valide pour un majeur
    const date = new Date()
    date.setFullYear(date.getFullYear() - 20)
    const birth = date.toISOString().slice(0, 10)

    // Vérifie si la date de naissance est correcte
    expect(validateBirthDate(birth)).toBe(true)
  })

  it("refuse une date de naissance invalide ou mineur", () => {

    // Vérifie si la date de naissance ne correspond pas aux critères
    expect(validateBirthDate("2020-01-01")).toBe(false) // trop jeune
    expect(validateBirthDate("abcd-ef-gh")).toBe(false)
    expect(validateBirthDate("1999-13-01")).toBe(false)
  })
})

describe("validateCountry", () => {

  // Liste de pays valides pour les tests
  const countries = ["France", "Allemagne", "Espagne"]

  it("valide un pays présent dans la liste", () => {

    // Vérifie si le pays est dans la liste des pays valides
    expect(validateCountry("France", countries)).toBe(true)
  })

  it("refuse un pays absent de la liste", () => {

    // Vérifie si le pays n'est pas dans la liste des pays valides
    expect(validateCountry("Atlantide", countries)).toBe(false)
  })
})

describe("validatePassword", () => {

  it("valide un mot de passe fort et correct", () => {

    // Vérifie si le mot de passe est fort et respecte les critères
    expect(validatePassword("Abcdefghij!12345")).toBe(true)
  })

  it("refuse un mot de passe trop court ou faible", () => {

    // Vérifie si le mot de passe ne correspond pas aux critères
    expect(validatePassword("abc")).toBe(false)                 // trop court
    expect(validatePassword("Abcdefghij123456")).toBe(false)    // pas de caractère spécial
    expect(validatePassword("abcdefghij!12345")).toBe(false)    // pas de majuscule
    expect(validatePassword("ABCDEFGHIJ!12345")).toBe(false)    // pas de minuscule
    expect(validatePassword("Abcdefghij! 12345")).toBe(false)   // espace interdit
    expect(validatePassword("Abcdefghij!12345<")).toBe(false)   // caractère interdit
  })
})

describe("validateConfirmPassword", () => {

  it("valide si les deux mots de passe sont identiques", () => {

    // Vérifie si les deux mots de passe sont identiques
    expect(validateConfirmPassword("Abcdefghij!12345", "Abcdefghij!12345")).toBe(true)
  })

  it("refuse si les deux mots de passe sont différents", () => {

    // Vérifie si les deux mots de passe ne sont pas identiques
    expect(validateConfirmPassword("Abcdefghij!12345", "Abcdefghij!123456")).toBe(false)
  })
})