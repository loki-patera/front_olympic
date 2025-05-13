/**
 * Type `LocationType` définissant les propriétés d'un lieu.
 * 
 * @property id_location - Identifiant unique du lieu.
 * @property name - Nom du lieu.
 * @property city - Ville où se situe le lieu.
 * @property total_seats - Nombre total de places dans le lieu.
 */
export type LocationType = {
  
  id_location: number
  name: string
  city: string
  total_seats: number
}