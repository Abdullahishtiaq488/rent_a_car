import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-arabic",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "سيارتك | تأجير السيارات",
  description: "أفضل خدمة لتأجير السيارات في المملكة العربية السعودية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geist.variable} ${notoKufiArabic.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
