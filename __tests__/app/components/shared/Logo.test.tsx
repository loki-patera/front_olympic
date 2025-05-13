import { render, screen } from '@testing-library/react'
import { Logo } from '../../../../app/components/shared/Logo'

describe("Composant Logo", () => {

  it("rend l'image du logo avec les attributs corrects", () => {

    // Rendu du composant `Logo`
    render(<Logo />)

    // Récupère l'image du logo par son attribut `alt`
    const logoImage = screen.getByAltText("Logo de la billetterie des JO")

    // Vérifie que l'image du logo est présente dans le DOM
    expect(logoImage).toBeInTheDocument()

    // Vérifie que l'attribut `src` de l'image contient le chemin correct
    expect(logoImage).toHaveAttribute("src", expect.stringContaining("jo-logo.jpg"))

    // Vérifie que l'attribut `width` est correctement défini
    expect(logoImage).toHaveAttribute("width", "200")
  })

  
  it("encapsule l'image du logo dans un lien vers la page d'accueil", () => {

    // Rendu du composant Logo
    render(<Logo />)

    // Récupère le lien contenant le logo par son rôle et son nom
    const logoLink = screen.getByRole("link", { name: /Logo de la billetterie des JO/i })

    // Vérifie que le lien contenant le logo est présent dans le DOM
    expect(logoLink).toBeInTheDocument()

    // Vérifie que l'attribut `href` du lien pointe vers la page d'accueil
    expect(logoLink).toHaveAttribute("href", "/")
  })
})