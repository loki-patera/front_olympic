import { CartItem } from '../../app/context'
import { fetchClient } from '../fetchClient'

/**
 * Type de requête pour le traitement du paiement et l'enregistrement de la réservation.
 * 
 * @property {string} card_number - Numéro de la carte de crédit.
 * @property {string} card_name - Nom du titulaire de la carte.
 * @property {string} expiration_date - Date d'expiration de la carte.
 * @property {string} cvc - Code de sécurité de la carte (CVC).
 * @property {CartItem[]} cart - Tableau d'objets représentant les réservations dans le panier.
 */
export interface PaymentRequest {
  card_number: string
  card_name: string
  expiration_date: string
  cvc: string
  cart: CartItem[]
}

/**
 * Type de réponse pour le traitement du paiement et l'enregistrement de la réservation.
 * 
 * @property {boolean} success - Indique si le paiement a réussi.
 * @property {Record<string, string[]>} [errors] - Détails des erreurs si le paiement a échoué.
 */
export interface PaymentResponse {
  success: boolean
  errors?: Record<string, string[]>
}

/**
 * Fonction pour traiter le paiement et enregistrer la réservation.
 *
 * @param {PaymentRequest} data - Les données de paiement et de réservation.
 * @returns {Promise<PaymentResponse>} - Promesse contenant la réponse de l'API.
 *
 * @example
 * ```ts
 * const paymentResult = await processPayment({
 *   card_number: "1234567890123456",
 *   card_name: "Jean-Charles Dupont",
 *   expiration_date: "12/25",
 *   cvc: "123",
 *   cart: [{ id_event: 3, id_offer: 5 }]
 * })
 * ```
 */
export const processPayment = async (
  data: PaymentRequest
): Promise<PaymentResponse> => {

  // Envoie une requête POST à l'API pour traiter le paiement et enregistrer la réservation
  let response = await fetchClient<PaymentResponse>({
    endpoint: "/api/payment",
    method: "POST",
    data
  })

  // Si non authentifié, tente de rafraîchir le token d'accès
  if (response && "detail" in response && response.detail === "Non authentifié") {

    // Envoie une requête POST à l'API pour rafraîchir le token d'accès
    const refreshed = await fetchClient<{ success: boolean }>({
      endpoint: "/api/refresh",
      method: "POST"
    })

    // Si le rafraîchissement du token a réussi, réessaie le paiement
    if (refreshed.success) {

      // Réessaie d'envoyer la requête POST pour traiter le paiement et enregistrer la réservation
      response = await fetchClient<PaymentResponse>({
        endpoint: "/api/payment",
        method: "POST",
        data
      })
    }
  }

  // Retourne la réponse de l'API contenant le statut du paiement
  return response
}