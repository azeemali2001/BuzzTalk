import React from 'react'
import Sidebar from '../Component/Sidebar'
import Chat from '../Component/Chat'

function Home() {
  return (
    <div className='home'>
        <div className='container'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home