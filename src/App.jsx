import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/navbar/Navbar'
import Home from './pages/home/Home';
import VideoSite from './pages/videoSite/VideoSite'
import { useState } from 'react';

function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div className="App">
      <Navbar setSidebar ={setSidebar} />
      <Routes>
         <Route path='/' element={<Home  sidebar={sidebar}/>} />   
         <Route path={'/video/:categoryId/:videoId'} element={<VideoSite />} />
      </Routes>
    </div>
  );
}

export default App;
