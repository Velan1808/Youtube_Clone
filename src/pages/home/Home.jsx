import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../component/sidebar/Sidebar'
import Feed from '../../component/feed/Feed'

const Home = ({sidebar}) => {

  const [category, setCategory] = useState(0);

  return (
    <div className='Home'>
       <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
       <div className={`container ${sidebar?"":"large-container"}`}>
         <Feed category={category}/>
       </div>
    </div>
  )
}

export default Home