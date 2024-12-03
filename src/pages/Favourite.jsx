import React, { useState, useEffect } from 'react'
import { GifState } from '../context/gif-context'
import Gif from '../components/Gif'
const Favourite = () => {

  const {gifphy, favourites} = GifState()

  const [favouriteGifs, setFavouriteGifs] = useState([])

  const fetchFavouriteGifs = async()=>{
    console.log("favourites"+favourites)
    const {data: gifs} = await gifphy.gifs(favourites)
    setFavouriteGifs(gifs)
  }

  useEffect(()=>{
    fetchFavouriteGifs()
  },[])

  return (
    <div className='mt-2'>
      <span className='faded-text'>My favourites</span>
      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {favouriteGifs.map((gif)=>{
         return <Gif gif={gif} key={gif.title}/>
        })}
    </div>
    </div>
  )
}

export default Favourite