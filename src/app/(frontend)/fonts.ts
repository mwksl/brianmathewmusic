import { Cormorant } from 'next/font/google'

export const customFont = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-custom',
  display: 'swap',
})
