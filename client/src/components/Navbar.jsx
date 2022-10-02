import { useContext, useState } from 'react'
import { DataContext } from '../App'
import { Link } from "react-router-dom"
import Calendar from "./Calendar"

export default function Navbar() {
    const dataContext = useContext(DataContext)

    const { 
        handleScrollToTop, mode, handleDatePicker, handleDateSearch, searchDate, 
        handleRandomView, handleLatestView, handleFeedView, handleGridView, handleLikeMode,
        handleAlbumsMode, feedView, handleAlbumTab
    } = dataContext || {}

    return (
        <div className="navbar bg-slate-50 dark:bg-slate-800 fixed top-0 z-50">
            <div className="flex-1">
                <span 
                    className="btn btn-ghost normal-case text-lg"
                    onClick={handleScrollToTop}>
                        Astronomy
                </span>
                {/* <div class="dropdown hover:bg-slate-900/25">
                    <div className="flex items-center">
                        <label tabindex="0" class="btn btn-ghost rounded-btn">   
                        <img class="h-5 ml-4 invert" src={caretDown} />
                        </label>
                    </div>
                    <ul tabindex="0" class="menu dropdown-content p-1 shadow bg-slate-900 text-slate-50 rounded-box w-52 mt-1">
                        <li><a>Latest photos</a></li> 
                        <li><a>Random photos</a></li>
                    </ul>
                </div> */}
            </div>
            <div className="tabs">
                {/* <ul className="menu menu-horizontal p-0"> */}
                <Link to="/">
                    <span className={`tab tab-bordered ${mode.latest && "tab-active"}`} onClick={handleLatestView}>
                        Latest
                    </span>
                </Link>
                <Link to="/shuffle">
                    <span className={`tab tab-bordered ${mode.random && "tab-active"}`} onClick={handleRandomView}>
                        Shuffle
                    </span>
                </Link>
                <span className={`tab tab-bordered ${feedView && "tab-active"}`} onClick={handleFeedView}>Feed</span>
                <span className={`tab tab-bordered ${feedView || "tab-active"}`} onClick={handleGridView}>Grid</span>
                
                {/* <Link to="/search"> */}
                    <span className={`tab tab-bordered ${mode.search && "tab-active"}`} onClick={handleDatePicker}>
                        Search
                    </span>
                    {mode?.isSearching && <Calendar 
                        handleDateSearch={handleDateSearch}
                        searchDate={searchDate}
                        />
                    }
                {/* </Link>                 */}
            
                <Link to="/likes">
                    <span 
                        className={`tab tab-bordered ${mode.saves && mode.isAtAlbumsTab===false && "tab-active"}`} 
                        onClick={handleLikeMode}
                    >
                        Likes
                    </span>
                </Link>                
                
                <Link to="/albums">
                    <span 
                        className={`tab tab-bordered ${mode.isAtAlbumsTab && "tab-active"}`} 
                        onClick={handleAlbumTab}
                    >
                        Albums
                    </span>
                </Link>
                
                
            </div>            
        </div>
    )
}

