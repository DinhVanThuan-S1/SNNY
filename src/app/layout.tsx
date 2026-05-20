import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday My Love ❤️ | Khánh Vy",
  description: "Trang web kỷ niệm ngọt ngào dành tặng riêng cho Khánh Vy nhân ngày sinh nhật tuổi mới đong đầy yêu thương.",
  openGraph: {
    title: "Happy Birthday My Love ❤️",
    description: "Cả thế giới của anh chỉ gói gọn lại bằng tên em.",
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
      lang="vi"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#FFF5F5] dark:bg-[#0F0208] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

