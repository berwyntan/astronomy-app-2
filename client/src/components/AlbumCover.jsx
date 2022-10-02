import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import { DataContext } from '../App'

export default function AlbumCover({
    name, url, length, route, handleAlbumsMode, data
}) {

    const dataContext = useContext(DataContext);
    const { updateAlbumsToAirtable } = dataContext || {}

    useEffect(() => updateAlbumsToAirtable(), []);

    return(
        
        <div className="flex flex-col items-start">
            <Link to={`/albums/${route}`}>
            <img 
                className="rounded-lg object-cover h-60 mx-auto cursor-pointer lozadr" 
                src={url} 
                onClick={() => handleAlbumsMode(data)}
            />            
            </Link>            
            <h2 className="font-semibold">{name}</h2>                     
            <p className="flex m-1">{`${length} photos`}</p>
        </div>
        
    )
}

