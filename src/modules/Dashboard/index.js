import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/avtar.webp'
import { createConsumer } from "@rails/actioncable"
import Input from '../../components/input'
import './index.css';
import { useNavigate } from 'react-router-dom';

function Dashboard({ currentUser }) {
  const [conversations, setConversations] = useState([])
  const [conversation, setConversation] = useState({})
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate()
  const consumer = createConsumer("ws://localhost:8000/cable");  // Replace with your backend URL
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

  useEffect(() => {
    const chatroomChannel = consumer.subscriptions.create(
      { channel: "MessageChannel", chatroom_id: conversation.chatroomId },
      {
        received(data) {
          if (conversation.chatroom_id === data.chatroom_id) {
            setMessages(prevMessages => [...prevMessages, data]);
          }
          if (currentUser.id === data.other_user_id) {
            sendNotification(data.content);
          }
        }
      }
    );
    return () => {
      chatroomChannel.unsubscribe();
    };
  }, [messages]);

  const sendNotification = (data) => {
    Notification.requestPermission().then(permission => {
      if ('Notification' in window) {
        new Notification(data);
      } else {
      }
    });
  };

  useEffect(() => {
    if (search !== '') {
      handleSearch();
    }
  }, [search]);

  useEffect(() => {
    fetchConversations();
    Notification.requestPermission().then(permission => {
      if ('Notification' in window) {
      } else {
      }
    });
  }, [search === '']);

  const fetchMessages = async (user_id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/chatrooms', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id
        })
      });
      const resData = await response.json()
      if (response.ok) {
        setMessages(resData.messages)
        setConversation(resData.chatroom)
      } else {
        alert(resData?.errors);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('An error occurred while fetching messages.');
    }
  };

  const createMessage = async (content, chatroomId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/chatrooms/${chatroomId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: content
      })
    });
    const result = await response.json();
    if (response.ok) {
    } else {
      alert(result?.errors);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      createMessage(message, conversation.chatroom_id);
      setMessage('');
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token')
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/users/sign_in')
    }
  }
  const handleSearch = async (e) => {

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/search?search=${encodeURIComponent(search)}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setConversations(result);

      } else {
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };


  return (
    <div className='w-screen flex h-screen'>
      <div className='w-[100%] md:w-[25%] h-screen bg-secondary '>
        <button onClick={handleLogout}>Logout</button>
        <div className='flex items-center my-8 mx-14'>
          <div className='border border-primary p-2 rounded-full'>
            <img src={Avatar} width={75} height={75} className='' />
          </div>
          <div className='ml-8'>
            <h3 className='text-2xl'>{currentUser.username}</h3>
            <p className='text-lg font-light'>Active</p>
          </div>
        </div>
        <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search Mockups, Logos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
        <hr />
        <div className='text-primary text-lg mt-4 ml-14'>Chats</div>
        <div className='mx-10 mt-5 h-[67%] overflow-y-auto'>
          <div>
            {conversations.length > 0 ? conversations.map((conversation) => {
              return (
                <div className='flex items-center py-8 border-b border-b-gray-300'>
                  <div className='cursor-pointer flex items-center' onClick={() => fetchMessages(conversation.other_user.id)}>
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
            }) : <>no user found!</>}
          </div>
        </div>
      </div>
      <div className='w-[100%] md:w-[75%] h-screen bg-white flex flex-col items-center'>
        {Object.keys(conversation).length > 0 && (
          <>
            <div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14'>
              <div className='cursor-pointer'>
                <img src={Avatar} width={50} height={50} alt="Avatar" />
              </div>
              <div className='ml-6 mr-auto'>
                <h3 className='text-lg'>{conversation.other_user.username}</h3>
                <p className='text-sm font-light text-gray-600'>online</p>
              </div>
              <div className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                  <path d="M15 9l5 -5" />
                  <path d="M15 5l0 4l4 0" />
                </svg>
              </div>
            </div>
            <div className='h-[75%] w-full overflow-scroll shadow-sm scrollbar-hide flex flex-col-reverse'>
              <div className='px-10 py-14'>
                {messages.map((message, index) => (
                  <div
                    key={index} // Add a key to uniquely identify each element
                    className={`max-w-[40%] p-4 mb-6 ${message.user_id === currentUser.id
                      ? 'bg-primary rounded-b-xl rounded-tl-xl ml-auto text-white'
                      : 'bg-secondary rounded-b-xl rounded-tr-xl'
                      }`}
                  >
                    {message.content}
                  </div>
                ))}
              </div>

            </div>
            <div className='p-14 w-full flex items-center'>
              <input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevents the default behavior of Enter key
                    handleSendMessage(); // Calls the function to send the message
                  }
                }}
                className='w-[75%] p-4 border-0 shadow-lg rounded-full bg-light focus:ring-0 focus:border-0 outline-none'
              />
              <div
                className='ml-4 p-2 cursor-pointer bg-light rounded-full'
                onClick={handleSendMessage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14l11 -11" />
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </div>
              <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                  <path d="M9 12h6" />
                  <path d="M12 9v6" />
                </svg>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Dashboard