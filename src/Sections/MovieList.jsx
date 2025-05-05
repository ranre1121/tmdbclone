import Nav from "./Nav"
import Footer from "./Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { nav } from "motion/react-client";

const API_KEY = '5f58317eec0d9fe5208ab063da02524a';

const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};

function dateFormat(str){
    const dateArr = str.split('-')
    const month = Number(dateArr[1]);
    return(`${months[month]} ${dateArr[2]}, ${dateArr[0]}`)    
}


function ratingFormat(vote){
    const percentage = vote*10
    return Math.round(percentage)
}

function ratingDegree(vote){
    const percentage = ratingFormat(vote);
    let colors = [];
    if (percentage < 50){
        colors = ['#db2360','#571435']
    }else if (percentage >= 50 && percentage < 70)
        {
        colors = ['#d2d531','#423d0f']
    }else{
        colors = ['#21d07a','#204529']
    }
    return [percentage*3.6,colors]
}

const MovieList = () => {
  
  const [movieList, setMovieList] = useState([]);
  const location = useLocation();
  const [category, setCategory] = useState(location.state.category);
  const buttons = location.state.buttons;
  const getPoster = (p) => `https://image.tmdb.org/t/p/w1280${p}`
  const navigate = useNavigate();
  const [searchShow, setSearchShow] = useState(false);

  useEffect(()=>{
    setCategory(location.state.category);
  },[location.state.category])

  useEffect(()=>{
    if (category==='Trending'){
        const fetchMovies = async () => {
            const response =  await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
            const json = await response.json();
            const movies = await json.results;
            setMovieList(movies);
          }
        fetchMovies()
    } else{
        const fetchMovies = async () => {
            const response =  await fetch(`https://api.themoviedb.org/3/movie/${category.toLowerCase().split(' ').join('_')}?api_key=${API_KEY}`);
            const json = await response.json();
            const movies = await json.results;
            setMovieList(movies);
          }
        fetchMovies()
    }
  },[category])

  return (
    <div>
        <Nav searchShow={searchShow} setSearchShow={setSearchShow}/>
        <div className="px-10 py-5 flex gap-15 items-start">
        <div className='w-[250px] shrink-0 border-gray-300 border rounded-lg'>
            <div className='bg-cyan-500 px-4 py-5 w-full text-white rounded-t-md font-semibold text-lg'>
                <p className='leading-5'>Categories</p>
            </div>
              <ul className="flex flex-col py-2">
                <li onClick={()=>setCategory('Trending')} className={`${category==='Trending'?'font-semibold bg-gray-200':''}
                 py-2 px-4 hover:bg-gray-200 cursor-pointer`}>Trending</li>
                {buttons.map((button) =>
                <li onClick={()=>setCategory(button)} className={`${category===button?'font-semibold bg-gray-200':''}
                 py-2 px-4 hover:bg-gray-200 cursor-pointer`}>{button}</li>
                )}
              </ul>
          </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
        {movieList.map((movie)=>
            <div className='border w-[180px] border-gray-300 rounded-lg'>
                <img src={getPoster(movie.poster_path)} className='rounded-t-lg relative h-[250px] w-[180px]'
                onClick={()=>{
                    navigate(`/movies/${movie.id}`)
                }}/>
                
                <div className='py-2 px-3 -mt-6 z-20 relative'>
                <div style={{
                background: `conic-gradient(${ratingDegree(movie.vote_average)[1][0]} 0deg ${ratingDegree(movie.vote_average)[0]}deg, ${ratingDegree(movie.vote_average)[1][1]} ${ratingDegree(movie.vote_average)[0]}deg 360deg)`
                }} className='h-8 w-8 rounded-full outline-2 outline-primary z-20 bg-primary flex justify-center items-center '>
                <div className='h-7 w-7 rounded-full justify-center align-center flex bg-primary'>
                <span className='flex items-center text-sm font-bold text-white z-20 relative'>
                {ratingFormat(movie.vote_average)}
                <p className='text-[5px] font-normal -mt-1.5'>%</p>
                </span>
                </div>
                </div>
                <p className='font-bold'>{movie.title}</p>
                <p>{dateFormat(movie.release_date)}</p>
                </div>
                
            </div>
        )}
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default MovieList