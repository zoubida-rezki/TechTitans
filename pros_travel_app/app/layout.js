import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonLayout>
        {children}
        </CommonLayout>
        </body>
    </html>
  );
}