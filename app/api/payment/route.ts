import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour traiter le paiement et enregistrer la réservation.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant le statut du paiement.
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {
    // Récupération du token d'accès depuis le cookie HTTPOnly
    const access = request.cookies.get("access")?.value

    if (!access) {
      // Si le cookie d'accès n'existe pas, retourne une réponse 401
      return NextResponse.json({ detail: "Non authentifié" }, { status: 401 })
    }

    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
    const backendUrl = `${process.env.API_URL}/booking/payment`

    // Envoi d'une requête POST au backend pour traiter le paiement et enregistrer la réservation
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`
      },
      body: JSON.stringify(await request.json())
    })

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Retourne les détails du paiement réussi
    return NextResponse.json(data, { status: response.status })

  } catch (error) {
    // Si une erreur se produit lors du traitement du paiement, retourne une réponse 500
    return NextResponse.json({ detail: "Erreur lors du traitement du paiement" }, { status: 500 })
  }
}