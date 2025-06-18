import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignForm } from '../../../../app/components/sign/SignForm'
import * as api from '../../../../lib/api'
import { UserProvider } from '../../../../app/context'

const renderWithUserProvider = (ui: React.ReactElement) => render(<UserProvider>{ui}</UserProvider>)

// Mock des fonctions API
jest.mock("../../../../lib/api", () => ({
  checkEmailExists: jest.fn(),
  registerUser: jest.fn(),
  getMe: jest.fn(),
  loginUser: jest.fn()
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
      <option value="Géorgie du Sud-et-les Îles Sandwich du Sud">Géorgie du Sud-et-les Îles Sandwich du Sud</option>
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
    renderWithUserProvider(<SignForm />)

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
    renderWithUserProvider(<SignForm />)

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

  it("affiche une erreur de validation frontend sur le champ email", async () => {

    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email invalide
    fireEvent.change(screen.getByTestId("email"), { target: { value: "a@b.c" } })
    fireEvent.blur(screen.getByTestId("email"))
  
    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/L'email doit contenir au moins 6 caractères./i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation frontend sur le champ prénom", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie d'un prénom invalide
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "J" } })
    fireEvent.blur(screen.getByTestId("firstname"))

    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Le prénom doit contenir au moins 2 caractères\./i)).toBeInTheDocument()
    })

    // Vérifie que le bouton "Continuer" est désactivé
    expect(screen.getByText(/Continuer/i)).toBeDisabled()
  })

  it("affiche une erreur de validation frontend sur le champ nom", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie d'un nom invalide
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "D" } })
    fireEvent.blur(screen.getByTestId("lastname"))
  
    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Le nom de famille doit contenir au moins 2 caractères\./i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation frontend sur le champ date de naissance", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

    // Saisie d'une date de naissance invalide
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2024-01-01" } })
    fireEvent.blur(screen.getByTestId("birthdate"))

    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Vous devez avoir au moins 18 ans pour créer un compte\./i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation frontend sur le champ pays", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

    // Saisie d'un pays invalide
    fireEvent.change(screen.getByTestId("country"), { target: { value: "Atlantide" } })
    fireEvent.blur(screen.getByTestId("country"))

    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Ce pays ne fait pas partie de la liste des pays autorisés\./i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation frontend sur le champ mot de passe", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie des informations du formulaire de création de compte
    fillAccountForm()
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
  
    // Saisie d'un mot de passe invalide
    fireEvent.change(screen.getByTestId("password"), { target: { value: "abc" } })
    fireEvent.blur(screen.getByTestId("password"))
  
    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Le mot de passe doit contenir au moins 16 caractères\./i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation frontend sur le champ confirmation du mot de passe", async () => {

    // Simule la réponse de l'API pour un email inconnu
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie des informations du formulaire de création de compte
    fillAccountForm()
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
  
    // Saisie d'un mot de passe invalide
    fireEvent.change(screen.getByTestId("password"), { target: { value: "Abcdefg!01234567" } })
    fireEvent.blur(screen.getByTestId("password"))
    fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "Abcdefg 01234567" } })
    fireEvent.blur(screen.getByTestId("confirmPassword"))

    // Vérifie que l'erreur frontend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Le second mot de passe doit correspondre au mot de passe principal\./i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation backend sur le champ email", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)

    // Simule une erreur backend sur le champ email
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { email: ["Format de l'email invalide !"] }
    })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu
    fireEvent.change(screen.getByTestId("email"), { target: { value: "email.invalid@back.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))

    // Passe à la création de compte
    await waitFor(() => expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument())
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Simule la saisie des informations du formulaire de création de compte
    fillAccountForm()
    fireEvent.click(screen.getByText(/Continuer/i))

    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
    fillPasswordForm()
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))
  
    // Vérifie que l'erreur backend est affichée
    await waitFor(() => {
      expect(screen.getByText(/Format de l'email invalide !/i)).toBeInTheDocument()
    })

    // Saisie d'un email valide
    fireEvent.change(screen.getByTestId("email"), { target: { value: "valid@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
  
    // Vérifie que l'erreur disparaît
    await waitFor(() => {
      expect(screen.queryByText(/Format de l'email invalide !/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation backend sur le champ prénom", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Simule une erreur backend sur le champ firstname
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { firstname: ["Format du prénom invalide !"] }
    })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie des informations du formulaire de création de compte avec un prénom invalide
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "Prénominvalide" } }) // prénom invalide pour le backend
    fireEvent.blur(screen.getByTestId("firstname"))
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Dupont" } })
    fireEvent.blur(screen.getByTestId("lastname"))
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2000-01-01" } })
    fireEvent.blur(screen.getByTestId("birthdate"))
    fireEvent.change(screen.getByTestId("country"), { target: { value: "France" } })
    fireEvent.blur(screen.getByTestId("country"))
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
    fillPasswordForm()
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))
  
    // Vérifie que l'erreur backend sur le prénom est affichée
    await waitFor(() => {
      expect(screen.getByText(/Format du prénom invalide !/i)).toBeInTheDocument()
    })

    // Saisie d'un prénom valide
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "Jean-Pierre" } })
    fireEvent.blur(screen.getByTestId("firstname"))
  
    // Vérifie que l'erreur disparaît
    await waitFor(() => {
      expect(screen.queryByText(/Format du prénom invalide !/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation backend sur le champ nom", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Simule une erreur backend sur le champ lastname
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { lastname: ["Format du nom de famille invalide !"] }
    })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie des informations du formulaire de création de compte avec un nom invalide
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "Pierre" } })
    fireEvent.blur(screen.getByTestId("firstname"))
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Nominvalide" } }) // nom invalide pour le backend
    fireEvent.blur(screen.getByTestId("lastname"))
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2000-01-01" } })
    fireEvent.blur(screen.getByTestId("birthdate"))
    fireEvent.change(screen.getByTestId("country"), { target: { value: "France" } })
    fireEvent.blur(screen.getByTestId("country"))
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
    fillPasswordForm()
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))
  
    // Vérifie que l'erreur backend sur le nom est affichée
    await waitFor(() => {
      expect(screen.getByText(/Format du nom de famille invalide !/i)).toBeInTheDocument()
    })

    // Saisie d'un prénom valide
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Dupond" } })
    fireEvent.blur(screen.getByTestId("lastname"))
  
    // Vérifie que l'erreur disparaît
    await waitFor(() => {
      expect(screen.queryByText(/Format du nom de famille invalide !/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation backend sur le champ date de naissance", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Simule une erreur backend sur le champ birthdate
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { date_of_birth: ["Vous devez être majeur pour vous inscrire !"] }
    })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

    // Saisie des informations du formulaire de création de compte avec une date de naissance invalide
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "Jean" } })
    fireEvent.blur(screen.getByTestId("firstname"))
    fireEvent.change(screen.getByTestId("lastname"), { target: { value: "Dupont" } })
    fireEvent.blur(screen.getByTestId("lastname"))
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2007-06-15" } }) // date de naissance invalide pour le backend
    fireEvent.blur(screen.getByTestId("birthdate"))
    fireEvent.change(screen.getByTestId("country"), { target: { value: "France" } })
    fireEvent.blur(screen.getByTestId("country"))
    fireEvent.click(screen.getByText(/Continuer/i))

    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
    fillPasswordForm()
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))

    // Vérifie que l'erreur backend sur la date de naissance est affichée
    await waitFor(() => {
      expect(screen.getByText(/Vous devez être majeur pour vous inscrire !/i)).toBeInTheDocument()
    })

    // Saisie d'une date de naissance valide
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2000-01-01" } })
    fireEvent.blur(screen.getByTestId("birthdate"))

    // Vérifie que l'erreur disparaît
    await waitFor(() => {
      expect(screen.queryByText(/Vous devez être majeur pour vous inscrire !/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation backend sur le champ pays", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Simule une erreur backend sur le champ country
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { country: ["Pays invalide !"] }
    })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))

    // Saisie des informations du formulaire de création de compte avec un pays invalide
    fireEvent.change(screen.getByTestId("firstname"), { target: { value: "Jean" } })
    fireEvent.blur(screen.getByTestId("firstname"))
    fireEvent.change(screen.getByTestId("lastname"), {target: { value: "Dupont" } })
    fireEvent.blur(screen.getByTestId("lastname"))
    fireEvent.change(screen.getByTestId("birthdate"), { target: { value: "2000-01-01" } })
    fireEvent.blur(screen.getByTestId("birthdate"))
    fireEvent.change(screen.getByTestId("country"), { target: { value: "Géorgie du Sud-et-les Îles Sandwich du Sud" } })  // pays invalide pour le backend
    fireEvent.blur(screen.getByTestId("country"))
    fireEvent.click(screen.getByText(/Continuer/i))

    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
    fillPasswordForm()
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))

    // Vérifie que l'erreur backend sur le pays est affichée
    await waitFor(() => {
      expect(screen.getByText(/Pays invalide !/i)).toBeInTheDocument()
    })

    // Saisie d'un pays valide
    fireEvent.change(screen.getByTestId("country"), { target: { value: "France" } })
    fireEvent.blur(screen.getByTestId("country"))

    // Vérifie que l'erreur disparaît
    await waitFor(() => {
      expect(screen.queryByText(/Pays invalide !/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur de validation backend sur le champ mot de passe", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
  
    // Simule une erreur backend sur le champ password
    ;(api.registerUser as jest.Mock).mockResolvedValueOnce({
      success: false,
      errors: { password: ["Format du mot de passe invalide !"] }
    })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email inconnu et passage à l'étape création de compte
    fireEvent.change(screen.getByTestId("email"), { target: { value: "new@email.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
    await waitFor(() => {
      expect(screen.getByText(/Créer un nouveau compte/i)).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText(/Créer un nouveau compte/i))
  
    // Saisie des informations du formulaire de création de compte
    fillAccountForm()
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => expect(screen.getByTestId("password")).toBeInTheDocument())
  
    // Saisie d'un mot de passe qui déclenche une erreur backend
    fireEvent.change(screen.getByTestId("password"), { target: { value: "Motdepasse1valid!" } })
    fireEvent.blur(screen.getByTestId("password"))
    fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "Motdepasse1valid!" } })
    fireEvent.blur(screen.getByTestId("confirmPassword"))
  
    // Soumission du formulaire d'inscription
    fireEvent.click(screen.getByText(/Confirmer l'inscription/i))
  
    // Vérifie que l'erreur backend sur le mot de passe est affichée
    await waitFor(() => {
      expect(screen.getByText(/Format du mot de passe invalide !/i)).toBeInTheDocument()
    })

    // Saisie d'un mot de passe valide
    fireEvent.change(screen.getByTestId("password"), { target: { value: "MotdepasseValid!1" } })
    fireEvent.blur(screen.getByTestId("password"))
    fireEvent.change(screen.getByTestId("confirmPassword"), { target: { value: "MotdepasseValid!1" } })
    fireEvent.blur(screen.getByTestId("confirmPassword"))
  
    // Vérifie que l'erreur disparaît
    await waitFor(() => {
      expect(screen.queryByText(/Format du mot de passe invalide !/i)).not.toBeInTheDocument()
    })
  })

  it("affiche une erreur globale et réinitialise l'étape si une erreur technique survient lors de l'inscription", async () => {

    // Simule une réponse de l'API indiquant que l'email n'existe pas
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(false)
    // Simule une erreur technique lors de l'inscription
    ;(api.registerUser as jest.Mock).mockRejectedValueOnce(new Error("Erreur serveur"))
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
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

  it("connecte l'utilisateur si l'email existe et le mot de passe est correct", async () => {

    // Simule un email existant
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(true)

    // Simule une connexion réussie
    ;(api.loginUser as jest.Mock).mockResolvedValueOnce({ success: true })

    // Simule la récupération des infos utilisateur
    ;(api.getMe as jest.Mock).mockResolvedValueOnce({ firstname: "Marie", lastname: "Curie" })
  
    // Mock de la navigation
    const pushMock = jest.fn()
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({ push: pushMock })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email existant
    fireEvent.change(screen.getByTestId("email"), { target: { value: "marie@curie.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape connexion (mot de passe)
    await waitFor(() => {
      expect(screen.getByTestId("password")).toBeInTheDocument()
    })
  
    // Saisie du mot de passe
    fireEvent.change(screen.getByTestId("password"), { target: { value: "MotdepasseValide!1" } })
    fireEvent.blur(screen.getByTestId("password"))
  
    // Soumission du formulaire de connexion
    fireEvent.click(screen.getByText(/Se connecter/i))
  
    // Vérifie que la redirection a eu lieu (ou le message de succès)
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/")
    })
  })

  it("affiche une erreur globale si la connexion échoue suite à un mot de passe incorrect", async () => {

    // Simule un email existant
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(true)

    // Simule une réponse d'échec à la connexion
    ;(api.loginUser as jest.Mock).mockResolvedValueOnce({ detail: "Mot de passe incorrect !" })
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email existant
    fireEvent.change(screen.getByTestId("email"), { target: { value: "marie@curie.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => {
      expect(screen.getByTestId("password")).toBeInTheDocument()
    })
  
    // Saisie d'un mot de passe incorrect
    fireEvent.change(screen.getByTestId("password"), { target: { value: "MauvaisMotdepasse!1" } })
    fireEvent.blur(screen.getByTestId("password"))
  
    // Soumission du formulaire de connexion
    fireEvent.click(screen.getByText(/Se connecter/i))
  
    // Vérifie que le message d'erreur global est affiché
    await waitFor(() => {
      expect(screen.getByText(/Mot de passe incorrect !/i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur globale si une erreur technique survient lors de la connexion", async () => {

    // Simule un email existant
    (api.checkEmailExists as jest.Mock).mockResolvedValueOnce(true)
    // Simule une erreur technique lors de la connexion
    ;(api.loginUser as jest.Mock).mockRejectedValueOnce(new Error("Erreur serveur"))
  
    // Rendu du composant SignForm
    renderWithUserProvider(<SignForm />)
  
    // Saisie d'un email existant
    fireEvent.change(screen.getByTestId("email"), { target: { value: "marie@curie.com" } })
    fireEvent.blur(screen.getByTestId("email"))
    fireEvent.click(screen.getByText(/Continuer/i))
  
    // Passe à l'étape mot de passe
    await waitFor(() => {
      expect(screen.getByTestId("password")).toBeInTheDocument()
    })
  
    // Saisie du mot de passe
    fireEvent.change(screen.getByTestId("password"), { target: { value: "MotdepasseValide!1" } })
    fireEvent.blur(screen.getByTestId("password"))
  
    // Soumission du formulaire de connexion
    fireEvent.click(screen.getByText(/Se connecter/i))
  
    // Vérifie que le message d'erreur global est affiché
    await waitFor(() => {
      expect(
        screen.getByText(/La connexion a échoué suite à un problème technique\. Veuillez réessayer plus tard\./i)
      ).toBeInTheDocument()
    })
  })
})