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

  it("retourne undefined pour un email valide", () => {

    // Vérifie si l'email est correct
    expect(validateEmail('test@example.com')).toBeUndefined()
  })

  it("retourne une erreur si l'email est trop court", () => {

    // Vérifie si l'email contient moins de 6 caractères
    expect(validateEmail('a@b.c')).toEqual({
      message: "L'email doit contenir au moins 6 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si l'email est trop long", () => {

    const longEmail = 'a'.repeat(101) + '@example.com'

    // Vérifie si l'email dépasse 100 caractères
    expect(validateEmail(longEmail)).toEqual({
      message: "L'email ne peut pas dépasser 100 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si l'email est au mauvais format", () => {

    // Vérifie si l'email ne correspond pas au format requis
    expect(validateEmail('test@.com')).toEqual({
      message: "L'email doit contenir au minimum un caractère avant et après le @, suivi d'un point et de 2 caractères minimum.",
      type: "warning"
    })
  })
})

describe("validateFirstname", () => {

  it("retourne undefined pour un prénom valide", () => {

    // Vérifie si le prénom est correct
    expect(validateFirstname('Jean')).toBeUndefined()
    expect(validateFirstname('Jean-Pierre')).toBeUndefined()
  })

  it("retourne une erreur si le prénom est trop court", () => {

    // Vérifie si le prénom contient moins de 2 caractères
    expect(validateFirstname('J')).toEqual({
      message: "Le prénom doit contenir au moins 2 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le prénom est trop long", () => {

    const longFirstname = 'A'.repeat(51)

    // Vérifie si le prénom dépasse 50 caractères
    expect(validateFirstname(longFirstname)).toEqual({
      message: "Le prénom ne peut pas dépasser 50 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le prénom est au mauvais format", () => {

    // Vérifie si le prénom ne correspond pas au format requis
    expect(validateFirstname('jean')).toEqual({
      message: "Le prénom doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les prénoms composés.",
      type: "warning"
    })
    expect(validateFirstname('Jean-')).toEqual({
      message: "Le prénom doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les prénoms composés.",
      type: "warning"
    })
    expect(validateFirstname('Jean Pierre')).toEqual({
      message: "Le prénom doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les prénoms composés.",
      type: "warning"
    })
    expect(validateFirstname('Jean3')).toEqual({
      message: "Le prénom doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les prénoms composés.",
      type: "warning"
    })
  })
})

describe("validateLastname", () => {

  it("retourne undefined pour un nom valide", () => {

    // Vérifie si le nom est correct
    expect(validateLastname('Dupont')).toBeUndefined()
    expect(validateLastname('Martin-Durand')).toBeUndefined()
  })

  it("retourne une erreur si le nom est trop court", () => {

    // Vérifie si le nom contient moins de 2 caractères
    expect(validateLastname('D')).toEqual({
      message: "Le nom de famille doit contenir au moins 2 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le nom est trop long", () => {

    const longLastname = 'A'.repeat(51)

    // Vérifie si le nom dépasse 50 caractères
    expect(validateLastname(longLastname)).toEqual({
      message: "Le nom de famille ne peut pas dépasser 50 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le nom est au mauvais format", () => {

    // Vérifie si le nom ne correspond pas au format requis
    expect(validateLastname('dupont')).toEqual({
      message: "Le nom de famille doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les noms composés.",
      type: "warning"
    })
    expect(validateLastname('Martin-')).toEqual({
      message: "Le nom de famille doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les noms composés.",
      type: "warning"
    })
    expect(validateLastname('Martin Durand')).toEqual({
      message: "Le nom de famille doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les noms composés.",
      type: "warning"
    })
    expect(validateLastname('Martin3')).toEqual({
      message: "Le nom de famille doit commencer par une majuscule, ne contenir que des lettres et peut comprendre des tirets dans les noms composés.",
      type: "warning"
    })
  })
})

describe("validateBirthDate", () => {

  it("retourne undefined pour une date de naissance valide (majeur)", () => {

    // Définit une date de naissance valide pour un majeur
    const date = new Date()
    date.setFullYear(date.getFullYear() - 20)
    const birth = date.toISOString().slice(0, 10)

    // Vérifie si la date de naissance est correcte
    expect(validateBirthDate(birth)).toBeUndefined()
  })

  it("retourne une erreur si la date est au mauvais format", () => {

    // Vérifie si la date de naissance ne correspond pas au format requis
    expect(validateBirthDate('1999-13-01')).toEqual({
      message: "La date de naissance n'est pas conforme.",
      type: "warning"
    })
  })

  it("retourne une erreur si la date est trop récente (mineur)", () => {

    // Définit une date de naissance trop récente pour un mineur
    const date = new Date()
    date.setFullYear(date.getFullYear() - 10)
    const birth = date.toISOString().slice(0, 10)

    // Vérifie si la date de naissance est trop récente
    expect(validateBirthDate(birth)).toEqual({
      message: "Vous devez avoir au moins 18 ans pour créer un compte.",
      type: "warning"
    })
  })
})

describe("validateCountry", () => {

  // Liste de pays valides pour les tests
  const countries = ["France", "Allemagne", "Espagne"]

  it("retourne undefined pour un pays valide", () => {

    // Vérifie si le pays est dans la liste des pays valides
    expect(validateCountry("France", countries)).toBeUndefined()
  })

  it("retourne une erreur si le pays dépasse 75 caractères", () => {

    const longCountry = 'A'.repeat(76)

    // Vérifie si le pays dépasse 75 caractères
    expect(validateCountry(longCountry, countries)).toEqual({
      message: "Le pays ne peut pas dépasser 75 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le pays n'est pas dans la liste", () => {

    // Vérifie si le pays n'est pas dans la liste des pays valides
    expect(validateCountry("Atlantide", countries)).toEqual({
      message: "Ce pays ne fait pas partie de la liste des pays autorisés.",
      type: "warning"
    })
  })
})

describe("validatePassword", () => {

  it("retourne undefined pour un mot de passe fort et valide", () => {

    // Vérifie si le mot de passe est fort et respecte les critères
    expect(validatePassword('MotDePasseSûr#2024')).toBeUndefined()
  })

  it("retourne une erreur si le mot de passe est trop court", () => {

    // Vérifie si le mot de passe contient moins de 16 caractères
    expect(validatePassword('Abc!123')).toEqual({
      message: "Le mot de passe doit contenir au moins 16 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le mot de passe est trop long", () => {

    const longPassword = 'A'.repeat(129) + 'a1!'

    // Vérifie si le mot de passe dépasse 128 caractères
    expect(validatePassword(longPassword)).toEqual({
      message: "Le mot de passe ne peut pas dépasser 128 caractères.",
      type: "warning"
    })
  })

  it("retourne une erreur si le mot de passe contient des caractères interdits", () => {

    // Vérifie si le mot de passe contient des caractères interdits
    expect(validatePassword('Abcdefghij!12345<')).toEqual({
      message: "Des caractères interdits sont présents dans le mot de passe.",
      type: "warning"
    })
  })

  it("retourne une erreur si le mot de passe ne contient pas de majuscule", () => {

    // Vérifie si le mot de passe ne correspond pas au format requis
    expect(validatePassword('abcdefghij!12345')).toEqual({
      message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      type: "warning"
    })
    expect(validatePassword('ABCDEFGHIJ!12345')).toEqual({
      message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      type: "warning"
    })
    expect(validatePassword('Abcdefghij!abcdef')).toEqual({
      message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      type: "warning"
    })
    expect(validatePassword('Abcdefghij123456')).toEqual({
      message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      type: "warning"
    })
    expect(validatePassword('Abcdefghij !1234')).toEqual({
      message: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.",
      type: "warning"
    })
  })
})

describe("validateConfirmPassword", () => {

  it("retourne undefined si les deux mots de passe sont identiques", () => {

    // Vérifie si les deux mots de passe sont identiques
    expect(validateConfirmPassword("Abcdefghij!12345", "Abcdefghij!12345")).toBeUndefined()
  })

  it("retourne une erreur si les deux mots de passe sont différents", () => {

    // Vérifie si les deux mots de passe sont différents
    expect(validateConfirmPassword('MotDePasseSûr#2024', 'MotDePasseSûr#2025')).toEqual({
      message: "Le second mot de passe doit correspondre au mot de passe principal.",
      type: "warning"
    })
  })
})