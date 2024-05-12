import React from 'react'
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom';
import CommentsContainer from './CommentsContainer';
import LiveChat from './LiveChat';

const WatchPage = () => {
    
    const [searchParams] = useSearchParams();
    // console.log(searchParams);
    const videoId = searchParams.get('videoId');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeMenu());
    }, []);

    return (
        <div className="flex flex-col w-full">
            <div className="px-5 flex w-full flex-col lg:flex-row">
                <div>
                    <iframe
                        className='h-[550px] w-[880px] lg:w-[1100px]'
                        src={"https://www.youtube.com/embed/" + videoId}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className='w-full'>
                    <LiveChat/>
                </div>
            </div>
            <CommentsContainer/>
        </div>
    )
}

export default WatchPage;