'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartType } from '../types'
import { getCartDetails } from '../../lib/api'

/**
 * Interface `CartItem` représentant une entrée dans le panier.
 * 
 * @property id_event - Identifiant de l'événement associé à l'entrée du panier.
 * @property id_offer - Identifiant de l'offre associée à l'entrée du panier.
 */
export interface CartItem {
  id_event: number
  id_offer: number
}

/**
 * Interface `CartContextType` représentant le type du contexte du panier.
 * 
 * @property cart - Tableau d'éléments de type `CartItem` représentant les réservations dans le panier.
 * @property addToCart - Fonction pour ajouter une réservation au panier.
 * @property clearCart - Fonction pour vider le panier.
 * @property removeFromCart - Fonction pour supprimer une réservation du panier.
 * @property cartDetails - Détails des réservations dans le panier.
 */
export interface CartContextType {
  cart: CartItem[]
  addToCart(item: CartItem): void
  clearCart(): void
  removeFromCart(item: CartItem): void
  cartDetails: CartType[]
}

// Création du contexte pour le panier
const CartContext = createContext<CartContextType | undefined>(undefined)

/**
 * Hook `useCart` pour accéder au contexte du panier.
 * 
 * @returns {CartContextType} - Contexte du panier contenant les détails et la fonction d'ajout.
 */
export const useCart = (): CartContextType => {

  // Utilisation du hook useContext pour accéder au contexte du panier
  const context = useContext(CartContext)

  // Lance une erreur si le contexte n'est pas défini
  if (!context) throw new Error("Le hook useCart doit être utilisé à l’intérieur d’un CartProvider")
  
  // Retourne le contexte du panier
  return context
}

/**
 * Composant `CartProvider` pour fournir le contexte du panier à l'application.
 * 
 * @param {React.ReactNode} children - Composants enfants qui auront accès au contexte du panier.
 * 
 * @example
 * ```tsx
 * <CartProvider>
 *    <Component />
 * </CartProvider>
 * ```
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {

  // État pour stocker les identifiants des réservations
  const [cart, setCart] = useState<CartItem[]>([])

  // État pour stocker les détails des réservations
  const [cartDetails, setCartDetails] = useState<CartType[]>([])

  // Fonction pour ajouter une réservation au panier
  function addToCart(item: CartItem) {
    setCart(prev => [...prev, item])
  }

  // Fonction pour vider le panier
  function clearCart() {
    setCart([])
    setCartDetails([])
  }

  // Fonction pour supprimer une réservation du panier
  function removeFromCart(item: CartItem) {
    setCart(prev =>
      prev.filter(
        (cartItem) =>
          !(cartItem.id_event === item.id_event && cartItem.id_offer === item.id_offer)
      )
    )
  }

  useEffect(() => {
    // Si aucune réservation, vide le tableau des détails du panier
    if (cart.length === 0) {
      setCartDetails([])
      return
    }
    // Récupère les détails des réservations à partir de l'API
    getCartDetails(cart)
      .then(setCartDetails)             // Met à jour l'état avec les détails des réservations
      .catch(() => setCartDetails([]))  // En cas d'erreur, vide le tableau des détails des réservations
  }, [cart])

  return (
    // Fournit le contexte du panier avec les détails et la fonction d'ajout aux composants enfants
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, cartDetails }}>
      {children}
    </CartContext.Provider>
  )
}