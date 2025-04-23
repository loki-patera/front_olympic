import Image from "next/image"
import Link from "next/link"

/**
 * Composant `Logo` pour afficher une image du logo dans un lien qui mène à la page d'accueil
 * 
 * @example
 * ```tsx
 * <Logo />
 * ```
 */
export const Logo = ():React.JSX.Element => {

  return (
    
    <Link href="/">
      <Image
        src={"/jo-logo.jpg"}
        alt="Logo de la billetterie des JO"
        className="h-12 w-auto"
        width={200}
        height={0}
        priority
      />
    </Link>
  )
}