import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from 'next/font/google'
import { cn } from "@/lib/utils";
import envConfig from "@/config";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "@/i18n/routing";
import Script from "next/script";
import AppProvider from "@/components/app-provider";
import Head from "./head";
import categoriesApiRequest from "@/apiRequests/categories";
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import SwitchLanguage from '@/components/switch-language'
import { locales } from '@/config'
import { unstable_setRequestLocale } from 'next-intl/server'
import {routing} from '@/i18n/routing';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})
type cate = {
  id: string,
  slug: string,
  ten: string,
  title: string,
  description: string,
  img: string,
  so_thu_tu: number,
  children: cate[],
  ds_games: Array<cate>,
}

export function generateStaticParams() {
  return routing.locales.map((locale: any) => ({locale}));
  // return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: "Play games",
  description: "Dive into an exciting world of online games! Explore a wide variety of free games, from action-packed adventures to brain-teasing puzzles. Play now and challenge your skills with our fun and engaging gaming experience for players of all ages!",
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  unstable_setRequestLocale(locale)
  let menu: cate[]
  const { payload } = await categoriesApiRequest.getCateMenu()
  menu = payload as cate[]
  // const locale = await getLocale()
  const messages = await getMessages()
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        {/* <meta name="description" content="Anime Template" /> */}
        <meta name="keywords" content="Anime, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta http-equiv="X-UA-Compatible" content="ie=edge" /> */}
        {/* <title>Anime | Template</title> */}
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/elegant-icons.css" type="text/css" />
        <link rel="stylesheet" href="/css/plyr.css" type="text/css" />
        <link rel="stylesheet" href="/css/nice-select.css" type="text/css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" type="text/css" />
        <link rel="stylesheet" href="/css/style.css" type="text/css" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
      <NextIntlClientProvider messages={messages}>
        <AppProvider>
          <header className="header">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-2">
                          <div className="header__logo">
                              <Link href="/">
                                  <img src="/img/logo.png" alt="" style={{width: '95px'}} />
                              </Link>
                          </div>
                      </div>
                      <div className="col-lg-8">
                          <div className="header__nav">
                              <nav className="header__menu mobile-menu">
                                  <ul>
                                      {menu?.map((cate: cate) => (
                                          <li key={cate.id}>
                                              <Link href={cate.slug}>{cate.ten}{cate.children.length > 0 &&<span className="arrow_carrot-down"></span>}</Link>
                                              {cate.children.length > 0 &&
                                              <ul className="dropdown">
                                                  {cate.children?.map((cateChildren: cate) => (
                                                      <li key={cateChildren.id}><Link href={`/${cateChildren.slug}`}>{cateChildren.ten}</Link></li>
                                                  ))}
                                              </ul>
                                              }
                                          </li>
                                      ))}
                                  </ul>
                              </nav>
                          </div>
                      </div>
                      <Head />
                  </div>
                  <div id="mobile-menu-wrap"></div>
              </div>
          </header>
          <Toaster />
          {children}
          
          </AppProvider>
        <footer className="footer">
                <div className="page-up">
                    <Link href="#" id="scrollToTopButton"><span className="arrow_carrot-up"></span></Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="footer__logo">
                                <Link href="/"><img src="/img/logo.png" alt="" style={{width: '95px'}} /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="footer__nav">
                                <ul>
                                    <li className="active"><Link href="/">Homepage</Link></li>
                                    <li><Link href="./categories.html">Categories</Link></li>
                                    <li><Link href="./blog.html">Our Blog</Link></li>
                                    <li><Link href="#">Contacts</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 d-flex justify-content-end">
                          <SwitchLanguage />
                        </div>
                      </div>
                  </div>
            </footer>
        </NextIntlClientProvider>

            <div className="search-model">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="search-close-switch"><i className="icon_close"></i></div>
                <form className="search-model-form">
                    <input type="text" id="search-input" placeholder="Search here....." />
                </form>
              </div>
            </div>
        <Script src="/js/jquery-3.3.1.min.js" />
        <Script src="/js/bootstrap.min.js" />
        <Script src="/js/player.js" />
        <Script src="/js/jquery.nice-select.min.js" />
        <Script src="/js/mixitup.min.js" />
        <Script src="/js/jquery.slicknav.js" />
        <Script src="/js/owl.carousel.min.js" />
        <Script src="/js/main.js" />
      </body>
    </html>
  );
}
