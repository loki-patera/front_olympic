import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/navigation/Navbar'
import { CartProvider } from './context/CartContext'
import { Footer } from './components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Billetterie JO",
  description: "Ce site est un projet d'étude et n'est pas un site officiel"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <CartProvider>
          <Navbar />

          {children}
        </CartProvider>

        <Footer />
        
      </body>
    </html>
  )
}