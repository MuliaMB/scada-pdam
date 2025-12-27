// app/(app)/layout.tsx
import "../globals.css";
import "leaflet/dist/leaflet.css";
import Sidebar from "../component/sidebar";
import Header from "../components/layout/Header";
import { SidebarProvider } from "../context/SidebarContext";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SCADA Dashboard',
  description: 'Real-time SCADA monitoring and control system',
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}