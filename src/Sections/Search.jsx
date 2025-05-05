import searchImg from '../assets/icons/search-black.svg'
import cross from '../assets/icons/cross.svg'
import { useState } from 'react'
import starwars from '../assets/posters/starwars.webp'
import { useEffect } from 'react'

const Search = () => {
  const movieSrcs = ['/hoVj2lYW3i7oMd1o7bPQRZd1lk1.jpg','/7CENyUim29IEsaJhUxIGymCRvPu.jpg','/7g1zO5t0bd27Iqn5ZUDJmksOGPJ.jpg','/9pGM43a9VmXxwIxmhJoiDkcB2hT.jpg','/pbrkL804c8yAv3zBZR4QPEafpAR.jpg','/dqK9Hag1054tghRQSqLSfrkvQnA.jpg','/dg9UZZSrrKZ0SUcRnlaX1YZ4k8F.jpg']
  const randomBg = movieSrcs[Math.floor(Math.random()*movieSrcs.length)];


  return (
      <div
        className="px-10 py-20 flex flex-col gap-10 relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter%28duotone%2C00192f%2C00baff%29/${randomBg})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      >
        <div className="absolute inset-0 bg-blue-950 opacity-40"></div>
      <span className='flex flex-col'>
        <h1 className='text-white font-bold text-5xl z-10'>Welcome.</h1>
        <p className='text-white font-semibold text-3xl z-10'>Millions of movies, TV shows
          and people to discover. Explore now.</p>
      </span>
      <div className='w-full bg-white rounded-full flex z-10'>
      <input type='text' placeholder='Search for a movie, tv show, person...' className=
      'text-xl ml-5 w-full focus:outline-0'/>
      <button className='rounded-full bg-linear-to-r from-sky-300 
      to-blue-500 py-3 px-7 text-xl text-white'>Search</button>
      </div>
    </div>
  )
}

export default Search