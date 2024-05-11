import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/Constant';
import VideoCard, { AdVideoCard } from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();

      console.log("Items : ", json?.items);
      setVideos(json?.items);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  //* Using Higher Order Function
  const AdCard = AdVideoCard(VideoCard);

  return (
    <div className='flex flex-wrap'>
      {
        videos.map((video) => (
          <Link
            key={video.id}
            to={"/watch?videoId=" + video?.id}
          >
            {
              video?.statistics?.likeCount > 30000 ?
                (<VideoCard info={video} />)
                :
                (<AdCard info={video} />)
            }
          </Link>
        ))
      }
    </div>
  )
}

export default VideoContainer