import { useContext, useEffect } from 'react'
import { DataContext } from '../App'

import AlbumCover from '../components/AlbumCover'

export default function Albums() {

    const dataContext = useContext(DataContext);
    const { albumData, handleAddAlbumForm, updateAlbumForm, handleAlbumTab,
        mode, handleAddNewAlbum, handleAlbumsMode, updateAlbumsToServer
        , handleTitle } = dataContext || {};
    // console.log(albumData)
    
    const numOfAlbums = albumData.albums.length;
    
    const albumCovers = albumData.albums.map((album, index) => {
        // console.log(album.data);
        // console.log("-------")
        const name = album.name;
        const route = album.route;
        const length = album.data.length;
        const data = album.data;
        let url;
        // console.log(length);
        if (length === 0) {
            url = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        } else {
            url = album.data?.[0].url;
        }  
        
        return(
            <AlbumCover
                name={name}
                route={route} 
                data={data}
                url={url}
                length={length}
                handleAlbumsMode={handleAlbumsMode}
                key={index}
            />
        )
    })

    // set albumTab mode
    useEffect(() => {
        const delay = () => setTimeout(handleAlbumTab(), 0);
        setTimeout(delay, 0);
        return (clearTimeout(delay));        
    }, []);

    // for deleting albums
    useEffect(() => {updateAlbumsToServer
        ()}, []);

    useEffect(() => {
        const newTitle = "Albums - Astronomy";
        handleTitle(newTitle);
    }, [])

    return(
        
        <div className="mt-20 ml-8">
            
            <div className='flex justify-end mr-8'>
                {
                mode.isAddingAlbum ? 
                <form className='flex'>
                    <input 
                        type="text" 
                        onChange={updateAlbumForm} value={albumData.form} 
                        placeholder="album name"
                        className="input input-bordered input-sm w-full max-w-xs"
                    />
                    <button className="btn btn-sm" onClick={handleAddNewAlbum}>Add</button>
                </form> :
                <button className="btn btn-sm" onClick={handleAddAlbumForm}>Add album</button>
                }      
            </div>
            {numOfAlbums === 0 && 
                <div className="mt-16">
                    <span className="text-lg">You have no albums</span>
                </div>         
            }
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                xl:grid-cols-5 gap-4 justify-center mt-16 container mx-auto'>
            {albumCovers}
            </div>
        </div>
        
    )
}