import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";

import { HiOutlineExternalLink } from "react-icons/hi";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();

  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);

  const { gifphy, favourites, addToFavourites} = GifState();

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await gifphy.gif(gifId[gifId.length - 1]);
    const { data: related } = await gifphy.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, [type, slug]);


  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="font-faded">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
                </p>
            )}
          </>
        )}
        <div className="divider">
          
          {gif?.source && (
            <div>
              <span className="faded">Source</span>
              <div className="flex items-center text-sm font-bold gap-1">
                <HiOutlineExternalLink size={25} />
                <a href={gif.source} target="_blank" className="truncate">
                  {gif.source}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />
            <div className="flex sm:hidden gap-1">
            <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="font-faded">@{gif?.user?.username}</div>
              </div>
            </div>
          </div>
         <div className="hidden sm:flex flex-col gap-5 mt-6">
          <button
           onClick={()=> addToFavourites(gif.id)}
           className="flex gap-5 items-center font-bold text-lg">
            <HiMiniHeart
            size={30}
            className={`${favourites.includes(gif.id) ?'text-red-500':''}`}/>
            Favourites
           </button>
         </div>
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {/* {relatedGifs.slice(1).map((gif)=>(
              <Gif gif={gif} key={gif.id} />
            ))} */}
             {relatedGifs.map((gif)=>{
         return <Gif gif={gif} key={gif.title}/>
        })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
