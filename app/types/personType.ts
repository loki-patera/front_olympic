/**
 * Type `PersonType` définissant les propriétés d'une personne.
 * 
 * @property id_person - Identifiant unique de la personne.
 * @property firstname - Prénom de la personne.
 * @property lastname - Nom de famille de la personne.
 * @property date_of_birth - Date de naissance de la personne.
 * @property country - Pays de résidance de la personne.
 */
export type PersonType = {

  id_person: string
  firstname: string
  lastname: string
  date_of_birth: string
  country: string
}