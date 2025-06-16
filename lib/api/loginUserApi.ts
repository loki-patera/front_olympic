import { UserType } from '../../app/types'
import { fetchClient } from '../fetchClient'

type LoginResponse = { success: true } | { detail: string }

/**
 * Fonction pour connecter un utilisateur existant.
 *
 * @param {Pick<UserType, "email" | "password">} data - Les données de l'utilisateur pour la connexion.
 * @returns {Promise<LoginResponse>} - Promesse contenant la réponse de l'API.
 *
 * @example
 * ```ts
 * const result = await loginUser({
 *    email: "email@example.com",
 *    password: "securePassword123"
 * })
 * ```
 */
export const loginUser = async (
  data: Pick<UserType, "email" | "password">
): Promise<LoginResponse> => {

  // Envoie les données de l'utilisateur à l'API pour la connexion
  return fetchClient<LoginResponse>({
    endpoint: "/api/login",
    method: "POST",
    data
  })
}