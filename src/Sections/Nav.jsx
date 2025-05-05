import logo from '../assets/logos/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';
import searchBlue from '../assets/icons/search.svg'
import searchImg from '../assets/icons/search-black.svg'
import cross from '../assets/icons/cross.svg'
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react'
import increase from '../assets/icons/increase.svg'
import { Link, useNavigate } from 'react-router-dom';


const API_KEY = '5f58317eec0d9fe5208ab063da02524a'

const Nav = ({searchShow, searchVal, setSearchShow}) => {
  const buttonsLeft = {
    "Movies": ['Popular', 'Now Playing', 'Upcoming', 'Top Rated'],
    "TV Shows": ['Popular', 'Airing Today', 'Top Rated'],

  }
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [search, setSearch] = useState('');
  const [moviesList,setMoviesList] = useState([]);
  const clearSearch = () => {
    setSearch('')
  }
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleChange = (event) => { 
    setSearch(event.target.value);
  }

  const handleFocus = () => {
    setIsFocused(true);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  

  useEffect(()=>{
    searchVal?setSearch(searchVal):setSearch('')
  },[])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY+5 < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY+5) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(()=>{
    const fetchMovies = async () => {
      const response =  await fetch(search?`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`:
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
      const json = await response.json();
      const movies = await json.results.slice(0,10);
      setMoviesList(movies);
    }
    fetchMovies();
  }, [search])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && isFocused) {
        navigate(`/search/${search}`, {state: {search: search}});
        setIsFocused(false);
        inputRef.current.blur()
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, search, isFocused]);

  return (
  <motion.div className='sticky top-0 z-100 w-full'
    animate={{top: isVisible? 0:-64}}
    transition={{duration: 0.2}}
  >
      <div className='flex h-[64px] bg-primary items-center px-10 font-medium w-full z-30'>
        <div className='flex gap-5 items-center'>
          <Link to = '/'>
          <img src={logo} className='h-6'/>
          </Link>
          <ul className='flex max-lg:hidden gap-5 text-white '>
                <li className="group relative cursor-pointer p-2">
                <button onClick={()=>{navigate('/movielist',{state: {category:'Trending', buttons: buttonsLeft['Movies']}})}}>
                  Movies
                </button>
                  <ul className="absolute z-50 top-9 text-black w-40 hidden group-hover:flex group-hover:flex-col py-2 bg-white  border border-gray-400 rounded-md">
                    {buttonsLeft['Movies'].map((insideButton) => (
                      <button key={insideButton} onClick={()=>{navigate(`/movielist`,{state: {category: insideButton, buttons: buttonsLeft['Movies']}} )}} className="text-start font-normal w-full px-5 py-1 hover:bg-gray-200 cursor-pointer">
                        {insideButton}
                      </button>
                    ))}
                  </ul>
                </li>
                <li className="group relative cursor-pointer p-2">
                <button onClick={()=>{navigate('/tvlist',{state: {category:'Trending', buttons: buttonsLeft['TV Shows']}})}}>
                  TV Shows
                </button>
                  <ul className="absolute z-50 top-9 text-black w-40 hidden group-hover:flex group-hover:flex-col py-2 bg-white  border border-gray-400 rounded-md">
                    {buttonsLeft['TV Shows'].map((insideButton) => (
                      <button key={insideButton} onClick={()=>{navigate(`/tvlist`,{state: {category: insideButton, buttons: buttonsLeft['TV Shows']}} )}} className="text-start font-normal w-full px-5 py-1 hover:bg-gray-200 cursor-pointer">
                        {insideButton}
                      </button>
                    ))}
                  </ul>
                </li>
          </ul>
        </div>
        <div className='ml-auto gap-7 flex items-center text-white'>
            <div className='flex gap-7 max-lg:hidden'>
            <Link to = '/login' > 
            <button>Login</button>
            </Link>
            <Link to = '/signup'>
            <button>Join TMDB</button>
            </Link>
            </div>
            <img src={searchBlue} onClick={()=>setSearchShow(true)} className='h-8 w-8'/>
        </div>
      </div>
      <div ref={containerRef}>
      <div className={`${searchShow ? 'flex' : 'hidden'} flex-col px-10 py-3 z-50 bg-white border-b border-b-gray-300`}>
          <div className='flex items-center gap-3 w-full'>
          <img src={searchImg} className='w-5 h-5'/>
          <input type='text' ref={inputRef} onFocus={handleFocus} onChange={(event)=>handleChange(event)} placeholder='Search for a movie, tv show, person...' 
          value={search} className='w-full text-gray-400 placeholder-gray-400 text-lg focus:outline-0 font-medium italic'/>
          <img src={cross} onClick={clearSearch} className={`h-5 w-5 ${search===''?'hidden':'block'}`} />
          </div>
      </div>
      <div className={`${isFocused ? 'block':'hidden'} absolute w-full `}>
          <div className={`flex items-center gap-2 bg-neutral-100 py-2.5 px-10 ${search?'hidden':''}`}> 
            <img src={increase} className='h-5 w-5'/>
            <p className='text-xl font-bold'>Trending</p>
          </div>
          <ul className='bg-white'>
            {moviesList.map((movie)=>
            <li className='flex items-center cursor-pointer hover:bg-gray-200 px-10 py-1 gap-2 border-b border-b-gray-300' onClick={()=>{
              navigate(`/search/${movie.title}`, {state: {search: movie.title}});
              setSearch(movie.title)
              setIsFocused(false);
            }}>
              <img src={searchImg} className='h-4 w-4'/>
              <p onClick={()=>{console.log(movie.title)}} className='text-md'>{movie.title}</p>
            </li>)}
          </ul>
      </div>  
      </div>
  </motion.div>
    

  )
}

export default Nav