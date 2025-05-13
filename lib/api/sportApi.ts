import { SportType } from '../../app/types'
import { fetchClient } from '../fetchClient'

// Déclaration d'un cache pour stocker les épreuves sportives
let cacheSport: SportType[] | null = null

/**
 * Fonction pour récupèrer la liste des épreuves sportives à partir de l'API et les renvoyer avec une URL d'image modifiée.
 * 
 * @returns {Promise<SportType[]>} - Promesse contenant un tableau d'objets de type {@link SportType} avec une URL d'image modifiée.
 * 
 * @example
 * ```ts
 * const sports = await getSports()
 * ```
 */
export const getSports = async (): Promise<SportType[]> => {

  if (cacheSport) {
    // Si le cache existe, retourne le cache
    return cacheSport
  }

  // Récupération des épreuves sportives depuis l'API
  const sports = await fetchClient<SportType[]>({
    endpoint: "/event/sports",
    method: "GET"
  })

  // Récupère la liste des épreuves sportives pour le mettre dans le cache, avec l'URL de l'image modifiée
  cacheSport = sports.map((sport: SportType) => ({
    ...sport,
    image: `/api/sport/${sport.image.split('/').pop()}`
  }))

  // Retourne le cache
  return cacheSport
}