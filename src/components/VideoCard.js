import React from 'react'

const VideoCard = ({ info }) => {
    
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;

    return (
        <div className='p-2 m-2 w-72 shadow-lg '>
            <img
                src={thumbnails?.medium?.url}
                alt="thumbnail"
            />

            <div>
                <p className='font-bold py-2'>
                    {title.substring(0, 50) + '...'}
                </p>
                <p className='font-semibold text-lg'>
                    {channelTitle}
                </p>
                <p>
                    {statistics.viewCount} views
                </p>
            </div>
        </div>
    )
}

//* Higher Order Function
export const AdVideoCard = (VideoCard) => {
    return (props) => (
        <div className="scale-75 border border-solid border-gray-600">
            <VideoCard {...props} />
        </div>
    )
}


export default VideoCard