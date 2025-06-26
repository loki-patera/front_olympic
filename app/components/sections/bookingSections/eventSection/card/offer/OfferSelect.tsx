import { OfferType } from "../../../../../../types"
import { CustomSelect } from "../../../../../shared/CustomSelect"
import { useEffect, useState } from "react"

/**
 * Interface `OfferSelectProps` définissant les propriétés du composant {@link OfferSelect}.
 * 
 * @property offers - Tableau des objets de type {@link OfferType} représentant les différentes offres.
 * @property seatSelected - Nombre de places sélectionnées.
 * @property setDiscountRecovered - Fonction pour mettre à jour la réduction récupérée.
 */
export interface OfferSelectProps {
  offers: OfferType[]
  seatSelected: number | undefined
  setDiscountRecovered(discountRecovered: number | undefined): void
  setSelectedOffer?(offer: OfferType | null): void
}

/**
 * Composant `OfferSelect` pour afficher une liste déroulante de sélection d'offres.
 * 
 * @example
 * ```tsx
 * <OfferSelect
 *    offers={offers}
 *    seatSelected={seatSelected}
 *    setDiscountRecovered={setDiscountRecovered}
 * />
 * ```
 */
export const OfferSelect: React.FC<OfferSelectProps> = ({
  offers,
  seatSelected,
  setDiscountRecovered,
  setSelectedOffer
}) => {

  // État local pour stocker l'offre sélectionnée
  const [selected, setSelected] = useState<OfferType | null>(null)

  // Filtrage des offres en fonction du nombre de places sélectionnées
  const filteredOffers = seatSelected
    ? offers.filter(offer => offer.number_seats === seatSelected)
    : offers

  // Lorsqu'un nouveau nombre de places est sélectionné → Aucune offre n'est sélectionnée par défaut
  useEffect(() => {
    setSelected(null)
  }, [seatSelected])

  // Lorsqu'une offre est sélectionnée → La réduction est transmise au composant BookingAmount
  useEffect(() => {
    setDiscountRecovered(selected?.discount)
    setSelectedOffer?.(selected ?? null)
  }, [selected])
  
  return (

    <CustomSelect
      disabled={!seatSelected}
      label="Sélectionnez une offre"
      labelTextSize="text-sm text-gray-500 font-bold"
      listSize="mt-1 max-h-30"
      selectSize="mt-1 mb-2 w-80"
      options={filteredOffers}
      selected={selected}
      selectTextSize="text-sm py-1 h-7"
      onChange={setSelected}
      getOptionKey={offer => offer.id_offer}
      getOptionLabel={offer => offer.type}
    />
  )
}