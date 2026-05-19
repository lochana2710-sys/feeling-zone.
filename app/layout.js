import "./globals.css";

export const metadata = {
  title: "Feeling Zone",
  description: "Aesthetic Sinhala Poetry Community"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
