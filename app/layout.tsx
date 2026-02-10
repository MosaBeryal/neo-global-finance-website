import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Neo Global Finance | Professional Accountancy Services',
  description: 'Expert accountancy and financial advisory services for global businesses. Strategic financial planning, tax optimization, and compliance management.',
  keywords: 'accountancy, accounting services, tax consulting, financial advisory, bookkeeping',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon.svg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Neo Global Finance | Professional Accountancy Services',
    description: 'Expert accountancy and financial advisory services for global businesses',
    type: 'website',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_geist.className} antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
