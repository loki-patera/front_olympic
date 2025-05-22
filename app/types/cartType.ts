import { EventType } from "./eventType"
import { OfferType } from "./offerType"

/**
 * Type `CartType` définissant les propriétés d'un élément du panier.
 * 
 * @property event - Événement associé à l'élément du panier.
 * @property offer - Offre associée à l'élément du panier.
 */
export type CartType = {

  event: EventType
  offer: OfferType
}