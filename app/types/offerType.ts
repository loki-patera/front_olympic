/**
 * Type `OfferType` définissant les propriétés d'une offre.
 * 
 * @property id_offer - Identifiant unique de l'offre.
 * @property type - Type de l'offre.
 * @property number_seats - Nombre de places de l'offre.
 * @property discount - Pourcentage de réduction de l'offre.
 */
export type OfferType = {

  id_offer: number
  type: string
  number_seats: number
  discount: number
}