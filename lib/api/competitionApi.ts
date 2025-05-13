import { CompetitionType } from '../../app/types'

/**
 * Fonction pour récupérer les compétitions liées à un événement sportif spécifique.
 * 
 * @param eventId - L'ID de l'événement pour lequel récupérer les compétitions.
 * @returns {Promise<CompetitionType[]>} - Promesse contenant un tableau d'objets de type {@link CompetitionType}.
 * 
 * @example
 * ```ts
 * const competitions = await getCompetitionsByEvent(1)
 * ```
 */
export const getCompetitionsByEvent = async (eventId: number): Promise<CompetitionType[]> => {

  // Récupération des compétitions liées à un événement sportif depuis l'API
  const res = await fetch(`/api/competitions/${eventId}`, {
    method: 'GET'
  })

  if (!res.ok) {
    // Si la réponse n'est pas correcte, lève une erreur
    throw new Error(`Erreur lors de la récupération des compétitions : ${res.statusText}`)
  }

  // Parse la réponse JSON
  const response = await res.json()

  return response
}