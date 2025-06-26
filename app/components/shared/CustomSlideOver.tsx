'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CustomButton } from './CustomButton'

const paymentMethods = [
  { id: "visa", title: "Visa" },
  { id: "mastercard", title: "Mastercard" }
]

export default function Example() {

  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-sm transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute top-15 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:ml-5 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-white focus:outline-hidden"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="relative mt-24 flex-1 px-4 sm:px-6">

                  {/* Paiement */}
                  <div className="mt-10 pt-10">
                    <h2 className="text-2xl font-extrabold text-gray-400">Paiement</h2>

                    <fieldset className="mt-8">
                      <legend className="sr-only">Type de paiement</legend>
                      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                        {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                          <div key={paymentMethod.id} className="flex items-center">
                            {paymentMethodIdx === 0 ? (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                type="radio"
                                defaultChecked
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                            ) : (
                              <input
                                id={paymentMethod.id}
                                name="payment-type"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                              />
                            )}

                            <label htmlFor={paymentMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                              {paymentMethod.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                      <div className="col-span-4">
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                          Numéro de carte de crédit
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="card-number"
                            name="card-number"
                            autoComplete="cc-number"
                            className="block w-full py-1.5 border-gray-300 rounded-md shadow-sm sm:text-sm outline-1 -outline-offset-1
                              outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-yellowjo-light"
                          />
                        </div>
                      </div>

                      <div className="col-span-4">
                        <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                          Nom sur la carte
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="name-on-card"
                            name="name-on-card"
                            autoComplete="cc-name"
                            className="block w-full py-1.5 border-gray-300 rounded-md shadow-sm sm:text-sm outline-1 -outline-offset-1
                              outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-yellowjo-light"
                          />
                        </div>
                      </div>

                      <div className="col-span-3">
                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                          Date d'expiration (MM/AA)
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="expiration-date"
                            id="expiration-date"
                            autoComplete="cc-exp"
                            className="block w-full py-1.5 border-gray-300 rounded-md shadow-sm sm:text-sm outline-1 -outline-offset-1
                              outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-yellowjo-light"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                          CVC
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            name="cvc"
                            id="cvc"
                            autoComplete="csc"
                            className="block w-full py-1.5 border-gray-300 rounded-md shadow-sm sm:text-sm outline-1 -outline-offset-1
                              outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-yellowjo-light"
                          />
                        </div>
                      </div>
                    </div>

                    <CustomButton
                      className="w-full mt-6 py-2 text-base text-white bg-bluejo active:bg-bluejo-dark shadow-bluejo-light"
                      label="Payer"
                    />
                  </div>

                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}