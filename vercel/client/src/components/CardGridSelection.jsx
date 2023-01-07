import { useContext } from 'react'
import { DataContext } from '../App'
import useAuth from "../hooks/useAuth";

import AlbumDropdown from './AlbumDropdown'

import heartEmpty from "../icons/heart-empty.svg"
import heartSolid from "../icons/heart-solid.svg"
import close from "../icons/x-mark.svg"
import user from "../icons/user.svg"

export default function CardGridSelection() {
    
    const dataContext = useContext(DataContext)
    const { cardGridSingle, handleLike, 
        unloadGridSingleView,
        checkAlbumData, checkLikedItems
    } = dataContext || {}

    const like = checkLikedItems(cardGridSingle.item);
    const bookmark = checkAlbumData(cardGridSingle.item);

    const { updateProfilePhoto } = useAuth();

    return (
        <div className="z-50 fixed top-1 w-screen h-screen left-0 bg-slate-100/95 flex dark:bg-slate-800/95">
                        
            <img 
                src={cardGridSingle.item.url} 
                className="max-w-sm md:max-w-md xl:max-w-xl 2xl:max-w-3xl h-4/5 object-cover ml-8 mt-3"
                />
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <h3 className="text-lg font-semibold ml-2">{cardGridSingle.item.title}</h3>
                    <button className="btn btn-square btn-ghost dark:invert" 
                            onClick={unloadGridSingleView}
                            data-cy="close" //for cypress testing
                            >
                        <img className="h-6" src={close} />
                    </button>
                </div>
                <div className='flex items-center'>
                    {like ? 
                    <button className="btn btn-square btn-ghost dark:invert" onClick={() => handleLike(cardGridSingle.item)} data-cy="unlike">
                        <img className="h-5" src={heartSolid} />
                    </button> :
                    <button className="btn btn-square btn-ghost dark:invert" onClick={() => handleLike(cardGridSingle.item)} data-cy="unlike">
                        <img className="h-5" src={heartEmpty} />
                    </button> 
                    }
                
                    <AlbumDropdown bookmark={bookmark} item={cardGridSingle.item} />

                    <button className="btn btn-square btn-ghost dark:invert" onClick={() => updateProfilePhoto(cardGridSingle.item.url)}>
                        <img className="h-5" src={user} />
                    </button>
                </div>
                <p className="max-w-sm text-xs mx-4 xl:text-sm">{cardGridSingle.item.explanation}</p>
                <p className="ml-4 mt-2 font-light">{cardGridSingle.item.date}</p>

            </div>
            
        </div>
        
    )
    
}