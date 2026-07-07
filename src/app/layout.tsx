import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday — A Love Letter in Code",
  description:
    "A premium, handcrafted birthday experience. Every pixel tells a story.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Happy Birthday — A Love Letter in Code",
    description:
      "A premium, handcrafted birthday experience. Every pixel tells a story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NoiseOverlay />
        <ParticlesBackground />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
