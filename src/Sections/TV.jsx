import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import resume from '../assets/icons/resume.svg'
import resumeBlack from '../assets/icons/resumeBlack.svg'
import Footer from "./Footer";
import TrailerModal from '../Components/TrailerModal'

const API_KEY = '5f58317eec0d9fe5208ab063da02524a';

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

const TV = () => {
  const { id } = useParams();
  const [tvDetails, setTvDetails] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [modalData, setModalData] = useState(null); 
  const [videoKey, setVideoKey] = useState(null);
  const onPlay = (key,t) => {setModalData({key, title: t})}
  const getBackdrop = (path, size = 'original') => `https://image.tmdb.org/t/p/${size}${path}`;
  const getPoster = (p) => `https://image.tmdb.org/t/p/w1280${p}`
  const [searchShow, setSearchShow] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
      );
      const json = await res.json();
      setTvDetails(json);
      setReleaseDate(json.first_air_date.split('-'));
    })();
    
      
  }, [id]);
  if (!tvDetails) {
    return (
      <div>
        <Nav searchShow={false} />
        <p className="p-10 text-center">Loading TV Show…</p>
      </div>
    );
  }

  const genreNames = tvDetails?.genres?.map(genre => genre.name).join(", ")
  const backdropUrl = getBackdrop(tvDetails.backdrop_path);

  async function handleClick() {
    if (!videoKey) {
      try {
        const json = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=videos`
        ).then((r) => r.json());

        const vid = json.videos.results.find(
          (v) => v.official && v.type === "Trailer"
        );
        if (vid) {
          setVideoKey(vid.key);
          onPlay(vid.key, tvDetails.original_name);
        } else {
          alert("Trailer not found");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      onPlay(videoKey, tvDetails.original_name);
    }
  }

  return (
    <div >
      <Nav searchShow={searchShow} setSearchShow={setSearchShow} />
      <div
        className="h-[calc(100vh-64px)] bg-cover relative"
        style={{backgroundImage: `url(${backdropUrl})`}}
      >
        <div
          className="h-full"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        >
          <div className={`flex px-10 py-5 gap-10 items-center`} style={{color:'white'}}>
          <img src={getPoster(tvDetails.poster_path)} className={' h-95vh w-[400px] rounded-xl'}/>
          <div className='text-xl'>
          <span className='flex items-center text-5xl gap-2'>
          <h1 className='font-semibold'>{tvDetails.original_name}
            <span className='text-gray-200 font-light ml-2'>
              ({tvDetails.first_air_date.split('-')[0]})
            </span>
          </h1>
          </span>
          <span className='flex gap-1 items-center'>
          <p>{releaseDate[1]}/{releaseDate[2]}/{releaseDate[0]}</p>
          <p>({tvDetails.origin_country})</p>
          <p className='font-bold mx-1 text-2xl'>·</p>
          <p>{genreNames}</p>          
          </span>
          <div className='flex items-center gap-3 mt-5'>
            <div style={{
                  background: `conic-gradient(${ratingDegree(tvDetails.vote_average)[1][0]} 0deg ${ratingDegree(tvDetails.vote_average)[0]}deg, ${ratingDegree(tvDetails.vote_average)[1][1]} ${ratingDegree(tvDetails.vote_average)[0]}deg 360deg)`
                  }} className='h-10 w-10 rounded-full relative outline-3 outline-primary z-20 flex justify-center items-center '>
                  <div className='h-9 w-9 rounded-full justify-center align-center flex bg-primary'>
                  <span className='flex items-center text-lg font-bold text-white z-20 relative'>
                  {ratingFormat(tvDetails.vote_average)}
                  <p className='text-[10px] font-normal -mt-1.5'>%</p>
                  </span>
                  </div>
            </div>
            <p className='font-semibold'>User Score</p>
          </div>
          <p className={`text-gray-200 italic mt-5`}>{tvDetails.tagline}</p>
          <p className='font-bold text-xl my-1'>Overview</p>
          <p>{tvDetails.overview}</p>
          <span className='flex mt-10 gap-2 cursor-pointer ' onClick={handleClick}>
            <img src={resume } className='h-5 w-5 mt-1'/>
            <p className='font-semibold'>Play Trailer</p>
          </span>
          
          </div>
          </div>
        </div>        
      </div>
      {modalData && (
        <TrailerModal
          videoKey={modalData.key}
          title={modalData.title}
          onClose={() => setModalData(null)}
        />
      )}
      <Footer/>
    </div>
  );
};

export default TV;
