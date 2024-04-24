import React, { useEffect, useState } from 'react'
import './Recommanded.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommanded = ({categoryId}) => {

    const [apiData, setApiData] = useState([])

    const fetchData = async() =>{
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=37&chart=mostPopular&regionCode=in&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
    }
    
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    },[])
  return (
    <div className="recommanded">
               
             {apiData?apiData.map((item,index)=>{
                return(
                   <Link to={`/video/${item.snippet.categoryId}/${item.id}`}>
                        <div key={index} className="side-video-list">
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="vid-info">
                                <h4>{item.snippet.title}</h4>
                                <p>{item.snippet.channelTitle}</p>
                                <p className='viewCount'>{value_converter(item.statistics.viewCount)} Views</p>
                            </div>
                        </div> 
                    </Link>            
                )
            }):"related video is not availble"}
    </div>
  )
}

export default Recommanded