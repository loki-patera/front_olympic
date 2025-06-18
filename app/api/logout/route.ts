import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour déconnecter un utilisateur.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP indiquant le succès de la déconnexion.
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {

    // Récupèration du token d'accès depuis le cookie HTTPOnly
    const access = request.cookies.get('access')?.value

    // Si le token d'accès existe
    if (access) {

      // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
      const backendUrl = `${process.env.API_URL}/user/logout`

      // Envoi d'une requête POST au backend pour déconnecter l'utilisateur
      await fetch(backendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json'
        }
      })
    }

    // Création d'une réponse JSON indiquant le succès de la déconnexion
    const res = NextResponse.json({ success: true }, { status: 200 })

    // Suppression des cookies d'accès et de rafraîchissement
    res.cookies.set('access', '', { maxAge: 0, path: '/' })
    res.cookies.set('refresh', '', { maxAge: 0, path: '/' })

    // Retourne la réponse de déconnexion
    return res

  } catch (error) {

    // Si une erreur se produit lors de la déconnexion, retourne une réponse 500
    return NextResponse.json({ detail: "Erreur lors de la déconnexion" }, { status: 500 })
  }
}