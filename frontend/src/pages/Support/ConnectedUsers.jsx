import React, { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import 'daisyui/dist/full.css';
import potat from '../../assets/potat.jpg'
import searchIcon from '../../assets/magnifying-glass.png'
import therapistIcon from '../../assets/therapist.png'
import similarIcon from '../../assets/compatible.png'
import chat from '../../assets/chat.png'

const url = "http://localhost:3000"

const ConnectedUsers = ({connectedUserList, setConnectedUserList, targetUser, setTargetUser, socket, currentUser, joinChat, setShowTherapist, setShowSimilar}) => {
    const [searchName, setSearchName] = useState("")
    const [searchList, setSearchList] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredUserId, setHoveredUserId] = useState(null);

    console.log("Search Name: ", searchName);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(searchName !== ""){fetch("http://localhost:3000/search/users/" + searchName)
    .then(res => res.json())
    .then(res => {
        const r = res.data.filter((u) => u.username !== currentUser.username)
        console.log(r);
        setSearchList(r)
    })}else{
        setSearchList([])
    }
  }, [searchName])

  return (
    <>
      

      <div className="p-4 bg-neutral text-neutral-content h-[680px]">

      <button
        id="dropdownSearchButton"
        onClick={handleClick}
        className="btn btn-primary ml-4 text-primary-content"
      >
        <img src={searchIcon} className='h-6 w-6'/>
      </button>
      <button onClick={() => {
        setShowTherapist(true)
        setShowSimilar(false)
      }} className='btn btn-primary ml-4'>
        <img src={therapistIcon} className='h-6 w-6'/>
      </button>
      <button onClick={() => {
        setShowSimilar(true)
        setShowTherapist(false)
      }} className='btn btn-primary ml-4'>
        <img src={similarIcon} className='h-6 w-6'/>
      </button>

      <Menu
        id="dropdownSearch"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdownSearchButton',
          'className': 'bg-base-100 w-[400px] h-[500px]'
        }}
        className="z-50"
      >
        <div className="p-3">
          <label htmlFor="input-group-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
              <svg
                className="w-4 h-4 text-base-content"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="input-group-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search user"
              onChange={(event) => {
                if(event.target.value == null){
                    setSearchName("")
                }else{
                    setSearchName(event.target.value)
                }
            }}
              value={searchName}
            />
          </div>
        </div>
        <ul className="h-[350px] px-3 pb-3 overflow-y-auto text-sm text-base-content">
        {searchList && searchList.map((user) => (
          <li key={user.id} className="my-2">
            <div 
              className="flex items-center ps-2 rounded border border-base-100 hover:border-info"
              onMouseEnter={() => setHoveredUserId(user.id)}
              onMouseLeave={() => setHoveredUserId(null)}
            >
              <p className="p-4 text-lg">
                {user.username}
              </p>
              {hoveredUserId === user.id && (
                <button className="mr-2 ml-auto btn btn-primary" onClick={() => joinChat(user)}>
                  <img src={chat} className='h-6 w-6'/>
                </button>
              )}
            </div>
          </li>
        ))}
        </ul>
      </Menu>

        <div className="h-[500px] overflow-y-auto overflow-x-hidden">
          <h2 className='p-4 font-bold text-[25px]'>Connected users:</h2>
          {connectedUserList.map((u) => {
            if (u.id !== currentUser.id) {
              return (
                <div className="m-2 pl-4 bg-base-100 border border-info rounded-lg">
                    <div className="flex items-center justify-between rounded-lg">
                        <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full ring-2 ring-neutral" src={potat} alt="Rounded avatar" />
                        <p key={u.id} className="p-2 m-4 font-medium text-[20px]">
                            {u.username}
                        </p>
                        </div>
                        <button className="btn btn-primary ml-auto mr-3">
                        <img src={chat} className="w-6 h-6" onClick={() => joinChat(u)} alt="Chat" />
                        </button>
                    </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
}

export default ConnectedUsers;