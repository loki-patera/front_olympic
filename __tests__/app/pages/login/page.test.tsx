import { render } from '@testing-library/react'
import Login from '../../../../app/pages/login/page'

it("render la page de login sans crash", () => {

  // Rendu du composant Login
  render(<Login />)
})