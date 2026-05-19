export const metadata = {
  title: "Feeling Zone",
  description: "Aesthetic Sinhala Poetry Community"
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
