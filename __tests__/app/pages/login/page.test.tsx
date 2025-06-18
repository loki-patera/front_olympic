import { render } from '@testing-library/react'
import Login from '../../../../app/pages/login/page'
import { UserProvider } from '../../../../app/context'

it("rend la page de login sans crash", () => {

  // Rendu du composant Login dans le contexte UserProvider
  render(
    <UserProvider>
      <Login />
    </UserProvider>
  )
})