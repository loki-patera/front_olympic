import { useEffect, useRef, useState } from 'react'
import { formatDate, formatTime } from '../../../../../utils/dateUtils'
import { CustomButton } from '../../../../shared/CustomButton'
import { CompetitionType, EventType, OfferType } from '../../../../../types'
import { getCompetitionsByEvent } from '../../../../../../lib/api'
import { BookingAmount, OfferSelect, SeatSelect } from './offer'
import { useCart } from '../../../../../context/CartContext'

/**
 * Interface `EventCardProps` définissant les propriétés du composant {@link EventCard}.
 * 
 * @property event - Objet de type {@link EventType} représentant un événement sportif.
 * @property isOpen - Indique si le tiroir des compétitions est ouvert.
 * @property onToggle - Fonction pour gérer l'ouverture / fermeture du tiroir des compétitions.
 * @property seats - Tableau des objets de type {@link OfferType} représentant les différents nombres de places.
 * @property offers - Tableau des objets de type {@link OfferType} représentant les différentes offres.
 */
export interface EventCardProps {
  event: EventType
  isOpen: boolean
  onToggle(): void
  seats: OfferType[]
  offers: OfferType[]
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
 *    seats={seats}
 *    offers={offers}
 * />
 * ```
 */
export const EventCard: React.FC<EventCardProps> = ({
  event,
  isOpen,
  onToggle,
  seats,
  offers
}) => {

  // État local pour stocker les compétitions liées à un événement sportif
  const [competitions, setCompetitions] = useState<CompetitionType[] | null>(null)

  // État local pour gérer le chargement des compétitions
  const [loading, setLoading] = useState(false)

  // État local pour gérer l'animation de retournement de la carte
  const [flipped, setFlipped] = useState(false)

  // Référence à l'élément de la carte pour gérer les clics extérieurs
  const cardRef = useRef<HTMLDivElement>(null)

  // Gestion du clic extérieur pour refermer la carte
  useEffect(() => {

    // Si la carte n'est pas retournée, ne rien faire
    if (!flipped) return

    // Gestion de l'événement de clic extérieur
    const handleClickOutside = (event: MouseEvent) => {

      // Si le clic est en dehors de la carte, refermer la carte
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setFlipped(false)
      }
    }

    // Ajout de l'écouteur d'événement pour le clic extérieur
    document.addEventListener('mousedown', handleClickOutside)
    
    // Nettoyage de l'écouteur d'événement lors du démontage du composant
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [flipped])

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

  // État local pour gérer le nombre de places sélectionnées
  const [seatSelected, setSeatSelected] = useState<number>()

  // État local pour gérer la récupération de la réduction de l'offre sélectionnée
  const [discountRecovered, setDiscountRecovered] = useState<number>()

  // Vérification si les valeurs sont définies pour effectuer le calcul
  const canCompute = seatSelected !== undefined && discountRecovered !== undefined && event.price !== undefined

  // Calcul du sous-total
  const subTotal = canCompute
    ? (seatSelected * event.price)
    : 0
  
  // Calcul de la réduction
  const discount = canCompute
    ? discountRecovered
    : 0

  // Calcul du prix total
  const total = canCompute
    ? subTotal - (subTotal * discount / 100)
    : 0
  
  // Récupération de la fonction d'ajout au panier depuis le contexte
  const { addToCart } = useCart()

  // Récupération de l'offre sélectionnée
  const selectedOffer = offers.find(offer => offer.number_seats === seatSelected && offer.discount === discountRecovered)

  // État local pour gérer la réinitialisation des sélections
  const [resetSelects, setResetSelects] = useState(false)

  // Ajout d'un effet pour remettre `resetSelects` à `false` après la réinitialisation
  useEffect(() => {
    if (resetSelects) setResetSelects(false)
  }, [resetSelects])

  // Gestion de l'événement de réservation
  const handleReserve = () => {

    // Ajout des IDs de l'événement et de l'offre pour mettre la réservation dans le panier
    addToCart({
      id_event: event.id_event,
      id_offer: selectedOffer!.id_offer
    })

    // Réinitialisation de l'état de sélection des places et de la réduction
    setSeatSelected(undefined)
    setDiscountRecovered(undefined)
    setResetSelects(true)
    
    // Retour à la face avant de la carte
    setFlipped(false)
  }

  return (

    <div
      ref={cardRef}
      data-testid={`event-card-${event.id_event}`}
      className="relative min-w-[360px] h-[280px] shadow shadow-yellowjo rounded-lg"
      style={{ perspective: 1000 }}
    >
      <div
        className={`w-full h-full transition-transform duration-1000 transform ${flipped ? 'rotate-x-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Face avant de la carte pour voir les informations relatives à un événement sportif */}
        <div className="absolute inset-0 w-full h-full bg-white backface-hidden rounded-lg pt-4">

          <div className="flex justify-between mx-4">
            <img
              src={event.sport.image}
              alt={event.sport.title}
              className="w-28 object-cover rounded-md shadow shadow-bluejo"
            />
            <div className="mx-4 flex flex-col justify-around">
              <p className="font-semibold">{formatDate(event.date)}</p>
              <p className="text-sm text-gray-500">{formatTime(event.start_time)} → {formatTime(event.end_time)}</p>
            </div>
          </div>

          <div className="p-4">
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

                {/* Lien `Afficher les compétitions`/`Afficher l'événement` pour ouvrir/fermer le tiroir des compétitions */}
                <p 
                  className="font-semibold text-sm text-gray-700 cursor-pointer hover:text-orange-600 hover:underline-offset-4 hover:underline"
                  // Gestion de l'événement de clic pour ouvrir/fermer le tiroir des compétitions
                  onClick={handleToggleDrawer}
                >
                  Afficher {isOpen ? "l'événement ▲" : "les compétitions ▼"}
                </p>

                {/* Bouton `Voir les offres` pour afficher la face arrière de la carte */}
                <CustomButton
                  className="text-sm py-1 bg-bluejo text-white active:bg-bluejo-dark shadow-bluejo-light"
                  label="Voir les offres"
                  // Gestion de l'événement de clic pour afficher la face arrière de la carte
                  onClick={() => setFlipped(true)}
                />
              </div>
            </div>

            {/* Affichage des compétitions */}
            {isOpen && (
              <div
                className="absolute top-4 left-0 w-full h-2/3 bg-gray-50 shadow-lg py-2 px-3 rounded-lg transition-transform duration-300 translate-y-0"
              >
                <div className="overflow-y-auto h-full">
                  {loading ? (
                    <div className="flex flex-col justify-center items-center h-full">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="mx-auto w-full max-w-sm rounded-md border border-bluejo p-2 mb-2">
                          <div className="flex animate-pulse space-x-4 items-center">
                            <div className="size-2 rounded-full bg-gray-200"></div>
                            <div className="flex-1 flex space-x-3">
                              <div className="h-2 w-1/4 rounded bg-gray-200"></div>
                              <div className="h-2 w-2/5 rounded bg-gray-200"></div>
                              <div className="h-2 w-1/5 rounded bg-gray-200"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-red-500">{error}</p>
                    </div>
                  ) : competitions ? (
                    <ul className="text-sm space-y-2 text-gray-500 pt-1">
                      {competitions.map((competition) => (
                        <li key={competition.id_competition} className="flex flex-wrap gap-2 rounded-lg border border-bluejo p-1.5 mb-2">
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

        {/* Face arrière de carte pour sélectionner un nombre de places, sélectionner une offre et afficher le prix de la réservation */}
        <div className="absolute inset-0 w-full h-full bg-white backface-hidden rounded-lg rotate-x-180">
          
          <div className="flex flex-col items-center justify-center p-4">

            <SeatSelect
              seats={seats}
              setSeatSelected={setSeatSelected}
              reset={resetSelects}
            />

            <OfferSelect
              offers={offers}
              seatSelected={seatSelected}
              setDiscountRecovered={setDiscountRecovered}
            />

            <BookingAmount
              subTotal={subTotal}
              discount={discount}
              total={total}
            />
          </div>

          <div className="absolute bottom-0 inset-x-0 px-4 pb-3">
            <div className="flex justify-between items-center">

              {/* Bouton `Retour` pour retourner à la face avant de la carte */}
              <CustomButton
                className="text-sm py-1 bg-red-500 text-white active:bg-red-700 shadow-red-200"
                label="Retour"
                // Gestion de l'événement de clic pour retourner à la face avant de la carte
                onClick={() => setFlipped(false)}
              />

              {/* Bouton `Réserver` pour ajouter l'offre au panier */}
              <CustomButton
                className="text-sm py-1 bg-green-500 text-white active:bg-green-600 shadow-green-200"
                label="Réserver"
                disabled={total === 0 || !selectedOffer}
                // Gestion de l'événement de clic pour ajouter l'offre au panier
                onClick={handleReserve}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}