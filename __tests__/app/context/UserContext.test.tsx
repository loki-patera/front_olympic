import { render, act, waitFor } from '@testing-library/react'
import { useUser, UserProvider } from '../../../app/context/UserContext'
import * as api from '../../../lib/api'
import { useRouter } from 'next/navigation'

// Mock du router Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

// Mock des fonctions API
jest.mock('../../../lib/api', () => ({
  getMe: jest.fn(),
  logoutUser: jest.fn()
}))

const mockPush = jest.fn()
;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })

// Composant de test pour le contexte utilisateur
const TestComponent = () => {
  const { user, userLoading, login, logout } = useUser()
  return (
    <div>
      <div data-testid="user">{user ? `${user.firstname} ${user.lastname}` : ''}</div>
      <div data-testid="userLoading">{userLoading ? 'loading' : 'not-loading'}</div>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

describe('UserContext', () => {

  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.clearAllMocks()
    // Vide le sessionStorage avant chaque test
    sessionStorage.clear()
  })

  it("retourne une erreur si useUser est utilisé hors UserProvider", () => {
    
    // Cache les erreurs React attendues
    const spy = jest.spyOn(console, "error").mockImplementation(() => {})

    // Composant qui utilise useUser sans UserProvider
    const Broken = () => {
      useUser()
      return null
    }

    // Vérifie que l'erreur est bien levée
    expect(() => render(<Broken />)).toThrow(
      "Le hook useUser doit être utilisé à l’intérieur d’un UserProvider"
    )

    // Restaure le comportement d'origine de console.error
    spy.mockRestore()
  })

  it("login met à jour user et userLoading", async () => {

    // Mock de getMe pour retourner un utilisateur
    (api.getMe as jest.Mock).mockResolvedValueOnce({ firstname: 'Marie', lastname: 'Curie' })

    // Rendu du composant de test
    const { getByText, getByTestId } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    )

    // Simule la connexion
    await act(async () => {
      getByText('login').click()
    })

    // Vérifie que user est mis à jour avec les données de l'utilisateur
    expect(getByTestId('user').textContent).toBe('Marie Curie')

    // Vérifie que userLoading est passé à false après le chargement
    expect(getByTestId('userLoading').textContent).toBe('not-loading')
  })

  it("login met user à null si getMe ne retourne pas de nom/prénom", async () => {

    // Mock de getMe pour retourner un utilisateur sans nom/prénom
    (api.getMe as jest.Mock).mockResolvedValueOnce(null)

    // Rendu du composant de test
    const { getByText, getByTestId } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    )

    // Simule la connexion
    await act(async () => {
      getByText('login').click()
    })

    // Vérifie que user est mis à null
    expect(getByTestId('user').textContent).toBe('')

    // Vérifie que userLoading est passé à false après le chargement
    expect(getByTestId('userLoading').textContent).toBe('not-loading')
  })

  it("logout appelle logoutUser, reset user et redirige", async () => {

    // Mock de getMe pour retourner un utilisateur
    (api.getMe as jest.Mock).mockResolvedValueOnce({ firstname: 'Marie', lastname: 'Curie' })

    // Mock de logoutUser pour simuler la déconnexion
    ;(api.logoutUser as jest.Mock).mockResolvedValueOnce({ success: true })

    // Rendu du composant de test
    const { getByText, getByTestId } = render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    )

    // Simule la connexion
    await act(async () => {
      getByText('login').click()
    })

    // Vérifie que user est mis à jour après la connexion
    await waitFor(() => {
      expect(getByTestId('user').textContent).toBe('Marie Curie')
    })

    // Simule la déconnexion
    await act(async () => {
      getByText('logout').click()
    })

    // Vérifie que logoutUser a été appelé
    expect(api.logoutUser).toHaveBeenCalled()

    // Vérifie que l'utilisateur est réinitialisé
    expect(getByTestId('user').textContent).toBe('')

    // Vérifie que userLoading est passé à false après la déconnexion
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it("appelle login automatiquement si alreadyLoaded présent dans sessionStorage", async () => {

    // Simule que alreadyLoaded est présent dans le sessionStorage
    sessionStorage.setItem('alreadyLoaded', '1')

    // Mock de getMe pour retourner un utilisateur
    ;(api.getMe as jest.Mock).mockResolvedValueOnce({ firstname: 'Marie', lastname: 'Curie' })

    // Rendu du composant de test
    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      )
    })
  })
})