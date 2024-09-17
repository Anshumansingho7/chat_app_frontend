import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/avtar.webp'
import Input from '../../components/input'

function Dashboard({ currentUser }) {
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    const fetchConversations = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/chatrooms', {
        method: 'GET',
        headers: {
          Authorization: `${token}` 
        },
      })
      const resData = await response.json()
      setConversations(resData)
    }
    fetchConversations()
  }, [])

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
        <hr />
        <div className='mx-10 mt-10'>
          <div className='text-primary text-lg'>Chats</div>
          <div>
            {
              conversations.map((conversation) => {
                return (
                  <div className='flex items-center py-8 border-b border-b-gray-300'>
                    <div className='cursor-pointer flex items-center'>
                      <div><img src={Avatar} width={50} height={50} className='' /></div>
                      <div className='ml-6'>
                        <h3 className='text-lg font-semibold'>{}</h3>
                        <p className='text-sm font-light text-gray-600'>{}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <div className='w-[100%] md:w-[75%] h-screen bg-white flex flex-col items-center'>
      </div>
    </div>
  )
}

export default Dashboard