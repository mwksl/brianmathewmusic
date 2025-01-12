import localFont from 'next/font/local'

export const customFont = localFont({
  src: [
    {
      path: './fonts/FatMolly-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
})
