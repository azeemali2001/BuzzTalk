import React, { useContext } from 'react'
import cam from '../img/cam.png'
import add from '../img/add.png'
import more from '../img/more.png'
import Messages from './Messages'
import Input from '../Component/Input'
import { ChatContext } from '../Context/ChatContext'

const Chat = () => {

  const { data } = useContext(ChatContext);
  

  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className='chatIcon'>
          <img src={cam} alt=''/>
          <img src={add} alt=''/>
          <img src={more} alt=''/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat