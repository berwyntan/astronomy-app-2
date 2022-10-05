import { useContext } from 'react'
import { DataContext } from '../App'
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth";

import Calendar from "./Calendar"

export default function Navbar() {
    const dataContext = useContext(DataContext)

    const { 
        handleScrollToTop, mode, handleDatePicker, handleDateSearch, searchDate, 
        handleRandomView, handleLatestView, handleFeedView, handleGridView, handleLikeMode,
        handleAlbumsMode, feedView, handleAlbumTab
    } = dataContext || {}

    const { isAuth, setIsAuth, authDetails } = useAuth();

    const handleLogout = () => {
        setIsAuth(false);
    }

    return (
        <div className="navbar bg-slate-50 dark:bg-slate-800 fixed top-0 z-50">
            <div className="flex-1">
                <span 
                    className="hidden sm:btn sm:btn-ghost sm:normal-case sm:text-base"
                    onClick={handleScrollToTop}>
                        Astronomy
                </span>
            </div>

            <div className="tabs flex items-baseline">           
                
                <Link to="/">
                    <span className={`tab tab-sm tab-bordered ${mode.latest && "tab-active"}`} onClick={handleLatestView}>
                        Latest
                    </span>
                </Link>
                <Link to="/shuffle">
                    <span className={`tab tab-sm tab-bordered ${mode.random && "tab-active"}`} onClick={handleRandomView}>
                        Shuffle
                    </span>
                </Link>
                
                <span className={`tab tab-sm tab-bordered ${feedView && "tab-active"}`} onClick={handleFeedView}>Feed</span>
                <span className={`tab tab-sm tab-bordered ${feedView || "tab-active"}`} onClick={handleGridView}>Grid</span>
                
                {/* <Link to="/search"> */}
                    <span className={`tab tab-sm tab-bordered ${mode.search && "tab-active"}`} onClick={handleDatePicker}>
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
                        className={`tab tab-sm tab-bordered ${mode.saves && mode.isAtAlbumsTab===false && "tab-active"}`} 
                        onClick={handleLikeMode}
                    >
                        Likes
                    </span>
                </Link>                
                
                <Link to="/albums">
                    <span 
                        className={`tab tab-sm tab-bordered ${mode.isAtAlbumsTab && "tab-active"}`} 
                        onClick={handleAlbumTab}
                    >
                        Albums
                    </span>
                </Link>
                {
                    isAuth
                    ? 
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full">
                            <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            {/* <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li> */}
                            <li className='ml-4 font-semibold'>{authDetails.userName}</li>
                            {/* <li>
                                <Link to="/likes">
                                    <span 
                                        // className={`tab tab-sm tab-bordered ${mode.saves && mode.isAtAlbumsTab===false && "tab-active"}`} 
                                        onClick={handleLikeMode}
                                    >
                                        Likes
                                    </span>
                                </Link>         
                            </li>
                            
                            <li>
                                <Link to="/albums">
                                    <span 
                                        // className={`tab tab-sm tab-bordered ${mode.isAtAlbumsTab && "tab-active"}`} 
                                        onClick={handleAlbumTab}
                                    >
                                        Albums
                                    </span>
                                </Link>
                            </li> */}
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                    : <Link to="/login">
                            <span className={`tab tab-sm tab-bordered`} >
                                Login
                            </span>
                        </Link>
                }               
                
                
            </div>            
        </div>
    )
}

