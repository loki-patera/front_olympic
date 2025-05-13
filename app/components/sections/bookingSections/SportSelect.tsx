'use client'

import { useEffect, useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { SportProps } from '../../../interfaces'
import { useSportStore } from '../../../stores'

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
export const SportSelect: React.FC<SportProps> = ({
  sports
}) => {
  
  // Récupération de l'épreuve sportive sélectionnée
  const sport = useSportStore(state => state.sport)

  // Récupération de la fonction pour mettre à jour l'épreuve sportive sélectionnée
  const setSport = useSportStore(state => state.setSport)

  // Déclaration d'un état local pour stocker l'épreuve sportive sélectionnée
  const [selected, setSelected] = useState(sport)

  useEffect(() => {
    if (sport) {
      // Si une épreuve sportive est sélectionnée, mise à jour de l'état local
      setSelected(sport)
    }
    else {
      // Sinon, réinitialisation de l'état local à "Toutes les épreuves sportives"
      setSelected('Toutes les épreuves sportives')
    }
  }, [sport])

  // Gestion de l'événement de changement de sélection dans la liste déroulante des épreuves sportives
  const handleChange = (newSport: string): void => {
    // Mise à jour de l'épreuve sportive sélectionnée dans le store
    setSport(newSport)
    // Mise à jour de l'état local
    setSelected(newSport)
  }

  return (
    <section>
      <Listbox value={selected} onChange={handleChange}>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-400 sm:text-3xl">
            Sélectionnez une épreuve sportive
          </h2>
        </div>
        <div className="relative mt-8 mb-4 max-w-md mx-auto">
          <ListboxButton
            className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border-2
              border-yellowjo focus:ring focus:ring-yellowjo aria-label"
            aria-label="Sélectionnez une épreuve sportive"
          >
            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
              <span className="block truncate">{selected}</span>
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-bluejo sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5
              focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            <ListboxOption
              value={"Toutes les épreuves sportives"}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-bluejo data-focus:text-white
                data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-7 font-normal group-data-selected:font-bold">Toutes les épreuves sportives</span>
              </div>

              <span className="absolute inset-y-0 flex items-center text-green-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>

            {sports.map((sport) => (
              <ListboxOption
                key={sport.id_sport}
                value={sport.title}
                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-bluejo data-focus:text-white
                  data-focus:outline-hidden"
              >
                <div className="flex items-center">
                  <span className="ml-7 font-normal group-data-selected:font-bold">{sport.title}</span>
                </div>

                <span className="absolute inset-y-0 flex items-center text-green-600 group-not-data-selected:hidden group-data-focus:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </section>
  )
}