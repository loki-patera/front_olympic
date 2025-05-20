'use client'

import { useEffect, useState } from 'react'
import { CustomSelect } from '../../shared/CustomSelect'
import { useSportStore } from '../../../stores'
import { SportType } from '../../../types'

/**
 * Interface `SportListProps` définissant les propriétés du composant {@link SportSelect}.
 * 
 * @property sports - Tableau des objets de type {@link SportType} représentant les différents épreuves sportives.
 */
export interface SportListProps {
  sports: SportType[]
}

/**
 * Composant `SportSelect` pour afficher une liste déroulante de sélection d'épreuves sportives.
 * 
 * @example
 * ```tsx
 * <SportSelect
 *    sports={sports}
 * />
 * ```
 */
export const SportSelect: React.FC<SportListProps> = ({
  sports
}) => {
  
  // Récupération de l'épreuve sportive sélectionnée
  const sport = useSportStore(state => state.sport)

  // Récupération de la fonction pour mettre à jour l'épreuve sportive sélectionnée
  const setSport = useSportStore(state => state.setSport)

  // Déclaration d'un état local pour stocker l'épreuve sportive sélectionnée
  const [selected, setSelected] = useState<SportType | null>(sport)

  useEffect(() => {
    setSelected(sport)
  }, [sport])

  // Gestion de l'événement de changement de sélection dans la liste déroulante des épreuves sportives
  const handleChange = (sport: SportType | null): void => {
    // Mise à jour de l'épreuve sportive sélectionnée dans le store
    setSport(sport)
    // Mise à jour de l'état local
    setSelected(sport)
  }

  return (
    <section>
      <CustomSelect
        defaultLabel="Toutes les épreuves sportives"
        label="Sélectionnez une épreuve sportive"
        labelTextSize="text-2xl sm:text-3xl font-extrabold text-gray-400"
        listSize="max-h-56 mt-1"
        selectSize="mt-8 mb-4 max-w-md"
        options={sports}
        selected={selected}
        selectTextSize="text-base py-1.5 h-9"
        onChange={handleChange}
        getOptionKey={sport => sport.id_sport}
        getOptionLabel={sport => sport.title}
      />
    </section>
  )
}