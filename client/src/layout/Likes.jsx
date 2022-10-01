import { useContext } from "react"
import { DataContext } from "../App"

import Container from "../components/Container"

export default function Likes() {

    const dataContext = useContext(DataContext);

    const { likedItemData } = dataContext || {};

    const totalLikes = likedItemData.length
    
    return(
        <>
        {totalLikes === 0 ? 
            <div className="mt-16">
                <span className="text-lg">You have no liked items</span>
            </div> :
        <Container/>
        }
        
        </>
    )
}