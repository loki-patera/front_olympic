import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { ModalProps } from './ModalProps'

export const PaymentSuccessModal: React.FC<ModalProps> = ({
  open,
  onClose
}) => {

  return (

    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out
          data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4
              data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full
              sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4">
              <div>
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center">
                  <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Paiement réussi !
                  </DialogTitle>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      Votre réservation a été enregistrée.
                    </p>
                    <p>Vous pouvez maintenant consulter vos réservations dans votre espace personnel.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full justify-center rounded-md bg-bluejo px-3 py-2 text-sm font-semibold text-white shadow-xs
                  hover:bg-bluejo-dark sm:ml-3 sm:w-auto"
              >
                Votre compte
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs
                  ring-1 ring-gray-300 ring-inset hover:bg-red-400 sm:mt-0 sm:w-auto"
              >
                Fermer
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}