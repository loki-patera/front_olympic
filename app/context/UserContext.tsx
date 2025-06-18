'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserType } from '../types'
import { getMe, logoutUser } from '../../lib/api'

export interface UserContextType {
  user: Pick<UserType, "firstname" | "lastname"> | null
  userLoading: boolean
  login(): Promise<void>
  logout(): Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {

  const context = useContext(UserContext)

  if (!context) throw new Error("Le hook useUser doit être utilisé à l’intérieur d’un UserProvider")

  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode}> = ({
  children
}) => {

  // État pour stocker les informations de l'utilisateur connecté
  const [user, setUser] = useState<Pick<UserType, "firstname" | "lastname"> | null>(null)

  // État pour gérer le chargement des données de l'utilisateur
  const [userLoading, setUserLoading] = useState<boolean>(true)

  // Utilisation du hook useRouter pour la navigation
  const router = useRouter()

  // Fonction pour récupérer les informations de l'utilisateur connecté
  const login = async (): Promise<void> => {
    setUserLoading(true)
    // Appel de l'API pour récupérer les informations de l'utilisateur
    const me = await getMe()
    // Si l'utilisateur a un prénom et un nom, mise à jour de l'état user
    setUser(me && me.firstname && me.lastname ? me : null)
    setUserLoading(false)
  }

  useEffect(() => {
    
    // Si le navigateur est défini
    if (typeof window !== "undefined") {

      // Récupération de l'élément "alreadyLoaded" du sessionStorage
      const alreadyLoaded = sessionStorage.getItem("alreadyLoaded")

      // Si l'élément existe
      if (alreadyLoaded) {
        // Appel de la fonction login
        login()
      } else {
        // Si l'élément n'existe pas, définition d'une valeur dans le sessionStorage
        sessionStorage.setItem("alreadyLoaded", "1")

        setUserLoading(false)
      }
    }
  }, [])

  // Fonction pour déconnecter l'utilisateur et rediriger vers la page d'accueil
  const logout = async (): Promise<void> => {
    await logoutUser()
    setUser(null)
    router.push('/')
  }

  return (
    <UserContext.Provider value={{ user, userLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}