import "./globals.css";
import { Work_Sans } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/app/components/toastProvider/toastProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Arredio - Vinicius Capistrano",
  description: "Disponível em todas as plataformas digitais.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={workSans.className}>
      <body className={`antialiased`}>
        <>
          {children}
          <ToastProvider />
        </>
      </body>
    </html>
  );
}
