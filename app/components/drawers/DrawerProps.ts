/**
 * Interface `DrawerProps` définissant les propriétés des tiroirs (drawers).
 *
 * @property open - Indique si le tiroir est ouvert ou fermé.
 * @property onClose - Fonction appelée pour fermer le tiroir.
 */
export interface DrawerProps {
  open: boolean
  onClose(): void
}