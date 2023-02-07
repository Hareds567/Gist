import "./globals.css";
import Header from "./header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-background-color text-title-text  `}>
        <Header />
        {children}
      </body>
    </html>
  );
}
