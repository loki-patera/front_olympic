import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignForm } from '../../../../app/components/sign/SignForm'
import * as api from '../../../../lib/api'

// Mock des fonctions API
jest.mock("../../../../lib/api", () => ({
  checkEmailExists: jest.fn(),
  registerUser: jest.fn()
}))

// Mock du composant CustomButton
jest.mock("../../../../app/components/shared/CustomButton", () => ({
  CustomButton: (props: any) => (
    <button {...props}>{props.label}</button>
  )
}))

// Mock des champs de formulaire
jest.mock("../../../../app/components/sign/fields", () => ({
  EmailField: (props: any) => (
    <input
      data-testid="email"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  ),
  FirstNameField: (props: any) => (
    <input
      data-testid="firstname"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  ),
  LastNameField: (props: any) => (
    <input
      data-testid="lastname"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  ),
  BirthDateField: (props: any) => (
    <input
      data-testid="birthdate"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  ),
  CountrySelect: (props: any) => (
    <select
      data-testid="country"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
      <option value="">Sélectionnez un pays</option>
      <option value="France">France</option>
    </select>
  ),
  PasswordField: (props: any) => (
    <input
      data-testid="password"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      type="password"
    />
  ),
  ConfirmPasswordField: (props: any) => (
    <input
      data-testid="confirmPassword"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      type="password"
    />
  ),
}))

// Nettoyage des mocks et du DOM après chaque test
afterEach(() => {
  jest.clearAllMocks()
  document.body.innerHTML = ""
})

const fillAccountForm = () => {
  fireEvent.change(screen.getByTestId("firstname"), { target: { value: "Jean" } })
  fireEvent.blur(screen.getByTestId("firstname"))
  fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Dupont" } })
  fireEvent.blur(screen.getByTestId("lastname"))
  fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2000-01-01" } })
  fireEvent.blur(screen.getByTestId("birthdate"))
  fireEvent.change(screen.getByTestId("country"), { target: { value: "France" } })
  fireEvent.blur(screen.getByTestId("country"))
}

const fillPasswordForm = () => {
  fireEvent.change(screen.getByTestId("password"), { target: { value: "Abcdefghij!12345" } })
  fireEvent.blur(screen.getByTestId("password"))
  fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "Abcdefghij!12345" } })
  fireEvent.blur(screen.getByTestId("confirmPassword"))
}

