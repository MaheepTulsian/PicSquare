import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='h-screen w-full bg-[#212121]'>

      <Sidebar />
      {/* <div className='p-4 rounded-3xl fixed top-4 left-6 bottom-4 '>
        {/* sidebar 
      </div> */}


      {/* conent area */}
      <div className='w-3/4 overflow-y-scroll no-scrollbar rounded-3xl fixed top-4 right-6 bottom-4 bg-[#373737]'> 
        <Outlet />
      </div>
      
    </div>
  )
}

export default Dashboard
