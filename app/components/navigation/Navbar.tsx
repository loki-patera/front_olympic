'use client'

import { useCart } from '../../context/CartContext'
import { useRouter } from 'next/navigation'
import { CustomButton } from '../shared/CustomButton'
import { Logo } from '../shared/Logo'
import { NavMenu } from './NavMenu'
import { formatDate, formatTime } from '../../utils/dateUtils'
import { CartType } from '../../types'

/**
 * Composant `Navbar` pour représenter la barre de navigation contenant un logo, un menu du panier et un menu utilisateur.
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export const Navbar = ():React.JSX.Element => {

  // Récupération du contexte pour le panier
  const { cart, cartDetails } = useCart()

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Calcul du total du panier
  const total = cartDetails.reduce(
    (acc, { event, offer }) =>
      acc + event.price * offer.number_seats * (1 - offer.discount / 100),
    0
  )

  // Création d'un tableau d'éléments de menu pour le panier
  const cartItems = cartDetails.length === 0
    // Si aucune réservation, affiche un message indiquant que le panier est vide
    ? [
        { label: "Votre panier est vide" },
        { label: ""}
      ]
    // Sinon, affiche les détails des réservations
    : [
        ...cartDetails.map(({ event, offer }: CartType) => ({
          label: "",
          custom: (
            <div className="px-4 pt-2 text-sm text-gray-700 space-y-0.5">
              <div className="font-bold text-bluejo text-base mb-1">{event.sport.title}</div>
              <div className="flex justify-between">
                <span>{formatDate(event.date)}</span>
                <span>{formatTime(event.start_time)} → {formatTime(event.end_time)}</span>
              </div>
              <div className="text-center font-bold">{offer.type}</div>
              <div className="flex justify-end text-green-600">
                {(event.price * offer.number_seats * (1 - offer.discount / 100)).toFixed(2)} €
              </div>
              <hr className="text-yellowjo-light mt-2" />
            </div>
          )
        })),
        // Ajout du total, uniquement si le panier n'est pas vide
        {
          label: "",
          custom: (
            <div className="flex justify-between items-center px-4 py-2 font-bold text-base text-red-500">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          )
        },
        { label: "" }
      ]
  
  // Fonction de gestion de la navigation vers la page du panier
  const handleNavigation = (): void => {
    router.push("/pages/cart")
  }

  return (
    
    <nav className="sticky top-0 bg-white z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <Logo />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Menu du panier */}
            <NavMenu
              ariaLabel="Menu du panier"
              colorIcon="text-yellowjo"
              variant="cart"
              menuItems={cartItems}
              cartBadge={cart.length}
              customMenuItems={
                <CustomButton
                  className="text-sm py-1 bg-bluejo text-white active:bg-bluejo-dark shadow-bluejo-light"
                  label="Voir votre panier"
                  // Gestion de l'événement de clic pour naviguer vers la page du panier
                  onClick={handleNavigation}
                />
              }
            />

            {/* Menu de l'utilisateur */}
            <NavMenu
              ariaLabel="Menu utilisateur"
              colorIcon="text-bluejo"
              variant="user"
              menuItems={[
                { label: "Se connecter", href: "/" }
              ]}
            />

          </div>
        </div>
      </div>
    </nav>
  )
}