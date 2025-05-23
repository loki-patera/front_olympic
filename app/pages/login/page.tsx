'use client'

import { useState } from 'react'
import { CustomButton } from '../../components/shared/CustomButton'

/**
 * Composant `Login` pour afficher la page de connexion de l'application.
 */
export default function Login(): React.JSX.Element {

  // État local pour stocker l'email
  const [email, setEmail] = useState<string>("")

  // État local pour stocker la validité de l'email
  const [isValid, setIsValid] = useState<boolean>(false)

  // Fonction pour valider l'email
  function validateEmail(value: string): boolean {

    // Regex pour valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    // Retourne vrai si l'email est valide
    return emailRegex.test(value)
  }

  // Fonction pour gérer les changements dans le champ email
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

    // Récupère la valeur de l'input
    const { value } = e.target

    // Met à jour l'état de l'email
    setEmail(value)

    // Vérifie si l'email est valide et met à jour l'état de validité
    setIsValid(validateEmail(value))
  }

  return (

    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
          
        <h2 className="text-center text-2xl/9 font-bold text-gray-900">
          Entrez votre email
        </h2>

        <div className="mt-10 space-y-8">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Adresse email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                  className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                    placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellowjo-light sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <CustomButton
                className="w-full bg-bluejo px-3 py-1.5 text-sm/6 text-white"
                disabled={!isValid}
                label="Continuer"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}