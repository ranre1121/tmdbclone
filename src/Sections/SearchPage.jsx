import { useState, useEffect } from "react";
import Nav from "./Nav"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import placeholder from '../assets/backgrounds/placeholder.jpg'

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



const SearchPage = () => {
  const { name: search } = useParams();
  const [movieList, setMovieList] = useState([]);
  const [moviesChosen, setMoviesChosen] = useState(true);
  const [tvShows, setTvShows] = useState([]);
  const [renderedList, setRenderedList] = useState([]);
  const getPoster = (p) => `https://image.tmdb.org/t/p/w1280${p}`
  const navigate = useNavigate();


  useEffect(()=>{
    const fetchMovies = async () => {
      const response =  await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}`);
      const json = await response.json();
      const movies = await json.results;
      setMovieList(movies);
    }
    const fetchTV = async () => {
      const response = await fetch (`https://api.themoviedb.org/3/search/tv?query=${search}&api_key=${API_KEY}`)
      const json = await response.json();
      const tv = await json.results;
      setTvShows(tv);
    }
    fetchMovies()
    fetchTV()
  },[search])

  useEffect(()=>{
    if(!movieList) return;
    setRenderedList(movieList);
  }, [movieList])

  

  return (
    <div>
        <Nav searchShow={true} searchVal={search}/>
        <div className='flex px-10 py-5 items-start gap-10'>
          <div className='w-70 border-gray-300 border rounded-lg flex-'>
            <div className='bg-cyan-500 px-4 py-5 w-full text-white rounded-t-md font-semibold text-lg'>
                <p className='max-w-40 leading-5'>Search Results</p>
            </div>
              <ul className="flex flex-col py-2">
                  <li className={`${moviesChosen?'bg-gray-200 font-semibold':'bg-white'} hover:bg-gray-100 px-4 py-2 cursor-pointer flex`}onClick={()=>{
                    setMoviesChosen(true);
                    setRenderedList(movieList)
                  }}>Movies <span className={`ml-auto ${moviesChosen?'bg-white':'bg-gray-200'} font-normal px-3 rounded-lg`}>{movieList.length}</span></li>
                  <li className={`${moviesChosen?'bg-white':'bg-gray-200  font-semibold'} hover:bg-gray-100 px-4 py-2 cursor-pointer flex`} onClick={()=>{
                    setMoviesChosen(false);
                    setRenderedList(tvShows)
                  }}>TV Shows <span className={`ml-auto ${moviesChosen?'bg-gray-200':'bg-white'} font-normal px-3 rounded-lg`}>{tvShows.length}</span></li>
              </ul>
          </div>
          <div className='flex flex-col gap-5 w-full'>
            {renderedList.map((project,index)=>
              <div key={index} className='flex rounded-lg h-[150px] w-full pr-5 border items-center gap-5 border-gray-200'>
                <img src={project.poster_path?getPoster(project.poster_path):placeholder} className='h-full w-[100px] rounded-l-lg'/>
                <div>
                  <h1 className='font-semibold text-xl cursor-pointer hover:text-gray-600' 
                  onClick={()=>{navigate(`/${moviesChosen?'movies':'tv'}/${project.id}`)}}>
                    {moviesChosen?project.title:project.original_name}
                  </h1>
                  <p className='text-gray-400 text-sm'
                  >{moviesChosen? (project.release_date?dateFormat(project.release_date):'') : (project.first_air_date?dateFormat(project.first_air_date):'')}</p>
                  <p className={`${project.overview?'mt-3':''}`}>{project.overview?(project.overview.length>200?project.overview.slice(0,200)+'...':project.overview):''}</p>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default SearchPage