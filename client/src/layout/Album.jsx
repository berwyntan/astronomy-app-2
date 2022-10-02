import { useState, useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../App"

import Container from "../components/Container"
import Albums from "./Albums";

export default function Album() {

    const dataContext = useContext(DataContext);

    const { albumData, updateAlbumData, updateAlbumsToAirtable, handleAlbumsMode } = dataContext || {};

    const [isRenaming, setIsRenaming] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [newName, setNewName] = useState("");

    let navigate = useNavigate();

    let { albumroute } = useParams();
    // console.log(albumroute);
    // console.log(albumData.albums[0].route);
    const numOfAlbums = albumData.albums.length;
    let checkAlbumExists = false;
    let albumIndex;
    let album;
    for (let i=0; i<numOfAlbums; i++) {
        if (albumroute === albumData.albums[i].route) {
            checkAlbumExists = true;
            albumIndex = i;    
            album = albumData.albums[albumIndex];            
        }
    }

    console.log(album);

    const handleRename = (event) => {
        event.preventDefault();
        setNewName(album.name);
        setIsRenaming(prevState => !prevState);
        setIsDeleting(false);
        if (newName !== "") {
            const route = newName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
            const updatedAlbum = {
                name: newName,
                route: route,
                data: album.data,
            };
            // console.log(updatedAlbum);
            // console.log(albumData);
            let updatedAlbumsAll = albumData;
            updatedAlbumsAll.albums[albumIndex] = updatedAlbum;
            // console.log(updatedAlbumsAll);
            () => updateAlbumData(updatedAlbumsAll);
            // navigate to route causing duplicate album problems
            // navigate(`/${route}`);
            navigate('/albums');
        }
    }

    const updateRenameForm = event => {
        // event.preventDefault();
        const form = event.target.value;
        setNewName(form)
    }
    
    
    const cancelRename = () => {
        setIsRenaming(false);
        setNewName("");
    }

    const confirmDelete = () => {
        setIsDeleting(prevState => !prevState);
        setIsRenaming(false);
    }
    
    const handleDelete = () => {        
        
        setIsDeleting(false);
        let updatedAlbumsAll = albumData.albums;
        updatedAlbumsAll.splice(albumIndex, 1);
        console.log(updatedAlbumsAll);
        updateAlbumData(updatedAlbumsAll);
        navigate(`/albums`);
    }

    // use effect for renaming albums
    useEffect(() => {updateAlbumsToAirtable();}, []);
    // useEffect(() => {updateAlbumsToAirtable();}, [isDeleting]);

    // set albums mode
    useEffect(() => {
        const itemData = album?.data;
        if (itemData) {
            const delay = () => setTimeout(() => handleAlbumsMode(itemData), 0);        
            setTimeout(delay, 100);  
            
            return (clearTimeout(delay)); 
        }
        
               
    }, [albumData]);

    // console.log(albumData)
    console.log("album rendered")
    // console.log(albumIndex)  
    
    return(
        <>
        
        <div className="mt-16 ml-8">
        {
            checkAlbumExists ?
            <>
            <div className="flex justify-end fixed p-2 w-full bg-white z-40 dark:bg-slate-800">
                {
                    isRenaming || <h2 className="mx-2 font-semibold mr-6 text-lg">{album.name}</h2>
                }
                {
                    isRenaming && 
                    <form className='flex'>
                        <input 
                            type="text" 
                            onChange={updateRenameForm} value={newName} 
                            placeholder="album name"
                            className="input input-bordered input-xs w-full max-w-xs"
                        />                    
                    </form>
                }
                
                <button className="btn btn-xs mx-2" onClick={handleRename}>Rename</button>

                {
                    isRenaming &&
                    <button className="btn btn-xs mx-2" onClick={cancelRename}>Cancel</button>
                }
                
                {
                    isDeleting &&
                    <button className="btn btn-xs mx-2 btn-warning" onClick={handleDelete}>Confirm delete?</button>
                }               
                                
                <button className="btn btn-xs mx-2 mr-12" onClick={confirmDelete}>
                    { isDeleting ? "Cancel" : "Delete"}
                </button>
                
                
            </div>           
                <Container />
            </> :
            // <h2>Album Not Found</h2>  
            <Albums />
                     
   
        }
        {album?.data.length === 0 && <span>No photos added!</span>}
        </div>        
        
        </>
    )
}