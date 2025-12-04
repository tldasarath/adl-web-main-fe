import BackToTopButton from '@/Components/Common/BackToTopButton'
import './globals.css'

export const metadata = {
  title: 'ADL Business Solutions',
  description: 'Professional business setup services in UAE by ADL Business Solutions. Expert support for company formation, licensing, visas, and PRO services.',
verification: {
    google: "sKOgyWsAKMY3Fd_rE7Ij7R3MF1ACVdVqGaY7czz2wf8",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}
          <BackToTopButton />
      </body>
    </html>
  )
}