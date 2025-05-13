import { LocationType } from "./locationType"
import { SportType } from "./sportType"

/**
 * Type `EventType` définissant les propriétés d'un événement sportif.
 * 
 * @property id_event - Identifiant unique de l'événement.
 * @property sport - Épreuve sportive associée à l'événement.
 * @property location - Lieu où se déroule l'événement.
 * @property date - Date de l'événement au format `YYYY-MM-DD`.
 * @property start_time - Heure de début de l'événement au format `HH:mm`.
 * @property end_time - Heure de fin de l'événement au format `HH:mm`.
 * @property price - Prix du billet pour l'événement.
 * @property available_seats - Nombre de places disponibles pour l'événement.
 */
export type EventType = {
  
  id_event: number
  sport: SportType
  location: LocationType
  date: string
  start_time: string
  end_time: string
  price: number
  available_seats: number
}