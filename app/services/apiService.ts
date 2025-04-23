/**
 * Service pour effectuer des requêtes API
 */
export const apiService = {

  /**
   * Envoie une requête GET asynchrone à l'URL spécifiée et retourne une promesse avec les données JSON
   *
   * @param url - L'URL de l'endpoint à appeler (sera ajoutée à l'URL de base définie dans les variables d'environnement)
   * @returns Une promesse qui résout les données JSON ou rejette une erreur
   *
   * @example
   * ```typescript
   * const data = await apiService.get('/example-endpoint')
   * ```
   */
  get: async function (url: string): Promise<any> {

    // Création et retour d'une nouvelle Promise pour gérer la requête HTTP
    return new Promise((resolve, reject) => {

      // Appel de l'API via `fetch`, en utilisant la base URL définie dans les variables d'environnement
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {

        // Spécification de la méthode HTTP GET
        method: 'GET',
        // En-têtes de la requête HTTP pour indiquer qu'on accepte et envoie du JSON
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        // Conversion de la réponse HTTP en JSON 
        .then((response) => response.json())

        // Résolution de la Promise avec les données JSON si tout se passe bien 
        .then((json) => {
          resolve(json)
        })

        // Rejet de la Promise en cas d'erreur lors de l'exécution de la requête
        .catch((error) => {
          reject(error)
        })
    })
  }
}