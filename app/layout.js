
export const metadata = {
  title: "Kiera AI",
  description: "Personal AI Assistant created by Prins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
