import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "aTalent Hub",
    template: "%s | aTalent Hub",
  },
  description:
    "aTalent Hub is a modern job portal that connects employers with top talent, offering a streamlined experience for job seekers and recruiters.",
  robots: { index: true, follow: true },
  openGraph: {
    url: "https://www.atalenthub.com",
    title: "aTalent Hub",
    description:
      "aTalent Hub is a modern job portal that connects employers with top talent, offering a streamlined experience for job seekers and recruiters.",
    siteName: "aTalent Hub",
    images: ["https://www.atalenthub.com/logo.png"], // replace with your real logo
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "aTalent Hub",
    description:
      "aTalent Hub is a modern job portal that connects employers with top talent, offering a streamlined experience for job seekers and recruiters.",
    images: ["https://www.atalenthub.com/images/og.png"], // replace with your real og image
  },
  icons: {
    icon: "/atalenthub_logo.svg",
    shortcut: "/atalenthub-logo.png",
    apple: "/atalenthub-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
