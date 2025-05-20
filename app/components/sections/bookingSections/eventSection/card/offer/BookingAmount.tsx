/**
 * Interface `BookingAmountProps` définissant les propriétés du composant {@link BookingAmount}.
 * 
 * @property subTotal - Montant total avant réduction.
 * @property discount - Montant de la réduction appliquée.
 * @property total - Montant total après application de la réduction.
 */
export interface BookingAmountProps {
  subTotal: number
  discount: number
  total: number
}

/**
 * Composant `BookingAmount` pour afficher le montant total de la réservation.
 * 
 * @example
 * ```tsx
 * <BookingAmount
 *    subTotal={subTotal}
 *    discount={discount}
 *    total={total}
 * />
 * ```
 */
export const BookingAmount: React.FC<BookingAmountProps> = ({
  subTotal,
  discount,
  total
}) => {

  return (

    <div className="space-y-2 mt-2 text-center">
      <div className="flex gap-10 text-sm text-gray-500">
        <p>
          Sous-total →&nbsp;
          <span className="font-bold text-bluejo">
            {subTotal.toFixed(2)} €
          </span>
        </p>

        <p>
          Réduction →&nbsp;
          <span className="font-bold text-bluejo">
            {discount} %
          </span>
        </p>
      </div>

      <p className="text-lg font-bold text-gray-500">
        Prix total →&nbsp;
        <span className="text-bluejo">
          {total.toFixed(2)} €
        </span>
      </p>
    </div>
  )
}