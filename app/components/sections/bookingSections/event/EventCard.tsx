import { formatDate, formatTime } from '../../../../utils/dateUtils'
import { EventProps } from '../../../../interfaces'
import { CustomButton } from '../../../shared/CustomButton'

/**
 * Composant `EventCard` pour afficher les détails d'un événement sportif dans une carte.
 * 
 * @example
 * ```tsx
 * <EventCard
 *    event={event}
 * />
 * ``` 
 */
export const EventCard: React.FC<EventProps> = ({
  event
}) => {

  return (

    <div className="relative pt-4 pb-10 shadow shadow-yellowjo rounded-lg overflow-hidden">
      <div className="flex justify-between mx-4">
        <img
          src={event.sport.image}
          alt={event.sport.title}
          className="w-24 object-cover rounded-md shadow shadow-bluejo"
        />
        <div className="mx-4 flex flex-col justify-around">
          <p className="font-semibold">{formatDate(event.date)}</p>
          <p className="text-sm text-gray-500">{formatTime(event.start_time)} → {formatTime(event.end_time)}</p>
        </div>
      </div>

      <div className="py-2 px-4">
        <p className="text-xl font-bold text-bluejo py-2">{event.sport.title}</p>

        <div className="ml-2 text-sm text-gray-500">
          <p className="truncate">{event.location.name} ({event.location.city})</p>
          <p>
            Places disponibles →&nbsp;
            <span className={`font-bold ${event.available_seats >= 100 ? "text-green-500" : "text-red-500"}`}>
              {event.available_seats}
            </span> / {event.location.total_seats}
          </p>
          <p>Prix → {event.price} € / personne</p>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-4 pb-3">
          <div className="flex justify-end items-center">
            <CustomButton
              className="text-sm py-1 bg-bluejo"
              label="Réserver"
            />
          </div>
        </div>
      </div>
    </div>
  )
}