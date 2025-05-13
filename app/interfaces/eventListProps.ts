import { EventType } from "../types"

/**
 * Interface `EventListProps` définissant les propriétés des événements sportifs.
 * 
 * @property events - Tableau des objets de type {@link EventType} représentant les différents événements sportifs.
 */
export interface EventListProps {
  
  events: EventType[]
}