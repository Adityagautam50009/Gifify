import React, { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import GifSearch from "./GifSearch";

const Header = () => {
  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  const { gifphy, favourites} = GifState();

  const getGifCategories = async () => {
    const { data } = await gifphy.categories();
    setCategory(data);
  };

  useEffect(() => {
    getGifCategories();
  }, []);

  // console.log(category)


  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" alt="Gifify logo" className="w-8" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            Gifify
          </h1>
        </Link>
        <div className="font-bold text-md flex gap-2 items-center">
          {/* render categories */}
          {category?.slice(0, 5)?.map((category) => {
           return (<Link className="px-4 py-1 hover:gradient border-b-4 hidden lg:block" to={`/${category.name_encoded}`} key={category.name}>
             {category.name}
            </Link>)
          })}

          <button onClick={() => setShowCategory(!showCategory)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategory ? "gradient " : ""
              }border-b-4 hidden lg:block`}
            />
          </button>
          {favourites.length > 0 && <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
            <Link to="/favourite">Favourite GIFs</Link>
          </div>
          }
          <button>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-400 block lg:hidden"
            />
          </button>
          {showCategory && (
            <>
              <div className="absolute right-0 top-14 px-10 pt-6 pb-6 w-full gradient z-20">
                <span className="text-3xl font-extrabold">Categories</span>
                <hr className="bg-gray-100 opacity-50 my-5"/>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:gird-cols-4 lg- grid-clos-5 xl grid:grid-cols-5 gap-4">
                  {category?.map((category)=>{
                    return ( <Link className="font-bold" key={category.name} to={`/${category.name_encoded}`}>{category.name}</Link>)
                  }
                  )}
                 
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* search */}
      <GifSearch />
    </nav>
  );
};

export default Header;
