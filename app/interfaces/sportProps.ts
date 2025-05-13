import { SportType } from '../types'

/**
 * Interface `SportProps` définissant les propriétés des épreuves sportives.
 * 
 * @property sports - Tableau des objets de type {@link SportType} représentant les différents épreuves sportives.
 */
export interface SportProps {
  
  sports: SportType[]
}