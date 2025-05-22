import { OfferType } from '../../../../../../types'
import { CustomSelect } from '../../../../../../components/shared/CustomSelect'
import { useEffect, useState } from 'react'

/*'
 * Interface `SeatSelectProps` définissant les propriétés du composant {@link SeatSelect}.
 * 
 * @property seats - Tableau des objets de type {@link OfferType} représentant les différents nombres de places.
 * @property setSeatSelected - Fonction pour mettre à jour le nombre de places sélectionnées.
 */
export interface SeatSelectProps {
  seats: OfferType[]
  setSeatSelected(seatSelected: number | undefined): void
  reset?: boolean
}

/**
 * Composant `SeatSelect` pour afficher une liste déroulante de sélection du nombre de places.
 * 
 * @example
 * ```tsx
 * <SeatSelect
 *    seats={seats}
 *    setSeatSelected={setSeatSelected}
 * />
 * ```
 */
export const SeatSelect: React.FC<SeatSelectProps> = ({
  seats,
  setSeatSelected,
  reset
}) => {

  // État local pour stocker le nombre de places sélectionnées
  const [selected, setSelected] = useState<OfferType | null>(null)

  // Lorsqu'un nombre de places est sélectionnné → Ce nombre est transmis aux composants OfferSelect et BookingAmount
  useEffect(() => {
    setSeatSelected(selected?.number_seats)
  }, [selected])

  // Réinitialisation de la sélection lorsque la prop `reset` est vrai
  useEffect(() => {
    if (reset) setSelected(null)
  }, [reset])
 
  return (

    <CustomSelect
      label="Sélectionnez le nombre de places"
      labelTextSize="text-sm text-gray-500 font-bold"
      listSize="mt-1"
      selectSize="mt-1 mb-2 w-75"
      options={seats}
      selected={selected}
      selectTextSize="text-sm py-1 h-7"
      onChange={setSelected}
      getOptionKey={seat => seat.number_seats}
      getOptionLabel={seat => seat.number_seats}
    />
  )
}