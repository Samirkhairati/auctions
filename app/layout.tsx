import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/services/theme-provider";
import Navbar from "@/components/layout/navbar";
import ToasterContext from "@/services/toaster-context";
import AuthContext from "@/services/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Auctions",
  description: "A Live Bidding platform",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <ToasterContext />
            <div className="flex min-h-screen w-full flex-col">
              <Navbar />
              <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </AuthContext>

      </body>
    </html>
  );
}
