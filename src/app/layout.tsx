import './globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';

const basierSquare = localFont({
  src: '../../src/public/fonts/Basier_Regular/Basier Regular Webfont/Basier-Square-regular-webfont/basiersquare-regular-webfont.woff',
  display: 'swap',
  weight: '400',
  variable: '--font-basier-square',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${basierSquare.variable} font-sans`}>{children}</body>
    </html>
  );
}
