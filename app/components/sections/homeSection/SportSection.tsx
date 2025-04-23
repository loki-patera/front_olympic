'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

/**
 * Type représentant un sport
 */
export type SportType = {
  /** Identifiant unique pour le sport */
  id_sport: number
  /** Nom du sport */
  title: string
  /** URL ou chemin vers l'image représentant le sport */
  image_url: string
}

/** Liste temporaire de noms de sports */
const sportNames = [
  'Athlétisme', 'Aviron', 'Badminton'
]
/** Liste temporaire de sports avec leurs propriétés */
const tempSports: SportType[] = sportNames.map((name, index) => ({
  id_sport: index + 1,
  title: name,
  image_url: 'https://placeholderjs.com/300x180'
}))

/**
 * Composant `SportSection` pour afficher une liste de sports avec un filtre de recherche sur les noms des sports
 *
 * @example
 * ```tsx
 * <SportSection />
 * ```
 */
export const SportSection = ():React.JSX.Element => {

  // Déclaration d'un état local pour stocker les sports
  const [sports, setSports] = useState<SportType[]>([])

  // Fonction pour récupérer les sports (simulée ici avec des données temporaires)
  const getSports = () => {
    setSports(tempSports)
  }

  // Utilisation du hook useEffect pour récupérer les sports lors du premier rendu du composant
  useEffect(() => {
    getSports()
  }, [])

  // Déclaration d'un état local pour stocker le texte de recherche
  const [searchSport, setSearchSport] = useState<string>("")

  // Filtrage des sports en fonction du texte de recherche
  const filteredSports: SportType[] = sports.filter((sport) =>
    sport.title.toLowerCase().startsWith(searchSport.toLowerCase())
  )

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Fonction de gestion de la navigation vers la page de réservation des évènements
  const handleNavigation = (): void => {
    router.push("/")
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
            className="border-2 border-yellowjo rounded-md p-2 w-full mb-4 focus:outline-none focus:ring
              focus:ring-yellowjo"
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
                src={sport.image_url}
                alt={sport.title}
                // Gestion de l'événement de clic sur l'image pour naviguer vers la page de réservation
                onClick={handleNavigation}
              />
              <p className="absolute text-xl font-semibold text-white bottom-1 left-2">{sport.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>    
  )
}