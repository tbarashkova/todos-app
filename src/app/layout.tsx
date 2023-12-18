import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TodosProvider } from "@/context/TodosProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todos app",
  description: "Easy way to manage your todos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <TodosProvider>{children}</TodosProvider>
      </body>
    </html>
  );
}
