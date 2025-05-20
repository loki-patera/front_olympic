import { EventType } from '../../app/types'
import { fetchClient } from '../fetchClient'

/**
 * Fonction pour récupèrer la liste des événements sportifs à partir de l'API et les renvoyer avec une URL d'image modifiée.
 * 
 * @returns {Promise<EventType[]>} - Promesse contenant un tableau d'objets de type {@link EventType} avec une URL d'image modifiée.
 * 
 * @example
 * ```ts
 * const events = await getEvents()
 * ```
 */
export const getEvents = async (): Promise<EventType[]> => {

  // Récupération des événements sportifs depuis l'API
  const events = await fetchClient<EventType[]>({
    endpoint: "/event/events",
    method: "GET"
  })

  // Retourne la liste des événements sportifs, avec l'URL de l'image modifiée
  return events.map((event: EventType) => ({
    ...event,
    sport: {
      ...event.sport,
      image: `/api/sport/${event.sport.image.split('/').pop()}`
    }
  }))
}