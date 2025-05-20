'use client'

import { useRef, useState } from 'react'
import { EventCard } from './card/EventCard'
import { EventType, OfferType } from '../../../../types'
import { useSportStore } from '../../../../stores'

/**
 * Interface `EventListProps` définissant les propriétés du composant {@link EventList}.
 * 
 * @property events - Tableau des objets de type {@link EventType} représentant les différents événements sportifs.
 * @property seats - Tableau des objets de type {@link OfferType} représentant les différents nombres de places.
 * @property offers - Tableau des objets de type {@link OfferType} représentant les différentes offres.
 */
export interface EventListProps {
  events: EventType[]
  seats: OfferType[]
  offers: OfferType[]
}

/**
 * Composant `EventList` pour afficher une liste d'événements sportifs.
 *
 * @example
 * ```tsx
 * <EventList
 *    events={events}
 *    seats={seats}
 *    offers={offers}
 * />
 * ```
 */
export const EventList: React.FC<EventListProps> = ({
  events,
  seats,
  offers
}) => {

  // Récupération de l'épreuve sportive sélectionnée
  const sport = useSportStore(state => state.sport)

  // État pour suivre quel tiroir des compétitions est ouvert
  const [openDrawerId, setOpenDrawerId] = useState<number | null>(null)

  // Référence pour stocker l'identifiant du timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fonction pour ouvrir / fermer le tiroir avec un délai de fermeture
  const handleToggleDrawer = (eventId: number) => {

    // Si un timeout est en cours, l'annuler
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Ouvre ou ferme le tiroir
    setOpenDrawerId((prev) => (prev === eventId ? null : eventId))

    // Si le tiroir est ouvert, planifie sa fermeture après 10 secondes
    if (openDrawerId !== eventId) {
      timeoutRef.current = setTimeout(() => {
        setOpenDrawerId(null)
      }, 10000)
    }
  }

  // Filtrage des événements sportifs en fonction de l'épreuve sportive sélectionnée
  const filteredEvents = sport
    ? events.filter((event) => event.sport.id_sport === sport.id_sport)
    : events
  
  return (

    <section className="pt-8">
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id_event}
            event={event}
            isOpen={openDrawerId === event.id_event}
            onToggle={() => handleToggleDrawer(event.id_event)}
            seats={seats}
            offers={offers}
          />
        ))}
      </div>
    </section>
  )
}