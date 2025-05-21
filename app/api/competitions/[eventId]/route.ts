import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour récupérer les compétitions liées à un événement spécifique.
 * 
 * @param {NextRequest} request - Requête HTTP entrante.
 * @param {Promise<{ eventId: string }>} props.params - Paramètres de l'URL, incluant `eventId`.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant les compétitions.
 */
export const GET = async (
  request: NextRequest,
  props: { params: Promise<{ eventId: string }> }
): Promise<NextResponse> => {

  // Récupération des paramètres de l'URL
  const params = await props.params

  if (!params.eventId) {
    // Si le paramètre `eventId` est manquant, retourne une réponse d'erreur avec le code 400
    return NextResponse.json({ error: "L'identifiant de l'événement est requis" }, { status: 400 })
  }

  try {
    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL` et du paramètre `eventId`
    const backendUrl = `${process.env.API_URL}/event/competitions/${params.eventId}`

    // Récupération des compétitions depuis le backend
    const response = await fetch(backendUrl)

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Retourne une réponse contenant les compétitions
    return NextResponse.json(data, { status: 200 })

  } catch (error) {

    // Si une erreur se produit lors de la récupération des compétitions, retourne une réponse d'erreur avec le code 500
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
  }
}