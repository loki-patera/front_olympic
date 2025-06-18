import { CartItem } from '../../app/context/CartContext'
import { CartType } from '../../app/types'
import { fetchClient } from '../fetchClient'

/**
 * Fonction pour récupérer les données pour le panier depuis l'API.
 * 
 * @param cart - Tableau d'objets représentant les IDs d'événements et d'offres.
 * @returns {Promise<CartType[]>} - Promesse contenant un tableau d'objets de type {@link CartType}.
 * 
 * @example
 * ```ts
 * const cartDetails = await getCartDetails(cart)
 * ```
 */
export const getCartDetails = async (
  cart: CartItem[]
): Promise<CartType[]> => {

  // Récupération des données pour le panier depuis l'API interne
  const cartDetails = await fetchClient<CartType[]>({
    endpoint: "/api/cart",
    method: "POST",
    data: cart
  })

  // Retourne les données pour le panier
  return cartDetails
}