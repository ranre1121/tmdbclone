import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TrailerCard from '../Components/TrailerCard'
import TrailerModal from "../Components/TrailerModal";

const API_KEY = "5f58317eec0d9fe5208ab063da02524a";
const getBackdrop = (p) =>
  `https://image.tmdb.org/t/p/original${p}`;

export default function Trailers() {
  const [bgImage, setBgImage] = useState("");
  const [shadow, setShadow] = useState(true);
  const scrollRef = useRef(null);

  const [results, setResults] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  
  const [modalData, setModalData] = useState(null); 

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((r) => r.json())
      .then((json) => setResults(json.results))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!results.length) return;
    (async () => {
      const arr = await Promise.all(
        results.map(async (m) => {
          try {
            const j = await fetch(
              `https://api.themoviedb.org/3/movie/${m.id}/images?api_key=${API_KEY}`
            ).then((r) => r.json());
            return [m.id, m.original_title, j.backdrops[0]?.file_path];
          } catch {
            return null;
          }
        })
      );
      const clean = arr.filter(Boolean);
      setImagePaths(clean);
      setBgImage(clean[0][2]);
    })();
  }, [results]);

  /* shadow fade */
  const handleScroll = (e) => setShadow(e.target.scrollLeft <= 50);
  const setRef = (node) => {
    if (scrollRef.current)
      scrollRef.current.removeEventListener("scroll", handleScroll);
    if (node) node.addEventListener("scroll", handleScroll);
    scrollRef.current = node;
  };

  return (
    <>
      {/* main section */}
      <div className="relative bg-cover duration-300  "
        style={{backgroundImage: `url(${getBackdrop(bgImage)})`,
        backgroundPosition: "50%",  
      }}
      >
        <div
          className="pt-5 "
          style={{backgroundColor: 'rgba(0,40,70,0.7)'}}
        >
          <div className="mb-5 ml-10">
            <p className="text-2xl font-semibold text-white">Latest Trailers</p>
          </div>
          <div
            ref={setRef}
            className="overflow-x-auto whitespace-nowrap flex gap-5 px-10 h-80"
          >
            {imagePaths.map(([id, title, path]) => (
              <TrailerCard
                key={id}
                id={id}
                name={title}
                imagePath={path}
                onHover={setBgImage}
                onPlay={(key, t) => setModalData({ key, title: t })}
              />
            ))}
          </div>
        </div>


        <AnimatePresence>
          {shadow && (
            <motion.div
              className="absolute top-0 right-0 h-full w-20 pointer-events-none z-40 "
              style={{
                background:
                  "linear-gradient(to left, white, transparent)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </div>

      {modalData && (
        <TrailerModal
          videoKey={modalData.key}
          title={modalData.title}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
}
