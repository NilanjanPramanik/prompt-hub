"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard';
import SearchIcon from './SearchIcon';
import Link from 'next/link';
import ProfileCard from './ProfileCard';



export const PromptCardList = ({ data, handleClick }) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (

          <PromptCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export const ProfileCardList = ({data}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((user) => (
        <ProfileCard key={user._id} user={user} />
      ))}
    </div>
  );
}




const Feed = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ posts, setPosts ] = useState([]);
  const [ users, setUsers ] = useState([])
  const [ searchedPrompt, setSearchedPrompt ] = useState([]);
  const [ searchedProfile, setSearchedProfile ] = useState([])
  const [err, setErr ] = useState(null)

  // const [ isHover, setHover] = useState(false)

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }

    const fetchUsers = async () => {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(searchText),
      });
      const data = await response.json();
      // console.log(data)
      setUsers(data)
    };
    
    fetchPosts();
    fetchUsers();
  }, [])

  
  // if(isHover) {
  //   setTimeout(() => {
  //     setHover(false)
  //   }, 1500);
  // }


  const handleSearchChange = async (e) => {
    e.preventDefault();

    if(searchText.length <= 0) return;

    if (searchText[0] === "#") {
      const result = posts.filter((item) => item.tag.match(searchText));
      if(result.length > 0){
        
        setSearchedPrompt(result);
        // console.log(result)
      } else{
        setErr(`${searchText} not found!`)
      }
    } else {

      const result = users.filter((item) => item.username.toLowerCase().match(searchText.toLowerCase()));
      if (result.length > 0) {
        setSearchedProfile(result);
      } else {
        setErr("User not exist!");
      }
    }
    setSearchText("");

    setTimeout(() => {
      setErr(null)
    }, 2000);
  };
  // console.log(users)

// console.log(posts)
  return (
    <section className="feed">
      <form className="flex gap-2 w-full">
        <input
          type="text"
          placeholder={
            "Search for a tag or a username"
          }
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
          // onMouseOver={(e) => setHover(!isHover)}
        />
        <span
          onClick={(e) => handleSearchChange(e)}
          className="bg-white px-2 flex items-center text-black/40 rounded-lg shadow-lg border border-gray-200 cursor-pointer"
        >
          <SearchIcon className=" w-6 " />
        </span>
      </form>

      {
        err && (
          <div>{err}</div>
        )
      }

      {searchedPrompt && (
        <div className="">
          <span className=" text-xl font-semibold text-gray-600 ">
            {searchedPrompt.length > 0 && "Searched Results"}
          </span>
          <div className="-mt-[70px] ">
            <PromptCardList data={searchedPrompt} />
          </div>
        </div>
      )}

      {searchedProfile && (
        <div className="">
          <span className=" text-xl font-semibold text-gray-600 ">
            {searchedProfile.length > 0 && "Searched Results"}
          </span>
          <div className="-mt-[70px] ">
            <ProfileCardList data={searchedProfile} />
          </div>
        </div>
      )}

      <div className="">
        <span className=" text-xl font-semibold text-gray-600">Feed</span>
        <div className="-mt-[70px]">
          <PromptCardList data={posts} />
        </div>
      </div>
    </section>
  );
}

export default Feed