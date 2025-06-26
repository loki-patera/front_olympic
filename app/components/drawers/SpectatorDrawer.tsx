import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DrawerProps } from './DrawerProps'

export const SpectatorDrawer: React.FC<DrawerProps> = ({
  open,
  onClose
}) => {

  return (

    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/30"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-sm"
            >
              <TransitionChild>
                <div className="absolute top-15 right-0 -mr-8 flex pt-4 pl-2 sm:-mr-10 sm:pl-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-500 hover:text-yellowjo focus-visible:ring-2 focus-visible:ring-white
                      focus-visible:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                <div className="text-center px-4 sm:px-6 mt-12">
                  <DialogTitle className="text-2xl font-extrabold text-gray-400">Spectateurs</DialogTitle>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}