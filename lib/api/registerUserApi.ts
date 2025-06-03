import { UserType } from '../../app/types'
import { fetchClient } from '../fetchClient'

/**
 * Fonction pour enregistrer un nouvel utilisateur.
 *
 * @param {Omit<UserType, "id_person">} data - Les données de l'utilisateur à enregistrer, sans l'ID de la personne.
 * @returns {Promise<{ success: boolean; user_id?: string; errors?: string }>} - Promesse contenant le résultat de l'enregistrement.
 *
 * @example
 * ```ts
 * const result = await registerUser({
 *    email: "email@example.com",
 *    firstname: "John",
 *    lastname: "Doe",
 *    date_of_birth: "2000-01-01",
 *    country: "France",
 *    password: "securePassword123"
 * })
 * ```
 */
export const registerUser = async (
  data: Omit<UserType, "id_person">
): Promise<{ success: boolean; user_id?: string; errors?: string }> => {

  // Envoie les données de l'utilisateur à l'API pour l'enregistrement
  return fetchClient({
    endpoint: "/api/register",
    method: "POST",
    data
  })
}