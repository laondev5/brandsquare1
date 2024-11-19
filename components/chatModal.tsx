import Image from "next/image";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
 

interface Props {
  setChatModal: (value: boolean) => void;
}
const messages = [
    { id: 1, sender: "user", text: "Hi, I need help with my order.", time: "10:00 AM" },
    { id: 2, sender: "bot", text: "Sure! Can you please provide your order ID?", time: "10:01 AM" },
    { id: 3, sender: "user", text: "It's 123456.", time: "10:02 AM" },
    { id: 4, sender: "bot", text: "Thank you! Let me check that for you.", time: "10:03 AM" },
  ];
  
const chatModal: React.FC<Props> = ({ setChatModal }) => {
  const closeModal = () => {
    setChatModal(false);
  };
  const [chatUiModal, setChatUiModal] = useState(false);
//    const [input, setInput] = useState('');
   const [message, setMessage] = useState({
    text: ' ',
    sender: 'user',
    id: messages.length + 1,
    time: new Date().toLocaleTimeString()});
//   const socket = new WebSocket('backend-endpoint');
// useEffect(() => {
//     // Listen for messages from the server
//     socket.onmessage = (event) => {
//       const newMessage = JSON.parse(event.data);
//       setMessages((prev) => [...prev, newMessage]);
//     };
//   }, []);

//   const sendMessage = () => {
//     if (input.trim()) {
//       const message = { text: input, sender: 'user' };
//       socket.send(JSON.stringify(message));
//       setMessages((prev) => [...prev, message]);
//       setInput('');
//     }
//   };

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement >): void => {
//     const { name, value } = e.target;
//    setMessage((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement >) => {
    setMessage({ ...message, text: e.target.value });
  };

  const handleSend = () => {
    messages.push(message);
    console.log(messages);
    setMessage((prev) => ({
        ...prev,
        text: '',
        id: messages.length + 1,
        time: new Date().toLocaleTimeString(),
    }))
}
  return (
    <div>
      <div className="fixed top-28  left-1/2   transform -translate-x-1/2 md:-translate-x-0 md:left-[60%]  min-h-[80vh] md:max-h-[20vh]  md:w-[40vw] w-[90vw] lg:w-[30vw]  rounded-2xl   bg-white shadow-lg">
      {!chatUiModal ? <><div className="bg-[#000035] max-w-[800px] w-full p-6 rounded-lg">
          <div className="header flex justify-between items-center">
            <Image src="/images/logo.png" alt="logo" width={100} height={100} />
            <div onClick={closeModal}>
              <FaAngleDown className="text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl text-white font-bold">Welcome!</h1>

            <p className="   text-white">Hi, how can we help you?</p>
          </div>
        </div>
        <div className=" flex flex-col items-center justify-center mx-3"> 
        <div className=" absolute  z-50  left-4 right-4 p-1 top-[140px] mt-1 rounded-md shadow-lg min-h-[50vh] md:h-[58vh] mb-5 bg-white">
           <div className=" flex flex-col  justify-between  gap-40 items-center">
            <div> 
            <h4 className=" font-medium  text-[17px] md:text-[21px] px-2 leading-7 pt-3 text-center">Start a conversation with our team of experts now!</h4>
            <div className="grid place-items-center  pt-4" > 
            <Image src="/images/chat.png"  alt="chat" width={100} height={100} /></div>
           </div>
           <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex items-center"> 
           <Button onClick={() => setChatUiModal(true)}
          type="submit"
          className="w-full bg-yellow-400 font-bold   hover:bg-yellow-500 text-black"
        >
Start a conversation        </Button></div>
           </div>
        </div>
        </div></> : <><div className="bg-[#000035] px-4 py-6">
            <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-2"> 
                <span> <Image src="/images/logo.png" alt="logo" width={50} height={50} /></span>
                <span className=" text-white text-[13px] font-semibold">Chat support</span>
                </div>
                <div onClick={closeModal}>
                    <FaAngleDown className=" cursor-pointer  text-white" /></div>
            </div>
            </div><div className="chat-messages mx-3">
     {messages.map((msg, index) => (
      <div
      key={index} 
      className={`message-container flex flex-col ${
        msg.sender === 'user' ? 'items-end' : 'items-start'
      } my-2`}
    >
      <div
        className={`message p-2 rounded-lg ${
          msg.sender === 'user'
            ? 'bg-yellow-500 text-black'
            : ' bg-gray-100 text-black'
        }`}
      >
        {msg.text}
      </div>
      <div
        className={`time text-gray-500 text-xs ${
          msg.sender === 'user' ? 'text-right' : 'text-left'
        }`}
      >
        {msg.time}
      </div>
    </div>
    ))}
      <div className="chat-input fixed bottom-0 left-0 w-full bg-white p-4 flex items-center border-t">
    <input
      type="text"
      onChange={handleInputChange}
      value={message.text}
      placeholder="Type a message..."
      className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
    />
    <button onClick={handleSend}
      className="bg-[#000035] text-white px-4 py-2 rounded-r-lg hover:bg-[#000035ec] transition"
       
    >
      Send
    </button>
  </div>
  </div>
  </>}
         
      </div>
    </div>
  );
};


export default chatModal;
