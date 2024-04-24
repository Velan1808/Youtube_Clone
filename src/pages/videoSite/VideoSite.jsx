import React from 'react'
import './VideoSite.css'
import PlayVideo from '../../component/playvideo/PlayVideo'
import Recommanded from '../../component/recommanded/Recommanded'
import { useParams } from 'react-router-dom'
const VideoSite   = () => {
  const {videoId , categoryId} = useParams();
  
  return (
    <div className="play-container">
       <PlayVideo videoId={videoId}/>
       <Recommanded categoryId={categoryId} />
    </div>
  )
}

export default VideoSite