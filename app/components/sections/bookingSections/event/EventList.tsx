'use client'

import { EventCard } from './EventCard'
import { EventListProps } from '../../../../interfaces'
import { useSportStore } from '../../../../stores'

/**
 * Composant `EventList` pour afficher une liste d'événements sportifs.
 *
 * @example
 * ```tsx
 * <EventList
 *    events={events}
 * />
 * ```
 */
export const EventList: React.FC<EventListProps> = ({
  events
}) => {

  // Récupération de l'épreuve sportive sélectionnée
  const sport = useSportStore(state => state.sport)

  // Filtrage des événements sportifs en fonction de l'épreuve sportive sélectionnée
  const filteredEvents = sport && sport !== "Toutes les épreuves sportives"
    ? events.filter((event) => event.sport.title === sport)
    : events
  
  return (

    <section className="pt-8">
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id_event}
            event={event}
          />
        ))}
      </div>
    </section>
  )
}