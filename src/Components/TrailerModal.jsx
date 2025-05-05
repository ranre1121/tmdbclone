import { useEffect } from "react";
import { createPortal } from "react-dom";
import YouTube from "react-youtube";
import { motion } from "motion/react";

export default function TrailerModal({ videoKey, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keyup", onKey);

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keyup", onKey);
      document.body.style.overflow = original;
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative z-60 bg-black flex items-center flex-col rounded-md "
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center w-full px-3 py-3 '>
        <p className="flex-1 text-white text-center text-xl">{title}</p>
        <button
          onClick={onClose}
          className="text-gray-400 text-2xl font-bold hover:text-white transition duration-200"
        >
          &times;
        </button>
        </div>

        <YouTube
          videoId={videoKey}
          opts={{
            width: "1200px",
            height: "700px",
          }}
          className=""
        />
      </div>
    </motion.div>,
    document.body
  );
}
