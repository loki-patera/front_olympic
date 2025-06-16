import { UserType } from '../../types'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour enregistrer un nouvel utilisateur.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant le résultat de l'enregistrement de l'utilisateur.
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {

    // Récupération de toutes les données nécessaires pour l'enregistrement d'un utilisateur
    const { email, firstname, lastname, date_of_birth, country, password }: Omit<UserType, "id_person"> = await request.json()

    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
    const backendUrl = `${process.env.API_URL}/user/register`

    // Envoi des données au backend pour l'enregistrement de l'utilisateur
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, firstname, lastname, date_of_birth, country, password })
    })

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Retourne une réponse contenant les données de confirmation de l'enregistrement de l'utilisateur
    return NextResponse.json(data, { status: response.status })

  } catch (error) {

    // Si une erreur se produit lors de l'enregistrement, retourne une réponse d'erreur avec le code 500
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}