import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { Header } from '../../../app/components/Header'

describe("Composant Header", () => {

  it("navigue vers la page de réservation lorsque le bouton 'Réserver' est cliqué", () => {

    // Mock de la fonction `router.push` pour simuler la navigation
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock, pathname: "/pages/booking" })

    // Rendu du composant `Header`
    render(<Header />)

    // Récupère le bouton "Réserver" grâce à son label
    const reserveButton = screen.getByText("Réserver")

    // Simule un clic sur le bouton
    fireEvent.click(reserveButton)

    // Vérifie que `router.push` a été appelé avec "/pages/booking"
    expect(pushMock).toHaveBeenCalledWith("/pages/booking")

    // Vérifie que `router.push` a été appelé une fois
    expect(pushMock).toHaveBeenCalledTimes(1)
  })
})