import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour récupérer les informations de l'utilisateur connecté.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant les informations de l'utilisateur.
 */
export const GET = async (
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
    const backendUrl = `${process.env.API_URL}/user/me`

    // Envoi d'une requête GET au backend pour récupérer les informations de l'utilisateur connecté
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`
      }
    })

    if (!response.ok) {
      // Si la réponse n'est pas correcte, retourne une réponse 401
      return NextResponse.json({ detail: "Token invalide" }, { status: 401 })
    }

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Retourne les informations de l'utilisateur connecté
    return NextResponse.json(data)
  
  } catch (error) {

    // Si une erreur se produit lors de la récupération des informations de l'utilisateur, retourne une réponse 500
    return NextResponse.json({ detail: "Erreur lors de la récupération des informations de l'utilisateur" }, { status: 500 })
  }
}