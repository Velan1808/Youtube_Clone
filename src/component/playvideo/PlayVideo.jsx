import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/megan.png'
import { useEffect, useState } from 'react'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
 
  const {videoId} = useParams()
  const [apiData, setApiData] = useState(null)
  const [commentData, setCommentData] = useState(null)


  const fetchVideoData = async()=>{
    const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
  }

  const fetchOtherData =async () =>{

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=40&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(res => res.json()).then(data=>setCommentData(data.items))

  }

  useEffect(()=>{
    fetchVideoData();
    // eslint-disable-next-line
  },[videoId])

  useEffect(()=>{
    fetchOtherData();
    // eslint-disable-next-line
  },[apiData])
        
  return (
    <div className="play-video">
          <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}title="s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          
          <h3>{apiData?apiData.snippet.title:"Title here"} </h3>
          <div className="play-video-info">
                <p>{apiData?value_converter(apiData.statistics.viewCount) :"15k"} views &bull;  {apiData? moment(apiData.snippet.publishedAt).fromNow():""}</p>
                <div>
                    <span><img src={like} alt="" />{apiData? value_converter(apiData.statistics.likeCount):"15K"}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
          </div>

          <hr />

          <div className="publisher">
                <img src={jack} alt="" />
                <div>
                    <p>{apiData?apiData.snippet.channelTitle:"Channel Name"}</p>
                    <span>1M Subscribers</span>
                </div>
                    <button>subscribe</button>
          </div>

          <div className="video-discription">
            <p>{apiData?apiData.snippet.description.slice(0,250):"Description here"}</p>
          <hr />
          <h4> {apiData?value_converter(apiData.statistics.commentCount):"200"} comments</h4>
           {/* eslint-disable-next-line */}
          {commentData?commentData.map((item,index)=>{
            return(
              <div key={index} className="comments">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span> 1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="commemnt-action">
                        <img src={like} alt="" />
                        <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
             </div>
            )
          }):""}
       </div>   
    </div>
  )
}

export default PlayVideo