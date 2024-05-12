import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generateRandomMessage, generateRandomName } from '../utils/helper';

const LiveChat = () => {

  const [liveMessage, setLiveMessage] = useState("");

  const dispatch = useDispatch();
  const chatMessages = useSelector(state => state.chat.messages);

  useEffect(() => {
    const timer = setInterval(() => {
      //* API Pooling
      console.log("API Polling")

      dispatch(addMessage({
        name: generateRandomName(),
        message: generateRandomMessage()
      }))
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const sendMessageHandler = (event) => {
    event.preventDefault();

    dispatch(addMessage({
      name: "Khilesh katre",
      message: liveMessage
    }))

    setLiveMessage("");  
  }

  return (
    <div>
      <div className="w-full h-[550px] ml-2 p-2 border border-slate-400 bg-slate-100 rounded-lg overflow-y-scroll overflow-x-hidden flex flex-col-reverse mt-4 lg:mt-0">
        {
          chatMessages.map((chat, index) => (
            <ChatMessage
              key={index}
              name={chat.name}
              message={chat.message}
            />
          ))
        }
      </div>

      <form
        className="w-full py-2 ml-2 mt-2 rounded-md flex gap-4"
        onSubmit={sendMessageHandler}
      >
        <input
          type="text"
          className='border border-slate-300  bg-slate-100 outline-none px-4 w-full'
          value={liveMessage}
          onChange={(e)=>setLiveMessage(e.target.value)}
        />

        <button className='px-5 py-2 bg-slate-200 rounded-sm font-semibold hover:bg-slate-300 transition-all'>
          Send
        </button>

      </form>
    </div>
  )
}

export default LiveChat