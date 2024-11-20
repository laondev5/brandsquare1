import React from 'react'
import { motion } from "framer-motion";

interface props{
    style: string;
    title:string,
    text:string,
    icon: React.ReactNode
}

const cards:React.FC<props> = ({style, text, title,icon}) => {
  return (
    <div> 
         <motion.div  
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + 0 * 0.2 }}
            >
              <div className={`  border-t-4   pb-10 ${style}  rounded-lg shadow-lg  transition-transform transform   md:hover:scale-105 hover:scale-[1.03]  hover:shadow-lg  text-center  p-4 md:text-left`}>
                
                  <div className=" text-[20px] font-thin "><span>{title}</span></div>
                
                <div>
                  <p className="text-[15px]  py-3 text-gray-700  leading-7 md:leading-8"> {text} </p>   
                </div>
                <div className=" text-[29px] float-right mb-5">
                 {icon}
                </div>
              </div>
            </motion.div>
    </div>
  )
}

export default cards