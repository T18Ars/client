'use client'

import gamesApiRequest from "@/apiRequests/games";
import Link from "next/link";
import { useState, useEffect, Fragment } from 'react'

type Props = {
    slugCate: string
    slugGame: string
}
type gameDetail = {
    id: string,
    slug: string,
    ten: string,
    iframe: string,
    title: string,
    description: string,
    img: string,
    is_new: boolean,
    is_trending: boolean,
    is_menu: boolean,
    ten_category: string
}
const initData : gameDetail = {
    id: '',
    slug: '',
    ten: '',
    iframe: '',
    title: '',
    description: '',
    img: '',
    is_new: false,
    is_trending: false,
    is_menu: false,
    ten_category: ''
}

export default function GamePage({slugCate, slugGame} : Props){
    const [gameDetail, setGameDetail] = useState<gameDetail>(initData)

    useEffect(() => {
        const fetchData = async () : Promise<gameDetail> => {
            const { payload } = await gamesApiRequest.getDetail(slugGame)
            return payload as gameDetail;
            
        }
        fetchData().then(res => {
            setGameDetail(res)
        })
    }, [])

    return(
        <Fragment>
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link href="./"><i className="fa fa-home"></i> Home</Link>
                                <Link href={`./${slugCate}`}>{gameDetail.ten_category}</Link>
                                <span>{gameDetail.ten || ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="product-page spad">
                <div className="container">
                    <div className="row">
                        {gameDetail.iframe &&
                        <iframe
                            src={gameDetail.iframe}
                            frameBorder={0}
                            allowFullScreen
                            width="100%"
                            height="800px"
                        />}
                    </div>
                </div>
            </section>
        </Fragment>
    );
}