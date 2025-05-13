/**
 * Fonction pour formater une date au format "jour mois année"
 * 
 * @param {string} dateString - Chaîne de caractères représentant la date à formater
 * @returns {string} - Date formatée au format "jour mois année"
 * 
 * @example
 * ```ts
 * const formattedDate = formatDate("2023-10-25")
 * console.log(formattedDate) // "25 octobre 2023"
 * ```
 */
export const formatDate = (dateString: string): string => {

  const date = new Date(dateString)

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date)
}


/**
 * Fonction pour formater une heure au format "hh:mm"
 * 
 * @param {string} timeString - Chaîne de caractères représentant l'heure à formater
 * @returns {string} - Heure formatée au format "hh:mm"
 * 
 * @example
 * ```ts
 * const formattedTime = formatTime("14:30:00")
 * console.log(formattedTime) // "14:30"
 * ```
 */
export const formatTime = (timeString: string): string => {

  const [hours, minutes] = timeString.split(":")
  
  return `${hours}h${minutes}`
}