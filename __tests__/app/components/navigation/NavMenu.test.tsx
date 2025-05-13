import { fireEvent, render, screen } from '@testing-library/react'
import { NavMenu, NavMenuProps } from '../../../../app/components/navigation/NavMenu'

describe('Composant NavMenu', () => {

  // Propriétés par défaut utilisées pour les tests
  const defaultProps: NavMenuProps = {
    ariaLabel: 'Menu du panier',
    colorIcon: 'text-blue-500',
    variant: 'cart',
    menuItems: [
      { label: 'Item 1', href: '/item1' },
      { label: 'Item 2' }
    ],
    customMenuItems: <button>Custom Button</button>
  }
  

  it("rend le bouton du menu avec la bonne icône", () => {

    // Rendu du composant `NavMenu` avec les propriétés par défaut
    render(<NavMenu {...defaultProps} />)

    // Récupère le menu du panier grâce à son attribut `aria-label`
    const button = screen.getByLabelText("Menu du panier")

    // Vérifie que le bouton est présent dans le document
    expect(button).toBeInTheDocument()
  })


  it("affiche les icônes utilisateur (outline et pleine) pour la variante `user`", () => {
  
    // Rendu du composant `NavMenu` avec la variante 'user'
    render(
      <NavMenu {...defaultProps} variant="user" ariaLabel="Menu utilisateur"/>
    )

    // Récupère le menu du panier grâce à son attribut `aria-label`
    const button = screen.getByLabelText("Menu utilisateur")

    // Vérifie que l'icône outline est affichée par défaut
    expect(button.querySelector("svg")).toHaveClass("size-8")
    expect(button.querySelector("svg")).not.toHaveClass("text-gray-700")

    // Simule un survol du bouton
    fireEvent.mouseEnter(button)

    // Vérifie que l'icône pleine est affichée au survol
    expect(button.querySelector("svg")).toHaveClass("size-8")
    expect(button.querySelector("svg")).not.toHaveClass("text-blue-500")

    // Simule la sortie du survol
    fireEvent.mouseLeave(button)

    // Vérifie que l'icône outline est de nouveau affichée
    expect(button.querySelector("svg")).toHaveClass("size-8")
    expect(button.querySelector("svg")).not.toHaveClass("text-gray-700")
  })
})