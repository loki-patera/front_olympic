/**
 * Type pour les méthodes HTTP supportées par la fonction {@link fetchClient}.
 */
export type HttpMethod = "GET" | "POST"

/**
 * Options pour la fonction {@link fetchClient}.
 * 
 * @property {string} endpoint - URL de l'API à appeler.
 * @property {HttpMethod} method - Méthode HTTP à utiliser (GET ou POST).
 * @property {unknown} [data] - Données à envoyer dans le corps de la requête (pour les méthodes POST).
 * @property {string} [token] - Jeton d'authentification à inclure dans l'en-tête de la requête.
 */
export interface FetchOptions {
  endpoint: string
  method: HttpMethod
  data?: unknown
  token?: string
}

/**
 * Fonction générique pour effectuer des requêtes HTTP à l'API.
 * 
 * @returns {Promise<T>} - Promesse contenant la réponse de l'API.
 * 
 * @throws {Error} - Si la requête échoue ou si la réponse n'est pas au format attendu.
 * 
 * @example
 * ```ts
 * const response = await fetchClient<MyResponseType>({
 *    endpoint: "/my-endpoint",
 *    method: "GET",
 *    token: "my-token"
 * })
 * ```
 */
export const fetchClient = async <T> ({
  endpoint,
  method,
  data,
  token
}: FetchOptions): Promise<T> => {

  // Si le point de terminaison commence par "/api/"
  const url = endpoint.startsWith("/api/")
    ? endpoint                              // Utilisation de l'URL de l'API interne
    : `${process.env.API_URL}${endpoint}`   // Sinon, utilisation de l'URL construite à partir de la variable d'environnement `API_URL`

  // Initialisation des en-têtes de la requête
  const headers: HeadersInit = {
    // Indique que le corps de la requête est au format JSON
    "Content-Type": "application/json", 
    // Si un jeton d'authentification est fourni, l'ajoute à l'en-tête Authorization
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  // Configuration de la requête avec la méthode, les en-têtes et éventuellement le corps
  const options: RequestInit = {
    method,
    headers,
    ...(method === "POST" ? { body: JSON.stringify(data) } : {}),
    ...(endpoint.startsWith("/api/") ? { credentials: "include" } : {})
  }

  // Effectue la requête à l'API en utilisant l'URL de base et le point de terminaison spécifié
  const res = await fetch(url, options)

  // Tente de convertir la réponse en JSON, sinon retourne un objet vide
  const response = await res.json().catch(() => ({}))

  if (!res.ok && res.status >= 500) {
    // Si la réponse n'est pas correcte, lève une erreur avec le code et le message d'erreur
    const errorMessage = `Erreur ${method} sur ${endpoint}: ${res.status} ${res.statusText}`
    throw new Error(errorMessage)
  }

  return response
}