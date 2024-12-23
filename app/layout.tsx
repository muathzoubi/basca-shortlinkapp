import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BASCA App',
  description: 'Simple shortlink app builds with firebase and next.js',
};

interface MinimalistDottedBackgroundProps {
  children: React.ReactNode
  dotColor?: string
  backgroundColor?: string
}

export default function RootLayout({ children,
  dotColor = '#fcd34d', // Light gray dots
  backgroundColor = '#e2e8f0', // White background
}: MinimalistDottedBackgroundProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          style={{
            backgroundColor: backgroundColor,
            backgroundImage: `radial-gradient(${dotColor} 1px, ${backgroundColor} 1px)`,
            backgroundSize: '16px 16px',
          }}>{children}</div></body>
    </html>
  );
}
