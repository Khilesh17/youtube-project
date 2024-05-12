import React from 'react'
import { PROFILE_LOGO } from '../utils/Constant'

const ChatMessage = ({ name, message }) => {
    return (
        <div className="flex items-center shadow-sm p-2">
            <img
                className="h-8"
                alt="user"
                src={PROFILE_LOGO}
            />
            <span className="font-bold px-2">{name}</span>
            <span>{message}</span>
        </div>
    )
}

export default ChatMessage