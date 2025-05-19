import { getEvents, getSports } from '../../../lib/api'
import { EventList } from '../../components/sections/bookingSections/eventSection/EventList'
import { SportSelect } from '../../components/sections/bookingSections/SportSelect'
import { EventType, SportType } from '../../types'

/**
 * Composant `Booking` pour afficher la page de réservation de l'application.
 */
export default async function Booking(): Promise<React.JSX.Element> {

  // Récupération des épreuves sportives depuis l'API
  const sports: SportType[] = await getSports()
  
  // Récupération des événements sportifs depuis l'API
  const events: EventType[] = await getEvents()

  return (

    <main className="mx-auto max-w-7xl py-8 px-6">

      <SportSelect
        sports={sports}
      />

      <EventList
        events={events}
      />

    </main>
  )
}