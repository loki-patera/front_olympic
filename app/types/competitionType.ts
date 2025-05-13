import { EventType } from "./eventType"

/**
 * Type `CompetitionType` définissant les propriétés d'une compétition.
 * 
 * @property id_competition - Identifiant unique de la compétition.
 * @property description - Description de la compétition.
 * @property gender - Genre de la compétition (Femmes, Hommes, Mixte).
 * @property phase - Phase de la compétition.
 * @property event - Événement sportif associé à la compétition.
 */
export type CompetitionType = {
  
  id_competition: number
  description: string
  gender: "Femmes" | "Hommes" | "Mixte"
  phase: string | null
  event: EventType
}