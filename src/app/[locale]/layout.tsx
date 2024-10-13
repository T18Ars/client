import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from 'next/font/google'
import { cn, htmlToTextForDescription } from "@/lib/utils";
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
import { Locale } from '@/config'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import {routing} from '@/i18n/routing';
import { baseOpenGraph } from "@/shared-metadata";
import NextTopLoader from 'nextjs-toploader';

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


export async function generateMetadata({params: { locale }}: {params: { locale: Locale }}) {
  const t = await getTranslations({ locale, namespace: 'HomePage' })
  return {
    title: t('title'),
    description: htmlToTextForDescription(t('description')),
    openGraph: {
      ...baseOpenGraph
    },
    alternates: {
      canonical: envConfig.NEXT_PUBLIC_URL + `/${locale}`,
    }
  }
}
export default async function RootLayout({ children, params: { locale } }: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  unstable_setRequestLocale(locale)
  const commonT = await getTranslations({ locale, namespace: 'Common' })
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
      <NextTopLoader 
        showSpinner={false}
        height={8}
        // template="<div className='bar' role='bar' style='background: linear-gradient(to right, #2c6dd5 0%, #2c6dd5 28%, #ff4b5a 91%, #ff4b5a 100%)'><div className='peg'></div></div><div className='spinner' role='spinner'><div className='spinner-icon'></div></div>"
      />
      <NextIntlClientProvider messages={messages}>
        <AppProvider>
          <header className="header">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-2">
                          <div className="header__logo">
                              <Link href="/" title="logo website">
                                  <img src="/img/logo.png" alt="logo website" title="logo website" style={{width: '95px'}} />
                              </Link>
                          </div>
                      </div>
                      <div className="col-lg-8">
                          <div className="header__nav">
                              <nav className="header__menu mobile-menu">
                                  <ul>
                                      {menu?.map((cate: cate) => (
                                          <li key={cate.id}>
                                              <Link href={`/${cate.slug}`} title={cate.ten}>{cate.ten}{cate.children.length > 0 &&<span className="arrow_carrot-down"></span>}</Link>
                                              {cate.children.length > 0 &&
                                              <ul className="dropdown">
                                                  {cate.children?.map((cateChildren: cate) => (
                                                      <li key={cateChildren.id}><Link href={`/${cateChildren.slug}`} title={cateChildren.ten}>{cateChildren.ten}</Link></li>
                                                  ))}
                                              </ul>
                                              }
                                          </li>
                                      ))}
                                      <li><Link href="/allcategories" title="AllCategories">All Categories</Link></li>
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
                    <Link href="#" title="back to top" id="scrollToTopButton"><span className="arrow_carrot-up"></span></Link>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <div className="footer__logo">
                                <Link href="/" title="logo website"><img src="/img/logo.png" alt="logo website" title="logo website" style={{width: '95px'}} /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <div className="footer__nav">
                                <ul>
                                    <li><Link href='/term-of-service' title={commonT("termOfService")} className='hover:underline' prefetch={false} >{commonT("termOfService")}</Link></li>
                                    <li><Link href='/privacy-policy' title={commonT("privacyPolicy")} className='hover:underline' prefetch={false} >{commonT("privacyPolicy")}</Link></li>
                                    <li><Link href='/about' title={commonT("about")} className='hover:underline' prefetch={false} >{commonT("about")}</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 d-flex justify-content-end">
                          <SwitchLanguage />
                        </div>
                      </div>
                  </div>
            </footer>
        </NextIntlClientProvider>

            <div className="search-model">
              <div className="h-100 d-flex justify-content-center search-model-div">
                <div className="search-close-switch"><i className="icon_close"></i></div>
                <form>
                  <div className="inner-form">
                    <div className="input-field first-wrap">
                      <input id="search" type="text" placeholder="What game do you want to play?" />
                    </div>
                    <div className="input-field third-wrap">
                      <button className="btn-search" type="button">SEARCH</button>
                    </div>
                  </div>
                  <div className="result d-flex flex-column p-3 mt-2">
                    <div className="lts_data_search">
                      <div className="game_item d-flex align-items-center mb-3">
                        <div className="game_img mr-3">
                          <img src="https://gamesgamescdn.com/system/static/thumbs/spil_thumb_big/17321/jpeg_1609755697_Fireboy--Watergirl-3-The-Ice-Temple-200x120.jpg?1692365324" alt="" title="" />
                        </div>
                        <div className="game_title">
                          <Link href="/2d-games/fireboy-watergirl-3-the-ice-temple" title="View all result" >Fireboy & Watergirl 3: The Ice Temple</Link>
                        </div>
                      </div>
                      
                      <div className="game_item d-flex align-items-center mb-3">
                        <div className="game_img mr-3">
                          <img src="https://gamesgamescdn.com/system/static/thumbs/spil_thumb_big/17321/jpeg_1609755697_Fireboy--Watergirl-3-The-Ice-Temple-200x120.jpg?1692365324" alt="" title="" />
                        </div>
                        <div className="game_title">
                          <Link href="/2d-games/fireboy-watergirl-3-the-ice-temple" title="View all result" >Fireboy & Watergirl 3: The Ice Temple</Link>
                        </div>
                      </div>
                    </div>
                    <div className="view_all text-center mt-3">
                      <Link href="" title="View all result">View all result (45 game)</Link>
                    </div>
                  </div>
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
