import { UserType } from '../../types'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour vérifier si un email existe dans la base de données.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant le résultat de la vérification de l'email.
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {

    // Récupération de l'email pour la vérification
    const { email }: Pick<UserType, 'email'> = await request.json()

    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
    const backendUrl = `${process.env.API_URL}/user/check-email`

    // Récupération du résultat de la vérification de l'email depuis le backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Retourne une réponse contenant les données de vérification de l'email
    return NextResponse.json(data, { status: 200 })

  } catch (error) {

    // Si une erreur se produit lors de la vérification de l'email, retourne une réponse d'erreur avec le code 500
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}