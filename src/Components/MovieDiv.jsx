import { useState, useEffect, useRef } from "react";
import MovieCard from "../Components/MovieCard";
import { motion, AnimatePresence } from 'framer-motion';
import Button from "./Button";

const MovieDiv = ({sectionName, buttonLeft, buttonRight, buttonLeftLink, buttonRightLink, bgImage, tv }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [shadow, setShadow] = useState(true);
  const scrollRef = useRef(null);
  const [isButtonLeftClicked, setIsButtonLeftClicked] = useState(true); 
  const [tvActive, setTvActive] = useState(false);

  const handleScroll = (e) => {
    const x = e.target.scrollLeft;
    setShadow(x <= 50);
  };

  const setRef = (node) => {
    if (scrollRef.current) {
      scrollRef.current.removeEventListener("scroll", handleScroll);
    }
    if (node) {
      node.addEventListener("scroll", handleScroll);
    }
    scrollRef.current = node;
  };

  useEffect(() => {
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
      const response =  await fetch(isButtonLeftClicked?buttonLeftLink:buttonRightLink);
      const json = await response.json();
      const movies = await json.results;
      setMoviesList(movies);
    }
    fetchData()
  }, [isButtonLeftClicked])

  return (
    <div className="relative flex flex-col mt-5 gap-5 bg-no-repeat bg-bottom" 
    style={{backgroundImage: bgImage? `url(${bgImage})`:''}}
    >
      <div className='flex items-center gap-5 pl-10'>
        <p className='font-semibold text-2xl'>{sectionName}</p>
        <Button buttonLeft={buttonLeft} buttonRight = {buttonRight}
          isButtonLeftClicked={isButtonLeftClicked} setIsButtonLeftClicked={setIsButtonLeftClicked}
          tvActive = {tv?tvActive:null} setTvActive = {tv?setTvActive:null}
          />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          ref={setRef} 
          key={isButtonLeftClicked}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto whitespace-nowrap px-10 flex gap-5 h-95 pb-100 overflow-y-hidden"
        >
          {moviesList.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={tvActive ? movie.original_name:movie.title}
              release_date={tvActive ? movie.first_air_date : movie.release_date}
              vote_average={movie.vote_average}
              tvActive = {tvActive}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {shadow && (
          <motion.div
            className="absolute top-0 right-0 h-full w-20 pointer-events-none z-30"
            style={{
              background: "linear-gradient(to left, white, transparent)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieDiv;
