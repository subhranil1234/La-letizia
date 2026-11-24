import type { Metadata } from "next";
import { Cinzel, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "700", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LA LETIZIA | Exaggerated Minimalism Café & Restro | Kolkata",
  description:
    "An architectural nocturne in Ballygunge, Kolkata under ZeroOne. Waterfall glasshouse, honeycomb lounge, botanical terrace, and restrained restro gastronomy.",
  keywords: [
    "La Letizia",
    "Kolkata Cafe",
    "Ballygunge Restaurant",
    "Park Circus Quest Mall",
    "Exaggerated Minimalism",
    "ZeroOne",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${outfit.variable} ${spaceMono.variable} scroll-smooth`}
    >
      <body className="bg-obsidian text-ivory antialiased selection:bg-gold-illuminated selection:text-obsidian">
        {children}
      </body>
    </html>
  );
}
