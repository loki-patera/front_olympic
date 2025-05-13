'use client'

import { useRef, useState } from 'react'
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
            isOpen={openDrawerId === event.id_event}
            onToggle={() => handleToggleDrawer(event.id_event)}
          />
        ))}
      </div>
    </section>
  )
}