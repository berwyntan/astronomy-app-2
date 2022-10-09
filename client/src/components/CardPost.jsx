import { useState } from "react"
import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"

import AlbumDropdown from "./AlbumDropdown"

export default function CardPost({ 
    item, handleLike, like, handleInteraction, 
    bookmark, mode }) {
    
    const [seeMore, setSeeMore] = useState(false)
    // const [seeAlbum, setSeeAlbum] = useState(false)

    const handleMore = () => setSeeMore(prevState => !prevState)
    // const handleBookmark = () => setSeeAlbum(prevState => !prevState)

    return (
        <div 
            id={`${item?.date}`} 
            onMouseOver={() => handleInteraction(item?.date)} 
            className="z-0 relative"
        >
            <h3 className="text-lg font-semibold mb-2">{item?.title}</h3>
            {
                mode.saves ?
                <img 
                src={item?.url} 
                className="max-w-sm block rounded-xl"
                /> :
                <img 
                data-src={item?.url} 
                className="max-w-sm block lozad rounded-xl"
                />
            }
            
            {like ? 
            <button className="btn btn-square btn-ghost dark:invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartSolid} />
            </button> :
            <button className="btn btn-square btn-ghost dark:invert" onClick={() => handleLike(item)}>
                <img className="h-5" src={heartEmpty} />
            </button> 
            }            
            
            <AlbumDropdown bookmark={bookmark} item={item} />
                        
            {seeMore && <p className="max-w-sm">{item?.explanation}</p>}
            {seeMore === false && <p className="max-h-24 max-w-sm line-clamp-3">{item?.explanation}</p>}
            {seeMore === false && <p onClick={handleMore} className="cursor-pointer font-medium">..more</p>}
            <p className="mb-8 mt-2 font-light">{item?.date}</p>
        </div>
        
    )
    
}