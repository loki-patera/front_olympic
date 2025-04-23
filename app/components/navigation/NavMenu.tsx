import { useState } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ShoppingCartIcon as ShoppingCartIconOutline, UserIcon as UserIconOutline } from '@heroicons/react/24/outline'
import { ShoppingCartIcon as ShoppingCartIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid'

/**
 * Types de propriétés pour le composant {@link NavMenu}
 */
export interface NavMenuProps {
  /** Libellé pour l'accessibilité, utilisé pour décrire le menu */
  ariaLabel: string
  /** Couleur de l'icône du menu */
  colorIcon: string
  /** Variante du menu, soit `cart` pour le panier, soit `user` pour l'utilisateur */
  variant: 'cart' | 'user'
  /** Liste des éléments de menu à afficher */
  /** Chaque élément de menu peut avoir une étiquette et un lien `href` optionnel */
  menuItems: {
    label: string
    href?: string
  }[]
  /** Élément de menu personnalisable à afficher si défini, utilisé uniquement pour le dernier élément */
  customMenuItems?: React.ReactNode
}

/**
 * Composant `NavMenu` pour rendre un menu de navigation avec des éléments de menu et des icônes personnalisables
 *
 * @exemple
 * ```tsx
 * <NavMenu
 *   ariaLabel="Menu du panier"
 *   colorIcon="text-blue-500"
 *   variant="cart"
 *   menuItems={[
 *     { label: 'Votre panier est vide' },
 *     { label: 'Voir votre panier' },
 *   ]}
 *   customMenuItems={<button>Voir votre panier</button>}
 * />
 * ```
 */
export const NavMenu: React.FC<NavMenuProps> = ({
  ariaLabel,
  colorIcon,
  variant,
  menuItems,
  customMenuItems
}) => {

  // Utilisation du hook useState pour gérer l'affichage de l'icône au survol
  const [isHovered, setIsHovered] = useState(false)

  // Définition des icônes à utiliser en fonction de la variante
  const OutlineIcon = variant === 'user' ? UserIconOutline : ShoppingCartIconOutline
  const SolidIcon = variant === 'user' ? UserIconSolid : ShoppingCartIconSolid

  return (

    <Menu as="div" className="relative mx-3">
      <div>
        <MenuButton
          className={`relative p-1 cursor-pointer ${colorIcon}`}
          // Ajout d'un effet de survol pour changer l'icône
          onMouseEnter={() => setIsHovered(true)}
          // Ajout d'un effet de sortie pour revenir à l'icône par défaut
          onMouseLeave={() => setIsHovered(false)}
          aria-label={ariaLabel}
        >
          {isHovered ? (
            <SolidIcon className="size-8" />
          ) : (
            <OutlineIcon className="size-8" />
          )}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md divide-y divide-gray-100 bg-white py-1 ring-1 shadow-lg ring-black/5
          transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out
          data-leave:duration-75 data-leave:ease-in"
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            {/* Si un lien `href` existe, on le rend en priorité */}
            {item.href ? (
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
              >
                {item.label}
              </a>
            ) : (
              // Si `customMenuItems` est défini, il est rendu uniquement pour le dernier élément
              index === menuItems.length - 1 ? (
                <div className="flex justify-center py-2">
                  {customMenuItems}
                </div>
              ) : (
                // Sinon, il est rendu comme un simple texte
                <span className="block px-4 py-2 text-sm text-gray-700">
                  {item.label}
                </span>
              )
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}