import { OfferType } from '../../app/types'
import { fetchClient } from '../fetchClient'

/**
 * Fonction pour récupérer la liste des nombres de places distincts depuis l'API.
 * 
 * @returns {Promise<OfferType[]>} - Promesse contenant un tableau de nombres de places.
 * 
 * @example
 * ```ts
 * const seats = await getSeats()
 * ```
 */
export const getSeats = async (): Promise<OfferType[]> => {

  // Récupération des nombres de places depuis l'API
  const seats = await fetchClient<OfferType[]>({
    endpoint: "/offer/seats",
    method: "GET"
  })

  // Retourne la liste des nombres de places
  return seats
}