/**
 * Interface `ModalProps` définissant les propriétés des fenêtres modales.
 * 
 * @property open - Indique si la fenêtre modale est ouverte ou fermée.
 * @property onClose - Fonction appelée pour fermer la fenêtre modale.
 */
export interface ModalProps {
  open: boolean
  onClose(): void
}