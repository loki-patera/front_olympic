'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CustomButton } from '../../components/shared/CustomButton'
import { useCart, useUser } from '../../context'
import { formatDate, formatTime } from '../../utils/dateUtils'
import { useSportStore } from '../../stores'
import { SpectatorDrawer, PaymentDrawer } from '../../components/drawers'
import { PaymentSuccessModal } from '../../components/modals/PaymentSuccessModal'

/**
 * Composant `Cart` pour afficher la page du panier de réservations de l'application.
 */
export default function Cart(): React.JSX.Element {

  // Récupération du contexte pour le panier
  const { cartDetails, removeFromCart } = useCart()

  // Récupération du contexte pour l'utilisateur
  const { user } = useUser()

  // Fonction pour supprimer une réservation du panier
  const handleRemove = (id_event: number, id_offer: number): void => {
    if (removeFromCart) {
      removeFromCart({ id_event, id_offer })
    }
  }

  // Calcul du total du panier
  const total = cartDetails.reduce(
    (acc, { event, offer }) =>
      acc + event.price * offer.number_seats * (1 - offer.discount / 100),
    0
  )

  // Récupération de la fonction setSport du store pour gérer le retour à la page de réservation
  const { setSport } = useSportStore()

  // États pour gérer l'affichage des tiroirs de spectateurs et de paiement
  const [drawerType, setDrawerType] = useState<"spectator" | "payment" | null>(null)

  // État pour stocker l'index du tiroir de spectateur sélectionné
  const [drawerIdx, setDrawerIdx] = useState<number | null>(null)

  // État pour gérer l'affichage de la fenêtre modale de succès lorsque le paiement est effectué
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)

  return (

    <main>

      {drawerType === 'spectator' && drawerIdx !== null && (
        <SpectatorDrawer
          open={true}
          onClose={() => {
            setDrawerType(null)
            setDrawerIdx(null)
          }}
        />
      )}

      {drawerType === 'payment' && (
        <PaymentDrawer
          open={true}
          onClose={() => setDrawerType(null)}
          onPaymentSuccess={() => setShowSuccessModal(true)}
          total={total}
        />
      )}

      <div className="max-w-2xl mx-auto py-16 px-6 lg:px-0">
        <h1 className="text-3xl text-center sm:text-4xl font-extrabold text-gray-400">
          Panier de réservations
        </h1>

        <section className="mt-12">
          <ul role="list" className="divide-y divide-yellowjo-light">

            {cartDetails.length === 0 ? (
              <li className="flex py-6 justify-center text-gray-500">
                Votre panier est vide
              </li>
            ) : (
              cartDetails.map(({ event, offer }, idx) => (
                <li key={idx} className="flex py-6">

                  <div className="flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between">
                        <p className="text-2xl font-bold text-bluejo">
                          {event.sport.title}
                        </p>
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-bold text-gray-900">
                            {formatDate(event.date)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatTime(event.start_time)} → {formatTime(event.end_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="mb-2 text-base font-bold text-gray-500">
                          <span>{event.location.name}</span>
                          <span className="text-yellowjo"> | </span>
                          <span className="text-gray-900">{event.location.city}</span>
                        </p>
                        <p className="text-sm font-bold text-yellowjo-dark">- {offer.discount} %</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-bold text-orange-500">
                          {offer.type}
                        </p>
                        <p className="text-base font-bold text-green-500">
                          {(event.price * offer.number_seats * (1 - offer.discount / 100)).toLocaleString(
                              'fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                            )
                          } €
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex justify-between items-center space-x-2">
                        <p className="text-sm text-gray-500">Spectateurs</p>
                        <CustomButton
                          className="text-xs text-gray-700 py-0.5 bg-yellowjo-light active:bg-yellowjo"
                          label="Compléter"
                          onClick={() => {
                            setDrawerType("spectator")
                            setDrawerIdx(idx)
                          }}
                        />
                      </div>
                      
                      <CustomButton
                        className="text-xs text-white py-0.5 bg-red-500 active:bg-red-700 shadow-red-200"
                        label="Supprimer"
                        // Gestion de l'événement de clic pour supprimer une réservation
                        onClick={() => handleRemove(event.id_event, offer.id_offer)}
                      />
                    </div>
                  </div>

                </li>
              ))
            )}
          </ul>
        </section>

        <section className="mt-10">

          <div className="space-y-4">
            <div className="flex items-center justify-between text-2xl font-bold text-gray-900">
              <p>Total</p>
              <p>{total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</p>
            </div>
          </div>

          {/* Affichage conditionnel des messages */}
          {cartDetails.length === 0 && !user && (
            <div className="mt-6 space-y-2 flex flex-col items-center">
              <div
                className="px-4 py-1 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs flex items-center justify-center"
                role="alert"
              >
                Ajoutez au moins une réservation !
              </div>
              <div
                className="px-4 py-1 rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs flex items-center justify-center"
                role="alert"
              >
                Connectez-vous pour valider votre panier !
              </div>
            </div>
          )}

          {cartDetails.length > 0 && !user && (
            <div
              className="mt-6 px-4 py-1 w-fit mx-auto rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs"
              role="alert"
            >
              Connectez-vous pour valider votre panier !
            </div>
          )}

          {cartDetails.length === 0 && user && (
            <div
              className="mt-6 px-4 py-1 w-fit mx-auto rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs"
              role="alert"
            >
              Ajoutez au moins une réservation !
            </div>
          )}

          {cartDetails.length > 0 && user && (
            <div
              className="mt-6 px-4 py-1 w-fit mx-auto rounded-lg bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs"
              role="alert"
            >
              Entrez les données des spectateurs pour chaque réservation
            </div>
          )}

          <div className="flex justify-center mt-8">
            <CustomButton
              className="w-56 py-2 text-base text-white bg-bluejo active:bg-bluejo-dark shadow-bluejo-light"
              disabled={cartDetails.length === 0 || !user}
              label="Valider votre panier"
              onClick={() => setDrawerType("payment")}
            />
          </div>

          <div className="mt-6 text-sm text-center text-gray-500">
            <Link
              href="/pages/booking"
              className="font-semibold text-sm text-gray-500 cursor-pointer hover:text-bluejo hover:underline-offset-4 hover:underline"
              // Réinitialise le sport sélectionné et redirige vers la page de réservation
              onClick={() => setSport(null)}
            >
              Ajouter une réservation
            </Link>
          </div>

        </section>
      </div>

      {showSuccessModal && (
        <PaymentSuccessModal
          open={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </main>
  )
}