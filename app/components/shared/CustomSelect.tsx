import { CheckIcon } from '@heroicons/react/20/solid'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

/**
 * Interface `CustomSelectProps` définissant les propriétés du composant {@link CustomSelect}.
 * 
 * @property defaultLabel - Étiquette par défaut affichée lorsque aucune option n'est sélectionnée.
 * @property disabled - Indique si la liste déroulante est désactivée.
 * @property label - Étiquette de la liste déroulante.
 * @property labelTextSize - Taille du texte de l'étiquette.
 * @property listSize - Taille de la liste déroulante.
 * @property selectSize - Largeur de la liste déroulante.
 * @property options - Liste des options à afficher dans la liste déroulante.
 * @property selected - Option actuellement sélectionnée.
 * @property selectTextSize - Taille du texte de la sélection.
 * @property onChange - Fonction appelée lors du changement de sélection.
 * @property getOptionKey - Fonction pour la clé de l'option.
 * @property getOptionLabel - Fonction pour l'étiquette de l'option.
 */
export interface CustomSelectProps<T> {
  defaultLabel?: string
  disabled?: boolean
  label: string
  labelTextSize?: string
  listSize?: string
  selectSize?: string
  options: T[]
  selected: T | null
  selectTextSize?: string
  onChange: (value: T) => void
  getOptionKey: (option: T) => number
  getOptionLabel: (option: T) => string | number
}

/**
 * Composant réutilisable `CustomSelect` pour afficher une liste déroulante stylisée.
 *
 * @example
 * ```tsx
 * <CustomSelect
 *    defaultLabel="Sélectionnez une option"
 *    label="Options"
 *    options={options}
 *    selected={selectedOption}
 *    onChange={handleOptionChange}
 *    getOptionKey={(option) => option.id}
 *    getOptionLabel={(option) => option.name}
 * />
 * ```
 */
export function CustomSelect<T>({
  defaultLabel,
  disabled = false,
  label,
  labelTextSize,
  listSize,
  selectSize,
  options,
  selected,
  selectTextSize,
  onChange,
  getOptionKey,
  getOptionLabel
}: CustomSelectProps<T>) {
  return (

    <Listbox value={selected} onChange={onChange} disabled={disabled}>
      <div className="text-center">
        <h2 className={`${labelTextSize}`}>
          {label}
        </h2>
      </div>
      <div className={`relative mx-auto ${selectSize}`}>
        <ListboxButton
          className={`grid w-full cursor-default grid-cols-1 rounded-md bg-white pr-2 pl-3 text-left text-gray-900 border-2
            border-yellowjo focus:ring focus:ring-yellowjo ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={label}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className={`${selectTextSize}`}>{selected ? getOptionLabel(selected) : defaultLabel}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-bluejo sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className={`absolute z-10 ${listSize} w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5
            focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0`}
        >
          {defaultLabel && (
            <ListboxOption
              value={null}
              className="group relative cursor-default py-2 pr-3 pl-3 text-gray-900 select-none data-focus:bg-bluejo data-focus:text-white
                data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-7 font-normal group-data-selected:font-bold">{defaultLabel}</span>
              </div>
              <span className="absolute inset-y-0 flex items-center text-green-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          )}
          {options.map((option) => (
            <ListboxOption
              key={getOptionKey(option)}
              value={option}
              className="group relative cursor-default py-2 pr-3 pl-3 text-gray-900 select-none data-focus:bg-bluejo data-focus:text-white
                data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-7 font-normal group-data-selected:font-bold">{getOptionLabel(option)}</span>
              </div>
              <span className="absolute inset-y-0 flex items-center text-green-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}