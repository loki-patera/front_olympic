import { EventType } from '../../app/types'
import { fetchClient } from '../fetchClient'

// Déclaration d'un cache pour stocker les événements sportifs
let cacheEvent: EventType[] | null = null

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

  if (cacheEvent) {
    // Si le cache existe, retourne le cache
    return cacheEvent
  }
  
  // Récupération des événements sportifs depuis l'API
  const events = await fetchClient<EventType[]>({
    endpoint: "/event/events",
    method: "GET"
  })

  // Récupère la liste des événements sportifs pour le mettre dans le cache, avec l'URL de l'image modifiée
  cacheEvent = events.map((event: EventType) => ({
    ...event,
    sport: {
      ...event.sport,
      image: `/api/sport/${event.sport.image.split('/').pop()}`
    }
  }))

  // Retourne le cache
  return cacheEvent
}