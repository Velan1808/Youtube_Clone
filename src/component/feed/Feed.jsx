import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom' 
import { API_KEY,value_converter } from '../../data'
import moment from 'moment'


const Feed = ({category}) => {  
    
    const [data, setData] = useState([]);

    const fetchData = async() =>{
        const videoList_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=in&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videoList_URL).then(response=>response.json()).then(data=> setData(data.items))
    }

    useEffect(()=>{
        fetchData();
        /* eslint-disable-next-line */
    },[category])

  return (
    <div className='Feed'>
       {data.map((item,index) => {
            return(
                <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            )
             })}
    </div>
  )
}

export default Feed