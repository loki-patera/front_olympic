'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CustomButton } from "@/app/components/shared/CustomButton"
import { useSportStore } from "@/app/stores"

export default function Cart(): React.JSX.Element {

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Fonction de gestion de la navigation vers la page du panier
  const handleNavigation = (): void => {
    router.push("/")
  }

  // Récupération de la fonction setSport du store pour gérer le retour à la page de réservation
  const { setSport } = useSportStore()

  return (

    <main>
      <div className="max-w-2xl mx-auto py-16 px-6 lg:px-0">
        <h1 className="text-3xl text-center sm:text-4xl font-extrabold text-gray-400">
          Panier de réservations
        </h1>

        <section className="mt-10">

          <div className="space-y-4">
            <div className="flex items-center justify-between text-2xl font-bold text-gray-900">
              <p>Total</p>
              <p>0 €</p>
            </div>
          </div>

          {/* Alertes panier/connexion */}
          <div className="mt-6 space-y-2 flex flex-col items-center">
            <div
              className="px-4 py-1 rounded bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm flex items-center justify-center"
              role="alert"
            >
              Ajoutez au moins une réservation !
            </div>
            <div
              className="px-4 py-1 rounded bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm flex items-center justify-center"
              role="alert"
            >
              Connectez-vous pour valider votre panier !
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <CustomButton
              className="w-56 text-base text-white py-2 bg-bluejo active:bg-bluejo-dark shadow-bluejo-light"
              disabled
              label="Valider votre panier"
              // Gestion de l'événement de clic pour naviguer vers la page du panier
              onClick={handleNavigation}
            />
          </div>

          <div className="mt-6 text-sm text-center text-gray-500">
            <Link
              href="/pages/booking"
              className="font-semibold text-sm text-gray-500 cursor-pointer hover:text-bluejo hover:underline-offset-4 hover:underline"
              onClick={() => setSport(null)}
            >
              Ajouter une réservation
            </Link>
          </div>

        </section>
      </div>
    </main>
  )
}