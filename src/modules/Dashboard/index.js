import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/avtar.webp'
import Input from '../../components/input'
import './index.css';

function Dashboard({ currentUser }) {
  const [conversations, setConversations] = useState([])
  console.log(conversations)

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
    <div className='w-screen flex h-screen'>
      <div className='w-[100%] md:w-[25%] h-screen bg-secondary '>
        <div className='flex items-center my-8 mx-14'>
          <div className='border border-primary p-2 rounded-full'>
            <img src={Avatar} width={75} height={75} className='' />
          </div>
          <div className='ml-8'>
            <h3 className='text-2xl'>{currentUser.username}</h3>
            <p className='text-lg font-light'>Active</p>
          </div>
        </div>
        <hr />
        <div className='mx-10 mt-10 h-[77%] overflow-y-auto'>
          <div className='text-primary text-lg'>Chats</div>
          <div>
            {conversations.map((conversation) => {
              return (
                <div className='flex items-center py-8 border-b border-b-gray-300'>
                  <div className='cursor-pointer flex items-center'>
                    <div>
                      <img src={Avatar} width={50} height={50} className='' />
                    </div>
                    <div className='ml-6'>
                      <h3 className='text-lg font-semibold'>{conversation.other_user.username}</h3>
                      <p className='text-sm font-light text-gray-600'>Active</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='w-[100%] md:w-[75%] h-screen bg-white flex flex-col items-center'>
        <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14'>
          <div className='cursor-pointer'>
            <img src={Avatar} width={50} height={50} className='' />
          </div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-lg'>Alexander</h3>
            <p className='text-sm font-light text-gray-600'>online</p>
          </div>
          <div className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              <path d="M15 9l5 -5" />
              <path d="M15 5l0 4l4 0" />
            </svg>
          </div>
        </div>

        <div className='h-[75%] w-full overflow-scroll shadow-sm scrollbar-hide flex flex-col-reverse'>
          <div className='px-10 py-14'>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </div>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
            <div className='max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            </div>
          </div>
        </div>

        <div className='p-14 w-full flex items-center'>
          <Input placeholder="Type a message..." InputclassName="w-[75%]" className='p-4 border-0 shadow-lg rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
          <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
          <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard