import { Header } from "./components/Header"
import { SportSection } from "./components/sections/homeSection/SportSection"

/**
 * Composant `Home` pour afficher la page d'accueil de l'application
 */
export default function Home() {

  return (

    <>
      <Header />

      <main>
        <SportSection />
      </main>
    </>
  )
}