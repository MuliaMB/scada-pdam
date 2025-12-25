import "./globals.css";
import "leaflet/dist/leaflet.css"; 
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast'; 

export const metadata: Metadata = {
  title: 'SCADA PDAM',
  description: 'Login or Register to access the SCADA dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" reverseOrder={false} /> {/* Add the Toaster component */}
        {children}
      </body>
    </html>
  );
}
