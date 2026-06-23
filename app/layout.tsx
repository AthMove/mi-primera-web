import "./globals.css";
import "@fontsource/inter";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ATHMOV",
  description: "Marketplace deportivo premium",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
