import { useState } from "react";
import resume from "../assets/icons/resume.svg";

const API_KEY = "5f58317eec0d9fe5208ab063da02524a";
const getImage = (p) => `https://image.tmdb.org/t/p/w1280${p}`;

export default function TrailerCard({ id, name, imagePath, onHover, onPlay }) {
  const [videoKey, setVideoKey] = useState(null);

  async function handleClick() {
    if (!videoKey) {
      try {
        const json = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        ).then((r) => r.json());

        const vid = json.videos.results.find(
          (v) => v.official && v.type === "Trailer"
        );
        if (vid) {
          setVideoKey(vid.key);
          onPlay(vid.key, name);
        } else {
          alert("Trailer not found");
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      onPlay(videoKey, name);
    }
  }

  return (
    <div
      className="min-w-[400px] h-[250px] flex flex-col items-center gap-2 pt-2"
      onMouseEnter={() => onHover(imagePath)}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer group rounded-lg "
        onClick={handleClick}
      >
        <img
          src={getImage(imagePath)}
          alt={name}
          className="duration-200 group-hover:scale-103 rounded-lg"
        />
        <img
          src={resume}
          alt=""
          className="absolute h-12 w-12 transition-transform duration-200 group-hover:scale-120 pointer-events-none"
        />
      </div>
      <p className="text-lg text-white text-center font-semibold">{name}</p>
    </div>
  );
}
