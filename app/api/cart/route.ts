import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour récupérer les données pour le panier.
 * 
 * @param {NextRequest} request - Requête HTTP entrante.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant les données pour le panier.
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {

    // Récupération des données JSON postées dans la requête
    const items = await request.json()

    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
    const backendUrl = `${process.env.API_URL}/event/cart`

    // Récupération des données pour le panier depuis le backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    })

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Retourne une réponse contenant les données pour le panier
    return NextResponse.json(data, { status: 200 })

  } catch (error) {

    // Si une erreur se produit lors de la récupération des données pour le panier, retourne une réponse d'erreur avec le code 500
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}