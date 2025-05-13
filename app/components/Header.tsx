'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { CustomButton } from './shared/CustomButton'
import { useSportStore } from '../stores/sportStore'

/**
 * Composant `Header` pour représenter la section principale d'en-tête de l'application.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */
export const Header = ():React.JSX.Element => {

  // Récupération de la fonction pour mettre à jour l'épreuve sportive sélectionnée
  const setSport = useSportStore((state) => state.setSport)
  
  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Gestion de l'événement de clic sur le bouton `Réserver` pour naviguer vers la page de réservation
  const handleNavigation = (): void => {
    setSport("Toutes les épreuves sportives")
    router.push("/pages/booking")
  }

  return (

    <header className="relative overflow-hidden" data-testid="header">
      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <div className="hidden lg:block bg-dots-right"></div>
        <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="mt-1 block text-4xl font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-600">Bienvenue aux</span>
                  <span className="block text-yellowjo">Jeux Olympiques</span>
                </span>
              </h1>
              <p className="my-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Réservez vos places pour assister aux épreuves sportives des Jeux Olympiques de Paris 2024
              </p>
              <CustomButton
                className="bg-bluejo sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:w-auto mt-4 py-2.5"
                label="Réserver"
                // Gestion de l'événement de clic pour naviguer vers la page de réservation
                onClick={handleNavigation}
              />
            </div>
            
            <div
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg shadow-bluejo lg:max-w-xl">
                <div className="block w-full bg-white rounded-lg overflow-hidden">
                  <Image
                    alt="Cyclisme"
                    src={"/jo-hero.jpg"}
                    className="w-full"
                    width={800}
                    height={0}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}