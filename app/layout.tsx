import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import favIcon from "@/public/assets/images/logo.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompts AI",
  description: "Discover and Share AI prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favIcon.src} type="image/svg+xml" />
      </head>
      <body>
        <Provider>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
