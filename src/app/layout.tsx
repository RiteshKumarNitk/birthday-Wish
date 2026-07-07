import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { CursorTrail } from "@/components/cursor/CursorTrail";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { Starfield } from "@/components/animations/Starfield";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollConfetti } from "@/components/animations/ScrollConfetti";
import { BackgroundTheme } from "@/components/animations/BackgroundTheme";
import { FirstInteractionMusic } from "@/components/animations/FirstInteractionMusic";

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
  title: "Happy Birthday Tanu — A Love Letter in Code",
  description:
    "A premium, handcrafted birthday experience for Tanu. Every pixel tells a story.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Happy Birthday Tanu — A Love Letter in Code",
    description:
      "A premium, handcrafted birthday experience for Tanu. Every pixel tells a story.",
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
      style={{ backgroundColor: "#050505" }}
    >
      <body>
        <BackgroundTheme />
        <FirstInteractionMusic />
        <NoiseOverlay />
        <Starfield />
        <CustomCursor />
        <CursorTrail />
        <ScrollProgress />
        <ScrollConfetti />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
