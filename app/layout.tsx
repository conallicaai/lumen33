import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LUMEN | Chatbot Educativo STEAM+ODS',
  description: 'Un asistente interactivo tipo ciber-pulpo para aprender STEAM y sostenibilidad.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
