import { getEvents, getOffers, getSeats, getSports } from '../../../lib/api'
import { EventList } from '../../components/sections/bookingSections/eventSection/EventList'
import { SportSelect } from '../../components/sections/bookingSections/SportSelect'
import { EventType, OfferType, SportType } from '../../types'

/**
 * Composant `Booking` pour afficher la page de réservation de l'application.
 */
export default async function Booking(): Promise<React.JSX.Element> {

  // Récupération des épreuves sportives depuis l'API
  const sports: SportType[] = await getSports()
  
  // Récupération des événements sportifs depuis l'API
  const events: EventType[] = await getEvents()

  // Récupération des nombres de places depuis l'API
  const seats: OfferType[] = await getSeats()

  // Récupération des offres depuis l'API
  const offers: OfferType[] = await getOffers()

  return (

    <main className="mx-auto max-w-7xl py-8 px-6">

      <SportSelect
        sports={sports}
      />

      <EventList
        events={events}
        seats={seats}
        offers={offers}
      />

    </main>
  )
}