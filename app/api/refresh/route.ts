import { NextRequest, NextResponse } from 'next/server'

export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {

    // Récupération du token de rafraîchissement depuis le cookie HTTPOnly
    const refresh = request.cookies.get('refresh')?.value

    if (!refresh) {
      // Si le cookie de rafraîchissement n'existe pas, retourne une réponse 401
      return NextResponse.json({ success: false }, { status: 401 })
    }

    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
    const backendUrl = `${process.env.API_URL}/user/token/refresh`

    // Envoi d'une requête POST au backend pour rafraîchir le token d'accès
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    })

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Si la réponse est correcte et contient un nouveau token d'accès
    if (response.ok && data.access) {
      
      // Création d'une réponse JSON indiquant le succès du rafraîchissement
      const res = NextResponse.json({ success: true }, { status: 200 })

      // Stockage du nouveau token d'accès dans un cookie HTTPOnly
      res.cookies.set('access', data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 5
      })
      return res
    }

    // Si la réponse n'est pas correcte, retourne une réponse 401
    return NextResponse.json({ success: false }, { status: 401 })

  } catch (error) {

    // Si une erreur se produit lors du rafraîchissement du token, retourne une réponse 500
    return NextResponse.json({ success: false }, { status: 500 })
  }
}