import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


import './global.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { CartProvider } from '@/contexts/CartContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'geology',
  description: 'Описание сайта',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="dnd-body">
         <CartProvider>
          <Header />
          <main className="mainContent">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}