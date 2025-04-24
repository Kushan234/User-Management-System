import React from 'react'
import { FiUsers } from "react-icons/fi";

const Headers = () => {
    
    const navLinks = [
        {
            path: '/',
            title:  "Add Users"
        },
        {
            path : "/viewForm",
            title: "View Users"
        }
    ]
  return (
    <>
    <div className="p-5 bg-lime-100">
        <div className="flex items-center justify-around h-20">
             <FiUsers className='w-10 h-16'/>
            <h1 className='text-2xl font-bold '>USER MANAGEMENT SYSTEM</h1>

            <div className="">
                <ul className='flex gap-14' >
                {
                    navLinks.map((item, index)=>(
                        
                           <a href={item.path}><li key={index}
                            className='text-lg font-semibold'
                            >{item.title}</li>
                            </a>
                    ))
                }
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default Headers