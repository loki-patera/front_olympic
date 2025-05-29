import { fetchClient } from '../fetchClient'

/**
 * Fonction pour vérifier si un email existe dans la base de données.
 * 
 * @param email - Adresse email à vérifier.
 * @returns {Promise<boolean>} - Promesse contenant true si l'email existe, sinon false.
 * 
 * @example
 * ```ts
 * const exists = await checkEmailExists("email@example.com")
 * ```
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {

  // Vérifie si l'email existe en effectuant une requête POST à l'API
  const result = await fetchClient<{ exists: boolean }>({
    endpoint: "/api/check-email",
    method: "POST",
    data: { email }
  })

  // Retourne true si l'email existe, sinon false
  return result.exists
}