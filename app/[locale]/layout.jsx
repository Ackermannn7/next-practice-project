import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { NextIntlClientProvider, useMessages } from "next-intl";

export const metadata = {
  title: "Prompts for All",
  description: "Discover & Share AI Prompts",
};
const RootLayout = ({ children, params: locale }) => {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Provider>
          <NextIntlClientProvider messages={messages}>
            <div className="main">
              <div className="gradient" />{" "}
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </NextIntlClientProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
