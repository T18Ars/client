'use client'

import gamesApiRequest from "@/apiRequests/games";
import { Link } from "@/i18n/routing";
import { gameDetail } from "@/lib/utils";
import { useEffect, useState } from "react";
import $ from "jquery"

export default function Search() {
    const [search, setSearch] = useState('')
    const [gamesSearch, setGamesSearch] = useState<gameDetail[]>([])

    useEffect(() => {
        if(search && search.length > 2){
            const fetchDataRelate = async () : Promise<gameDetail[]> => {
                const { payload } = await gamesApiRequest.getGamesSearch(search)
                return payload as gameDetail[];
            }
            fetchDataRelate().then(res => {
                setGamesSearch(res)
            })
        }
        else{
            setGamesSearch([])
        }
    }, [search])

    const handleSearch = (val: string) => {
        setSearch(val)
    }

    const hideSearchModel = () => {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    }

    return (
        <div className="search-model">
            <div className="h-100 d-flex justify-content-center search-model-div">
                <div className="search-close-switch"><i className="icon_close"></i></div>
                <form>
                    <div className="inner-form">
                        <div className="input-field first-wrap">
                            <input id="search" type="text" autoFocus placeholder="What game do you want to play?" onChange={(val) => handleSearch(val.target.value)}/>
                        </div>
                        {/* <div className="input-field third-wrap">
                        <button className="btn-search" type="button">SEARCH</button>
                        </div> */}
                    </div>
                    {gamesSearch.length > 0 &&
                    <div className="result d-flex flex-column p-3 mt-2">
                        <div className="lts_data_search">
                            {gamesSearch?.map(game => {
                                return(
                                    <div className="game_item d-flex align-items-center">
                                        <div className="game_img mr-3">
                                            <img src={game.img} alt={game.ten} title={game.ten} />
                                        </div>
                                        <div className="game_title">
                                        <Link href={`/${game.slug_category}/${game.slug}`} title={game.ten} onClick={hideSearchModel}>{game.ten}</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {gamesSearch.length > 1 &&
                        <div className="view_all text-center mt-3">
                            <Link href={`/search?game=${search}`} title="View all result" class="mt-3" onClick={hideSearchModel}>View all result ({gamesSearch.length} game)</Link>
                        </div>
                        }
                    </div>
                    }
                </form>
            </div>
        </div>
    )
}