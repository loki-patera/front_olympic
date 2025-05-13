import { useState } from 'react'
import { formatDate, formatTime } from '../../../../utils/dateUtils'
import { EventProps } from '../../../../interfaces'
import { CustomButton } from '../../../shared/CustomButton'
import { CompetitionType } from '../../../../types'
import { getCompetitionsByEvent } from '../../../../../lib/api'

/**
 * Interface `EventCardProps`, qui hérite de {@link EventProps}, définissant les propriétés du composant {@link EventCard}.
 * 
 * @property isOpen - Indique si le tiroir des compétitions est ouvert.
 * @property onToggle - Fonction pour gérer l'ouverture / fermeture du tiroir des compétitions.
 */
export interface EventCardProps extends EventProps {
  isOpen: boolean
  onToggle(): void
}

/**
 * Composant `EventCard` pour afficher les détails d'un événement sportif dans une carte.
 * 
 * @example
 * ```tsx
 * <EventCard
 *    event={event}
 *    isOpen={true}
 *    onToggle={onToggle}
 * />
 * ``` 
 */
export const EventCard: React.FC<EventCardProps> = ({
  event,
  isOpen,
  onToggle
}) => {

  // État local pour stocker les compétitions liées à un événement sportif
  const [competitions, setCompetitions] = useState<CompetitionType[] | null>(null)

  // État local pour gérer le chargement des compétitions
  const [loading, setLoading] = useState(false)

  // État local pour gérer les erreurs lors de la récupération des compétitions
  const [error, setError] = useState<string | null>(null)

  // Gestion de l'état d'ouverture du tiroir
  const handleToggleDrawer = async () => {

    // Appel de la fonction de basculement pour ouvrir/fermer le tiroir
    onToggle()

    // Si les compétitions ne sont pas déjà chargées et que le tiroir n'est pas ouvert
    if (!competitions && !loading && !isOpen) {

      // Début du chargement
      setLoading(true)
      // Réinitialisation de l'état d'erreur
      setError(null)
      
      try {
        // Récupération des compétitions liées à l'événement sportif
        const data = await getCompetitionsByEvent(event.id_event)
        // Mise à jour de l'état avec les compétitions récupérées
        setCompetitions(data)
      } catch (error) {
        // Gestion des erreurs lors de la récupération des compétitions
        setError("Erreur lors du chargement des compétitions.")
      } finally {
        // Réinitialisation de l'état de chargement
        setLoading(false)
      }
    }
  }

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
            </span> / <span>{event.location.total_seats}</span>
          </p>
          <p>Prix → <span>{event.price}</span> € / personne</p>
        </div>

        <div className="absolute bottom-0 inset-x-0 px-4 pb-3">
          <div className="flex justify-between items-center">
            <p 
              className="font-semibold text-sm text-gray-700 cursor-pointer"
              // Gestion de l'événement de clic pour ouvrir/fermer le tiroir des compétitions
              onClick={handleToggleDrawer}
            >
              Afficher {isOpen ? "l'événement ▲" : "les compétitions ▼"}
            </p>
            <CustomButton
              className="text-sm py-1 bg-bluejo"
              label="Réserver"
            />
          </div>
        </div>

        {/* Affichage des compétitions */}
        {isOpen && (
          <div
            className="absolute top-0 left-0 w-full h-78/100 bg-gray-50 shadow-lg p-3 rounded-lg transition-transform duration-300 translate-y-0"
          >
            <div className="overflow-y-auto max-h-full h-full">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Chargement des compétitions...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : competitions ? (
                <ul className="text-sm space-y-2 text-gray-500">
                  {competitions.map((competition) => (
                    <li key={competition.id_competition} className="flex flex-wrap gap-2">
                      <span className="pl-2">○</span>
                      <span className="w-16">{competition.gender}</span>
                      <span>{competition.description}</span>
                      <span>{competition.phase}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Aucune compétition disponible</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}