import { CompetitionType } from '@/app/types'
import { fetchClient } from '../fetchClient'

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

  // Récupération des compétitions liées à un événement sportif depuis l'API interne
  const competitions = await fetchClient<CompetitionType[]>({
    endpoint: `/api/competitions/${eventId}`,
    method: 'GET'
  })

  // Retourne les compétitions
  return competitions
}