import React, { useState } from 'react';
import ChatModal from './chatModal'  ;
import { FaAngleDown } from 'react-icons/fa';
import {  IoChatboxEllipsesSharp } from 'react-icons/io5';

const chatButton = () => {
    const [chatModal, setChatModal] = useState(false);
  return (
    <div>
        { chatModal && <ChatModal setChatModal={setChatModal}  />}

        <div className={` ${ chatModal ? ' rounded-[50%] ' : ' rounded-[30px]'} fixed bottom-0 right-0 m-6 w-fit bg-yellow-400 p-4 flex items-center `}>
            {
                !chatModal ? <><div className='flex items-center cursor-pointer  gap-1 text-bold text-gray-950' onClick={() => setChatModal(true)}>  < IoChatboxEllipsesSharp className=" text-2xl" /><div className='  text-[16px] font-bold'>Chat with us</div> </div></> : <div onClick={() => setChatModal(false)}>
                <FaAngleDown className=" cursor-pointer  text-gray-950 text-2xl " /></div>
        
            }
        </div>
    </div>
  )
}

export default chatButton