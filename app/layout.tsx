import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LightningCath Stock List & Lead Time Portal',
  description: 'Search stock inventory, estimate lead times, and request quotes for medical device manufacturing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

