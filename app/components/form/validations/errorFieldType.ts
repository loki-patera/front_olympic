/**
 * Type `ErrorFieldType` pour représenter une erreur de validation de champ
 * 
 * @property {string} message - Le message d'erreur à afficher
 * @property {"warning" | "error"} type - Le type d'erreur (avertissement ou erreur)
 */
export type ErrorFieldType = {
  message: string
  type: "warning" | "error"
}