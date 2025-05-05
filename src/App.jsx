import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, Search, Footer, Trailers, Movie, Register, Login, SearchPage, TV, MovieList, TVlist } from './Sections';
import MovieDiv from './Components/MovieDiv';
import trendingBg from './assets/backgrounds/trending-bg.svg';
import { useState } from 'react';

const API_KEY = '5f58317eec0d9fe5208ab063da02524a';

function App() {

  const [searchShow, setSearchShow] = useState(true);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Nav searchShow={true} setSearchShow = {setSearchShow}/>
            <Search />
            <MovieDiv sectionName="Trending" buttonLeft="Today" buttonRight="This Week"
              buttonLeftLink={`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`}
              buttonRightLink={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`}
              bgImage={trendingBg} />
            <Trailers />
            <MovieDiv sectionName="Popular" buttonLeft="Movies" buttonRight="TV"
              buttonLeftLink={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`}
              buttonRightLink={`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`}
              tv={true} />
            <MovieDiv sectionName="Top Rated" buttonLeft="Movies" buttonRight="TV"
              buttonLeftLink={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
              buttonRightLink={`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`}
              tv={true} />
            <Footer />
          </>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path='/tv/:id' element = {<TV/>} />
        <Route path="/search/:name" element={<SearchPage />}/>
        <Route path='/movielist' element={<MovieList />}/> 
        <Route path='/tvlist' element={<TVlist />}/> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;
