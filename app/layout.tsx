import Script from "next/script";
import "./../styles/globals.css";
import "./../styles/search-menu.css";
import "./../styles/blogmainpage.css";
import "./../styles/bloglist.css";
import "./../styles/label.css";
import "./../styles/modal.css";
import "./../styles/interes.css";
import { Suspense } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import YandexMetrika from "@/components/YandexMetrika";
import UtmSaver from "@/components/UtmSaver";
import { ThemeProvider } from "./providers/ThemeProvider";
import Cookies from "@/components/Cookies/Cookies";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head></head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ThemeProvider>
          <Suspense fallback={<div></div>}>
            <Header />
            <UtmSaver />
          </Suspense>
          {children}
          <Footer />
          <YandexMetrika />
          <Cookies />
        </ThemeProvider>
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(104563216, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
