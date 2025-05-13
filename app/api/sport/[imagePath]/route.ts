import { NextRequest, NextResponse } from 'next/server'

/**
 * API route pour récupérer une image à partir d'une URL construite avec un paramètre `imagePath`.
 *
 * @param {NextRequest} request - Requête HTTP entrante.
 * @param {Promise<{ imagePath: string }>} props.params - Paramètres de l'URL, incluant `imagePath`.
 * 
 * @returns {Promise<NextResponse>} - Promesse de la réponse HTTP contenant l'image.
 */
export const GET = async (
  request: NextRequest,
  props: { params: Promise<{ imagePath: string }> }
): Promise<NextResponse> => {

  // Récupération des paramètres de l'URL
  const params = await props.params 

  if (!params.imagePath) {
    // Si le paramètre `imagePath` est manquant, retourne une réponse d'erreur avec le code 400
    return new NextResponse("Requête invalide", { status: 400 })
  }

  // Construction de l'URL de l'image à partir de la variable d'environnement `API_URL` et du paramètre `imagePath`
  const backendImageUrl = `${process.env.API_URL}/media/sports/${params.imagePath}`

  // Récupération de l'image depuis le backend
  const response = await fetch(backendImageUrl)

  // Conversion de la réponse en buffer binaire pour traiter l'image
  const imageBuffer = await response.arrayBuffer()

  // Retourne une réponse contenant l'image sous forme de buffer
  return new NextResponse(Buffer.from(imageBuffer), {
    headers: {
      // Définit le type MIME de la réponse comme `image/jpeg`
      "Content-Type": "image/jpeg",
      // Définit la politique de cache pour l'image (cache public, durée max de 1 an, immuable)
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}