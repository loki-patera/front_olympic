import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DrawerProps } from './DrawerProps'
import { PaymentForm } from '../form/PaymentForm'

export interface PaymentDrawerProps extends DrawerProps {
  onPaymentSuccess?(): void
  total: number
}

export const PaymentDrawer: React.FC<PaymentDrawerProps> = ({
  open,
  onClose,
  onPaymentSuccess,
  total
}) => {

  return (

    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/30"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-sm"
            >
              <TransitionChild>
                <div className="absolute top-15 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-500 hover:text-yellowjo focus-visible:ring-2 focus-visible:ring-white
                      focus-visible:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex h-full flex-col overflow-y-auto bg-white py-10 px-4 sm:px-6 shadow-xl">
                <div className="text-center mt-12">
                  <DialogTitle className="text-2xl font-extrabold text-gray-400">Paiement</DialogTitle>
                </div>

                <div className="flex justify-evenly items-center my-8">
                  <p className="text-gray-500 underline underline-offset-4 decoration-yellowjo-light">Total de la commande</p>
                  <p className="text-3xl font-bold text-bluejo">
                    {total.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                  </p>
                </div>

                <PaymentForm
                  onSuccess={() => {
                    onClose()
                    if (onPaymentSuccess) onPaymentSuccess()
                  }}
                />
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}