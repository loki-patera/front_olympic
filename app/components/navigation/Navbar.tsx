'use client'

import { useRouter } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Logo } from '../shared/Logo'
import { NavMenu } from './NavMenu'
import { CustomButton } from '../shared/CustomButton'

/**
 * Composant `Navbar` pour représenter la barre de navigation contenant un logo, un menu du panier et un menu utilisateur
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */
export const Navbar = ():React.JSX.Element => {

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Fonction de gestion de la navigation vers la page du panier
  const handleNavigation = (): void => {
    router.push("/")
  }

  return (
    
    <Disclosure as="nav" className="sticky top-0 bg-white z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <Logo />

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Menu du panier */}
            <NavMenu
              ariaLabel="Menu du panier"
              colorIcon="text-yellowjo"
              variant="cart"
              menuItems={[
                { label: "Votre panier est vide" },
                { label: "Voir votre panier" }
              ]}
              customMenuItems={
                <CustomButton
                  className="py-1 bg-bluejo"
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
    </Disclosure>
  )
}