describe("SignForm", () => {

  it("affiche un message de succès après inscription", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)

    // Simule la réponse de l'API pour l'inscription réussie
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({ success: true })

    // Rendu du composant SignForm
    render(<SignForm />)

    // Simule la saisie d'un nouvel email
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })

    // Simule la perte de focus sur le champ email
    fireEvent.blur(screen.getByTestId("email"))

    // Simule le clic sur le bouton "Continuer"
    fireEvent.click(screen.getByText(/Continuer/i))

    // Vérifie que le message d'erreur est affiché pour un email inconnu
    await waitFor(() => {
      expect(screen.getByText(/Email inconnu/i)).toBeInTheDocument()
    })

    // Simule le clic sur le bouton "Créer un nouveau compte"
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

    // Simule la saisie des informations du formulaire de création de compte
    fillAccountForm()

    // Simule le clic sur le bouton "Continuer"
    fireEvent.click(screen.getByText(/Continuer/i))

    // Passe à l'étape mot de passe
    await waitFor(() => {
      expect(screen.getByTestId("password")).toBeInTheDocument()
    })

    // Simule la saisie des mots de passe
    fillPasswordForm()

    // Simule le clic sur le bouton "Confirmer l'inscription"
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))

    // Vérifie que le message de succès est affiché
    await waitFor(() => {
      expect(screen.getByText(/Inscription réussie/i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur globale si la vérification de l'email échoue", async () => {

    // Simule une erreur lors de l'appel à checkEmailExists
    (api.checkEmailExists as jest.Mock).mockRejectedValueOnce(new Error('Erreur réseau'))

    // Rendu du composant SignForm
    render(<SignForm />)

    // Saisie d'un email valide
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@email.com' } })
    fireEvent.blur(screen.getByTestId('email'))

    // Soumission du formulaire
    fireEvent.click(screen.getByText(/Continuer/i))

    // Vérifie que le message d'erreur global est affiché
    await waitFor(() => {
      expect(screen.getByText(/Erreur technique lors de la vérification de l'email/i)).toBeInTheDocument()
    })
  })

  it.each([
    ["email", { email: ["Email invalide"] }, /Email invalide/i, "email", "valid1@email.com", "invalid@email", "valid@email.com"],
    ["firstname", { firstname: ["Prénom invalide"] }, /Prénom invalide/i, "firstname", "Jean-Yves", "J", "Jean"],
    ["lastname", { lastname: ["Nom invalide"] }, /Nom invalide/i, "lastname", "Dupond", "D", "Dupont"],
    ["date_of_birth", { date_of_birth: ["Date invalide"] }, /Date invalide/i, "birthdate", "2005-01-01", "2020-01-01", "2000-01-01"],
    ["country", { country: ["Pays invalide"] }, /Pays invalide/i, "country", "France", "Atlantide", "France"],
  ])(
    "affiche une erreur de validation si l'API retourne une erreur sur le champ %s",
    async (field, apiError, errorRegex, testId, invalidValue, invalidValue2, validValue) => {

      // Simule une réponse de l'API indiquant que l'email n'existe pas
      (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)

      // Simule une erreur sur le champ spécifié renvoyée par l'API
      ;(api.registerUser as jest.Mock).mockResolvedValueOnce({ success: false, errors: apiError })

      // Rendu du composant SignForm
      render(<SignForm />)

      // Saisie d'un email inconnu
      fireEvent.change(screen.getByTestId("email"), { target: { value: "new1@email.com" } })
      // Simule la perte de focus sur le champ email
      fireEvent.blur(screen.getByTestId("email"))
      // Simule le clic sur le bouton "Continuer"
      fireEvent.click(screen.getByText(/Continuer/i))
      // Passe à la création de compte
      await waitFor(() => expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument())
      // Simule le clic sur le bouton "Créer un nouveau compte"
      fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

      // Rempli tous les champs avec des valeurs valides sauf le champ testé
      fireEvent.change(screen.getByTestId("firstname"), { target: { value: testId === "firstname" ? invalidValue : "Jean" } })
      fireEvent.blur(screen.getByTestId("firstname"))
      fireEvent.change(screen.getByTestId("lastname"), { target: { value: testId === "lastname" ? invalidValue : "Dupont" } })
      fireEvent.blur(screen.getByTestId("lastname"))
      fireEvent.change(screen.getByTestId("birthdate"), { target: { value: testId === "birthdate" ? invalidValue : "2000-01-01" } })
      fireEvent.blur(screen.getByTestId("birthdate"))
      fireEvent.change(screen.getByTestId("country"), { target: { value: testId === "country" ? invalidValue : "France" } })
      fireEvent.blur(screen.getByTestId("country"))
      // Simule le clic sur le bouton "Continuer"
      fireEvent.click(screen.getByText(/Continuer/i))

      // Passe à l'étape mot de passe
      await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
      // Simule la saisie des mots de passe
      fillPasswordForm()
      // Soumission du formulaire d'inscription
      fireEvent.click(screen.getByText(/Confirmer l'inscription/i))

      // Vérifie que le message d'erreur est affiché
      await waitFor(() => {
        expect(screen.getByText(errorRegex)).toBeInTheDocument()
      })

      // Corrige le champ avec une valeur toujours invalide
      fireEvent.change(screen.getByTestId(testId), { target: { value: invalidValue2 } })
      fireEvent.blur(screen.getByTestId(testId))

      // Vérifie que l'erreur est toujours affichée
      await waitFor(() => {
        expect(screen.getByText(errorRegex)).toBeInTheDocument()
      })

      // Corrige le champ avec une valeur valide
      fireEvent.change(screen.getByTestId(testId), { target: { value: validValue } })
      fireEvent.blur(screen.getByTestId(testId))

      // Vérifie que l'erreur disparaît
      await waitFor(() => {
        expect(screen.queryByText(errorRegex)).not.toBeInTheDocument()
      })
    }
  )

  it("affiche une erreur de validation si l'API retourne une erreur sur le champ password et la retire après correction", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
    // Simule une erreur API sur le champ password
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { password: "Mot de passe invalide" }
    })

    // Rendu du composant SignForm
    render(<SignForm />)

    // Saisie d'un email inconnu
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new1@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument())
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

    // Simule la saisie des informations du formulaire de création de compte
    fillAccountForm()
    // Simule le clic sur le bouton "Continuer"
    fireEvent.click(screen.getByText(/Continuer/i))

    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())

    // Simule la saisie des mots de passe
    fillPasswordForm()
    // Soumission du formulaire d'inscription
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))

    // Vérifie que le message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText(/Mot de passe invalide/i)).toBeInTheDocument()
    })

    // Corrige le mot de passe avec une valeur toujours invalide
    fireEvent.change(screen.getByTestId("password"), { target: { value: "123" } })
    fireEvent.blur(screen.getByTestId("password"))
    fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "123" } })
    fireEvent.blur(screen.getByTestId("confirmPassword"))

    // L'erreur doit toujours être affichée (car la valeur est toujours invalide)
    await waitFor(() => {
      expect(screen.getByText(/Mot de passe invalide/i)).toBeInTheDocument()
    })

    // Corrige le mot de passe avec une valeur valide
    fireEvent.change(screen.getByTestId("password"), { target: { value: "Abcdefghij!12345" } })
    fireEvent.blur(screen.getByTestId("password"))
    fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "Abcdefghij!12345" } })
    fireEvent.blur(screen.getByTestId("confirmPassword"))

    // L'erreur doit disparaître
    await waitFor(() => {
      expect(screen.queryByText(/Mot de passe invalide/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur globale et réinitialise l'étape si une erreur technique survient lors de l'inscription", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
    // Simule une erreur technique lors de l'inscription
    ;(api.registerUser as jest.Mock).mockRejectedValueOnce(new Error("Erreur serveur"))
  
    // Rendu du composant SignForm
    render(<SignForm />)
  
    // Saisie d'un email inconnu
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à la création de compte
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Simule la saisie des informations du formulaire de création de compte
    fillAccountForm()

    // Simule le clic sur le bouton "Continuer"
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => {
      expect(screen.getByTestId("password")).toBeInTheDocument()
    })
  
    // Simule la saisie des mots de passe
    fillPasswordForm()
  
    // Soumission du formulaire d'inscription
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))
  
    // Vérifie que le message d'erreur global est affiché et qu'on revient à l'étape de connexion
    await waitFor(() => {
      expect(screen.getByText(/L'inscription a échoué suite à un problème technique/i)).toBeInTheDocument()
      // On doit être revenu à l'étape de connexion (titre du formulaire)
      expect(screen.getByText(/Connectez-vous ou créez un compte/i)).toBeInTheDocument()
    })
  })
})