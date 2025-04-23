import Link from "next/link"
import { Logo } from "./shared/Logo"

/**
 * Composant `Footer` pour représenter le bas de chaque page du site contenant un logo, les mentions légales et les politiques de confidentialité
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export const Footer = ():React.JSX.Element => {

  return (

    <footer className="py-8" data-testid="footer">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6 text-center border-t border-bluejo pt-8">
          <li className="order-2 md:order-1 mx-auto flex max-w-xs flex-col gap-y-4">
            <Link
              href="/pages/legal"
              className="text-gray-500 border-b border-white hover:border-yellowjo hover:text-bluejo md:mt-4"
            >
              Mentions légales
            </Link>
          </li>
          <li className="order-1 mx-auto flex max-w-xs flex-col gap-y-4">
            <Logo />
          </li>
          <li className="order-3 md:order-2 mx-auto flex max-w-xs flex-col gap-y-4">
            <Link
              href="/pages/privacyPolicy"
              className="text-gray-500 border-b border-white hover:border-yellowjo hover:text-bluejo md:mt-4"
            >
              Politique de confidentialité
            </Link>
          </li>
        </ul>
        <div className="mt-8 border-t border-bluejo pt-8">
          <p className="text-sm text-gray-400 text-center">
            © 2025 loki-patera Application. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}