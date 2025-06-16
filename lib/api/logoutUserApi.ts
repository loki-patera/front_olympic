import { fetchClient } from '../fetchClient'

/**
 * Fonction pour déconnecter un utilisateur.
 * 
 * @returns {Promise<{ success: boolean }>} Un objet indiquant si la déconnexion a réussi.
 */
export const logoutUser = async (): Promise<{ success: boolean }> => {

  // Envoi d'une requête POST à l'API pour déconnecter l'utilisateur
  return fetchClient<{ success: boolean }>({
    endpoint: "/api/logout",
    method: "POST"
  })
}