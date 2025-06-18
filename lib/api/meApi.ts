import { UserType } from '../../app/types'
import { fetchClient } from '../fetchClient'

/**
 * Fonction pour récupérer les informations de l'utilisateur connecté.
 *
 * @returns {Promise<Pick<UserType, "firstname" | "lastname"> | null>} - Promesse contenant les informations de l'utilisateur ou null en cas d'erreur.
 *
 * @example
 * ```ts
 * const userInfo = await getMe()
 * ```
 */
export const getMe = async (): Promise<Pick<UserType, "firstname" | "lastname"> | null> => {

  try {
    // Envoie une requête GET à l'API pour récupérer les informations de l'utilisateur connecté
    const data = await fetchClient<Partial<Pick<UserType, "firstname" | "lastname"> & { detail?: string }>>({
      endpoint: "/api/me",
      method: "GET"
    })

    // Si les données sont absentes, contiennent un détail d'erreur ou ne contiennent pas les champs firstname et lastname,
    if (!data || "detail" in data || !data.firstname || !data.lastname) {
      
      // Envoie une requête POST à l'API pour rafraîchir le token d'accès
      const refreshed = await fetchClient<{ success: boolean }>({
        endpoint: "/api/refresh",
        method: "POST"
      })

      // Si le rafraîchissement du token a réussi,
      if (refreshed.success) {

        // Envoie à nouveau une requête GET pour récupérer les informations de l'utilisateur
        const retry = await fetchClient<Partial<Pick<UserType, "firstname" | "lastname"> & { detail?: string }>>({
          endpoint: "/api/me",
          method: "GET"
        })

        // Si les données de l'utilisateur sont présentes et contiennent les champs firstname et lastname,
        if (retry && retry.firstname && retry.lastname) {

          // Retourne les informations de l'utilisateur
          return { firstname: retry.firstname, lastname: retry.lastname }
        }
      }
      return null
    }
    // Retourne les informations de l'utilisateur connecté
    return { firstname: data.firstname, lastname: data.lastname }
  } catch {
    return null
  }
}