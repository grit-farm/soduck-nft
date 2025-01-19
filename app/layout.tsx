import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import { ThemeProvider } from "@/components/feature/common/theme-provider";
import Footer from "@/components/feature/common/footer";
import Header from "@/components/feature/common/header";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soduck.xyz"),
  title: {
    default: "soduck | Novel Agent with story protocol",
    template: "%s | Novel Agent with story protocol",
  },
  description: "Novel Agent with story protocol",
  openGraph: {
    title: "soduck | Novel Agent with story protocol",
    description: "Novel Agent with story protocol",
    url: "https://soduck.xyz",
    siteName: "soduck",
    images: ["/images/og.png"],
    locale: "us-US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "soduck | Novel Agent with story protocol",
    description: "Novel Agent with story protocol",
    images: ["/images/og.png"],
    creator: "soduck",
    site: "https://soduck.xyz",
  },
  icons: {
    icon: "/images/icons/apple-icon.png",
    apple: "/images/icons/apple-icon.png",
    other: {
      rel: "apple-icon-precomposed.png",
      url: "/images/icons/apple-icon-precomposed.png",
    },
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }];
}

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) => {
  return (
    <html className="h-full" lang={locale}>
      <body className={`${ubuntu.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

// 10분 단위 캐싱
export const revalidate = 600;

export default RootLayout;
