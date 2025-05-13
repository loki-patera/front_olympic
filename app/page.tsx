import { getSports } from '../lib/api'
import { Header } from './components/Header'
import { SportSection } from './components/sections/homeSection/SportSection'
import { SportType } from './types'

/**
 * Composant `Home` pour afficher la page d'accueil de l'application.
 */
export default async function Home(): Promise<React.JSX.Element> {

  // Récupération des épreuves sportives depuis l'API
  const sports: SportType[] = await getSports()

  return (

    <>
      <Header />

      <main>
        <SportSection
          sports={sports}
        />
      </main>
    </>
  )
}