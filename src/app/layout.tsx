import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Client Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased bg-background text-foreground flex h-screen overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-muted/10">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
