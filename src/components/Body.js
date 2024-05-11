import React from 'react'
import Sidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';

const Body = () => {
    return (
        <div className='flex overflow-x-hidden' >
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Body