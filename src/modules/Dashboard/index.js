import React from 'react'
import Avatar from '../../assets/avtar.webp'
import Input from '../../components/input'

function Dashboard({ currentUser }) {
  return (
    <div className='w-screen flex'>
      <div className='w-[100%] md:w-[25%] h-screen bg-secondary'>
        <div className='flex items-center my-8 mx-14'>
          <div className='border border-primary p-2 rounded-full'><img src={Avatar} width={75} height={75} className='' /></div>
          <div className='ml-8'>
            <h3 className='text-2xl'>{ currentUser.username }</h3>
            <p className='text-lg font-light'>Active</p>
          </div>
        </div>
      </div>
      <div className='w-[100%] md:w-[75%] h-screen bg-white flex flex-col items-center'>
      </div>
    </div>
  )
}

export default Dashboard