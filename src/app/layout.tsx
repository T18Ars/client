import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from 'next/font/google'
import { cn } from "@/lib/utils";
import envConfig from "../config";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import Script from "next/script";
import AppProvider from "@/components/app-provider";
import Head from "./head";

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})


export const metadata: Metadata = {
  title: "Play games",
  description: "Dive into an exciting world of online games! Explore a wide variety of free games, from action-packed adventures to brain-teasing puzzles. Play now and challenge your skills with our fun and engaging gaming experience for players of all ages!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(envConfig.NEXT_PUBLIC_API_ENDPOINT);
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        {/* <meta name="description" content="Anime Template" /> */}
        <meta name="keywords" content="Anime, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta http-equiv="X-UA-Compatible" content="ie=edge" /> */}
        {/* <title>Anime | Template</title> */}
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="css/elegant-icons.css" type="text/css" />
        <link rel="stylesheet" href="css/plyr.css" type="text/css" />
        <link rel="stylesheet" href="css/nice-select.css" type="text/css" />
        <link rel="stylesheet" href="css/owl.carousel.min.css" type="text/css" />
        <link rel="stylesheet" href="css/slicknav.min.css" type="text/css" />
        <link rel="stylesheet" href="css/style.css" type="text/css" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        
      <AppProvider>
        <Head />
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
                                <Link href="./"><img src="img/logo.png" alt="" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="footer__nav">
                                <ul>
                                    <li className="active"><Link href="./">Homepage</Link></li>
                                    <li><Link href="./categories.html">Categories</Link></li>
                                    <li><Link href="./blog.html">Our Blog</Link></li>
                                    <li><Link href="#">Contacts</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <p>
                              Copyright &copy; All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <Link href="https://colorlib.com" target="_blank">Colorlib</Link>
                            </p>

                          </div>
                      </div>
                  </div>
            </footer>

            <div className="search-model">
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="search-close-switch"><i className="icon_close"></i></div>
                <form className="search-model-form">
                    <input type="text" id="search-input" placeholder="Search here....." />
                </form>
              </div>
            </div>
        <Script src="js/jquery-3.3.1.min.js" />
        <Script src="js/bootstrap.min.js" />
        <Script src="js/player.js" />
        <Script src="js/jquery.nice-select.min.js" />
        <Script src="js/mixitup.min.js" />
        <Script src="js/jquery.slicknav.js" />
        <Script src="js/owl.carousel.min.js" />
        <Script src="js/main.js" />
      </body>
    </html>
  );
}
