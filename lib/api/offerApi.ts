import { OfferType } from '../../app/types'
import { fetchClient } from '../fetchClient'

/**
 * Fonction pour récupérer la liste des offres depuis l'API.
 * 
 * @returns {Promise<OfferType[]>} - Promesse contenant un tableau d'objets de type {@link OfferType}.
 * 
 * @example
 * ```ts
 * const offers = await getOffers()
 * ```
 */
export const getOffers = async (): Promise<OfferType[]> => {

  // Récupération des offres depuis l'API
  const offers = await fetchClient<OfferType[]>({
    endpoint: "/offer/offers",
    method: "GET"
  })

  // Retourne la liste des offres
  return offers
}