import React from 'react'
import Button from './Button';
import BUTTON_LIST from "../data/ButtonList";

const ButtonList = () => {
  return (
    <div className='flex'>
      {
        BUTTON_LIST.map((name, index) => (
          <Button key={index} name={name} />
        ))
      }
    </div>
  )
}

export default ButtonList