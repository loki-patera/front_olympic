import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from '../../app/layout'

// Mock des polices Geist et Geist_Mono
jest.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
    className: "font-geist-sans"
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
    className: "font-geist-mono"
  })
}))

describe("Composant metadata", () => {

  it("contient le titre et la description corrects", () => {

    // Vérifie que le titre est correct
    expect(metadata.title).toBe("Billetterie JO")

    // Vérifie que la description est correcte
    expect(metadata.description).toBe(
      "Ce site est un projet d'étude et n'est pas un site officiel"
    )
  })
})


describe("Composant RootLayout", () => {

  it("devrait rendre le composant sans erreur", () => {
    
    // Rendu du composant `RootLayout`
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Vérifie que le contenu est rendu
    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })
})