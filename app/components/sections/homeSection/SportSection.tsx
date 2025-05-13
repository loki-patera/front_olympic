'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SportProps } from '../../../interfaces'
import { SportType } from '../../../types'
import { useSportStore } from '../../../stores'

/**
 * Composant `SportSection` pour afficher les épreuves sportives avec un filtre de recherche.
 *
 * @example
 * ```tsx
 * <SportSection
 *    sports={sports}
 * />
 * ```
 */
export const SportSection: React.FC<SportProps> = ({
  sports
}) => {

  // Déclaration d'un état local pour stocker le texte de recherche
  const [searchSport, setSearchSport] = useState<string>("")

  // Filtrage des épreuves sportives en fonction du texte de recherche
  const filteredSports: SportType[] = sports.filter((sport) =>
    sport.title.toLowerCase().startsWith(searchSport.toLowerCase())
  )

  // Récupération de la fonction pour mettre à jour l'épreuve sportive sélectionnée
  const setSport = useSportStore((state) => state.setSport)

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Gestion de l'événement de clic sur une épreuve sportive pour naviguer vers la page de réservation
  const handleNavigation = (sport: SportType): void => {
    // Mise à jour de l'épreuve sportive sélectionnée dans le store
    setSport(sport.title)
    // Navigation vers la page de réservation
    router.push('/pages/booking')
  }

  return (

    <section className="flex pb-10 px-8 sm:px-10 lg:pb-14 lg:px-12" data-testid="sport-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-400 sm:text-3xl">
            Découvrez les épreuves sportives
          </h2>
        </div>
        <div className="mt-8 mb-4 max-w-md mx-auto">
          <input
            name="search"
            type="text"
            value={searchSport}
            // Gestion de l'événement de changement de valeur du champ de recherche
            onChange={(e) => setSearchSport(e.target.value)}
            placeholder="Entrez les premières lettres d'un sport ..."
            className="border-2 border-yellowjo rounded-md p-2 w-full mb-4 focus:outline-none focus:ring focus:ring-yellowjo"
          />
        </div>

        <div className="mt-12 max-w-lg mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:max-w-none">
          {filteredSports.map((sport) => (
            <div
              key={sport.id_sport}
              className="relative flex flex-col shadow-lg shadow-bluejo rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                className="h-48 w-full object-cover rounded-md transition-transform duration-300 hover:scale-110"
                src={sport.image}
                alt={sport.title}
                // Gestion de l'événement de clic sur l'image pour naviguer vers la page de réservation
                onClick={() => handleNavigation(sport)}
              />
              <p className="absolute text-xl font-semibold text-white bottom-1 left-2">{sport.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>    
  )
}