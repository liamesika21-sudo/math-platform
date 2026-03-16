import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import 'katex/dist/katex.min.css';

const rubik = Rubik({
  subsets: ['latin', 'hebrew'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'פלטפורמת לימוד מתמטיקה',
  description: 'סביבת לימוד מתמטיקה מובנית עם לוחות קורס, זרימת לימוד שבועית, מעקב מקורות וחזרה ברמת שאלה.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body>{children}</body>
    </html>
  );
}
