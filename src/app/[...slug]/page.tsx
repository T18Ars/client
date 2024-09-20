import { Fragment } from 'react'
import CategoriesPage from "./categories-page";
import GamePage from "./game-page";

type Props = {
    params: { slug: string }
}

export default function SlugPage({params} : Props){
    const slug = params.slug

    return(
        <Fragment>
            {slug.length === 1 &&
            <CategoriesPage slug={slug[0]} />
            }
            {slug.length === 2 &&
            <GamePage slugCate={slug[0]} slugGame={slug[1]}/>
            }
        </Fragment>
    );
}