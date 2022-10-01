import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { DataContext } from '../App'

import bookmarkEmpty from "../icons/bookmark-empty.svg"
import bookmarkSolid from "../icons/bookmark-solid.svg"

export default function AlbumDropdown({ bookmark, item }) {

    const dataContext = useContext(DataContext);

    const { albumData, handleBookmark } = dataContext || {};

    const albumNames = albumData.albums.map((album, index) => {
        
        const found = album.data.find(info => info.date === item.date)        

        return (            
            <li key={index}>
                <a onClick={() => handleBookmark(album, item, found)}>
                    {album.name}
                    {
                    found ?
                    <img className='h-4 dark:invert' src={bookmarkSolid} /> :
                    <img className='h-4 dark:invert' src={bookmarkEmpty} />
                    }                    
                </a>
            </li>          
        )
    })

    const numOfAlbums = albumData.albums.length

    return(
        <div className="dropdown dropdown-right">
            <label tabIndex={0}>
                {bookmark ?
                    <button className="btn btn-square btn-ghost dark:invert">
                        <img className="h-5" src={bookmarkSolid} />
                    </button> :
                    <button className="btn btn-square btn-ghost dark:invert">
                        <img className="h-5" src={bookmarkEmpty} />
                    </button>            
                }
            </label>
                <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-40">
                    {albumNames}    
                    { numOfAlbums > 0 || <li><Link to="/albums">Add an album</Link></li> }
                </ul>
        </div>
            
        
    )
}