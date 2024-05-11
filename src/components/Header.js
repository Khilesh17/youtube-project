import React, { useState, useEffect } from 'react'
import { PROFILE_LOGO, SIDE_BAR_LOGO, YOUTUBE_LOGO, YOUTUBE_SEARCH_API } from '../utils/Constant'
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";


const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const dispatch = useDispatch();
    const searchCache = useSelector(state => state.search);

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }

    const getSearchSuggestions = async () => {
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();

        setSuggestions(json[1]);

        //* Also store in to the cache
        dispatch(cacheResults({
            [searchQuery]: json[1]
        }))
    }

    //* Debouncing
    useEffect(() => {
        //* Api call after every key press
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestions(searchCache[searchQuery]);
            }   
            else {
                getSearchSuggestions();
            }
        }, 200);
        //* But if Difference between 2 Api call is less than 200ms
        //* Then Decline the Api call
        return () => {
            clearInterval(timer);
        }
    }, [searchQuery]);

    /**
        key press -> i
            - Render the  Component
            - useEffect() called
            - Start the time => make api call after 200ms

        lets suppose before 200ms we press another key
        key press -> ip
            - Now the reconciliation process is triggered
            - So Firstly the component will gets destroyed and useEffect return method will gets called (Unmounting state) where we decline the api call by clearing the timeout
            - re-render the component
            - useEffect(searchQuert) called
            - new timer will start and if there is no key press in between 200ms then api call will be made.
    **/


    return (
        <div>
            <div className="grid grid-flow-col p-5 m-2 shadow-lg">
                <div className="flex col-span-1">
                    <img
                        onClick={toggleMenuHandler}
                        className="h-8 cursor-pointer"
                        alt="menu"
                        src={SIDE_BAR_LOGO}
                    />
                    <a href="/">
                        <img
                            className="h-8 mx-2"
                            alt="youtube-logo"
                            src={YOUTUBE_LOGO}
                        />
                    </a>
                </div>
                <div className="col-span-10 px-10">
                    <div className='flex items-center'>
                        <input
                            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full outline-none h-10"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={()=>setShowSuggestions(true)}
                            onBlur={()=>setShowSuggestions(false)}
                        />
                        <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100 h-10 hover:bg-gray-200 transition-all">
                            <FaSearch />
                        </button>
                    </div>


                    {showSuggestions && <div className="absolute z-10 bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
                        <ul>
                            {
                                suggestions.map(suggestion => (
                                    <li
                                        key={suggestion}
                                        className="py-2 px-3 shadow-sm hover:bg-gray-100 flex items-center gap-2">
                                        <FaSearch /> {suggestion}
                                    </li>
                                ))
                            }

                        </ul>
                    </div>}
                </div>

                <div className="col-span-1">
                    <img
                        className="h-8"
                        alt="user"
                        src={PROFILE_LOGO}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header