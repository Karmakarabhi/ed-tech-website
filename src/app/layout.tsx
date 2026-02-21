import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gandhi University — Psychology-Driven Self-Mastery Programs",
    description:
        "Evidence-based psychology programs for Indian men. Master your mind through CBT, emotional intelligence, discipline, and depth psychology. Built on research, not hype.",
    keywords: [
        "psychology programs",
        "self-mastery",
        "CBT",
        "emotional intelligence",
        "Gandhi University",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Rajdhani:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-background antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    storageKey="gandhi-theme"
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
