import { PersonType } from './personType'

/**
 * Type `UserType` étendant {@link PersonType} pour inclure les propriétés spécifiques à un utilisateur.
 * 
 * @property email - Adresse e-mail de l'utilisateur.
 * @property password - Mot de passe de l'utilisateur.
 */
export type UserType = PersonType & {

  email: string
  password: string
}