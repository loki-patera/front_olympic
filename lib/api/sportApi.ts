import { SportType } from '../../app/types'
import { fetchClient } from '../fetchClient'

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

  // Récupération des épreuves sportives depuis l'API
  const sports = await fetchClient<SportType[]>({
    endpoint: "/event/sports",
    method: "GET"
  })

  // Retourne la liste des épreuves sportives, avec l'URL de l'image modifiée
  return sports.map((sport: SportType) => ({
    ...sport,
    image: `/api/sport/${sport.image.split('/').pop()}`
  }))
}