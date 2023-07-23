import './globals.css';
import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

import Header from './components/header';

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
      <body className={sourceCodePro.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
