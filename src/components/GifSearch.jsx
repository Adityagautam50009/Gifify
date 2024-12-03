import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2'

const GifSearch = () => {
    const [query, setQuery] = useState('')
   const navigate = useNavigate()
    const searchGIFs = async () =>{
        if(query.trim() === ''){
            return
        }

        navigate(`/search/${query}`)
    }
  return (
    <div className='flex relative'>
      <input type="text" 
       value={query}
       onChange={(e) => setQuery(e.target.value)}
       placeholder='Search all the GIFs and Stickers'
       className='w-full pl-4 pr-14 py-5 text-xl text-black rounded-bl rounded-tl border-gray-300 outline-none'
       />

       {query && (
        <button
         onClick={()=> setQuery('')}
         className='absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-8'>
            <HiMiniXMark size={22} />
         </button>
       )}
       <button
        onClick={searchGIFs}
        className='bg-gradient-to-tr from-pink-600 to-pink-400 text-white py-6 px-2 rounded-tr rounded-br'
       >
        <HiOutlineMagnifyingGlass size={35} className='-scale-x-100'/>
        </button>
    </div>
  )
}

export default GifSearch