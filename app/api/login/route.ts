import { UserType } from '../../types'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API route interne pour connecter un utilisateur existant.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant les informations de connexion de l'utilisateur.
 */
export const POST = async (
  request: NextRequest
): Promise<NextResponse> => {

  try {

    // Récupération des données de la requête
    const { email, password }: Pick<UserType, "email" | "password"> = await request.json()

    // Construction de l'URL de l'API à partir de la variable d'environnement `API_URL`
    const backendUrl = `${process.env.API_URL}/user/login`

    // Envoi des données au backend pour la connexion de l'utilisateur
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    // Conversion de la réponse en JSON
    const data = await response.json()

    // Si la réponse est correcte et contient les tokens d'accès et de rafraîchissement
    if (response.ok && data.access && data.refresh) {

      // Création d'une réponse JSON indiquant le succès de la connexion
      const res = NextResponse.json({ success: true }, { status: 200 })

      // Stockage des tokens d'accès et de rafraîchissement dans des cookies HTTPOnly
      res.cookies.set("access", data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 5
      })
      res.cookies.set("refresh", data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24
      })
      return res
    }

    // Retourne une réponse contenant les données de connexion de l'utilisateur
    return NextResponse.json(data, { status: response.status })
  
  } catch (error) {

    // Si une erreur se produit lors de la connexion, retourne une réponse d'erreur avec le code 500
    return NextResponse.json({ detail: "Erreur interne du serveur" }, { status: 500 })
  }
}