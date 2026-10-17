import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bảng Điểm Bida Bắn Đền Hà Nội",
  description: "Ứng dụng ghi điểm, chia lượt cơ và quy đổi tiền bida bắn đền chuyên nghiệp",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="bg-[#070b12] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
