// src/BackgroundMusic.js
import { useEffect, useRef } from "react";

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => {
      // Bật tiếng từ từ
      setTimeout(() => {
        let vol = 0;
        audio.muted = false;
        const fadeIn = setInterval(() => {
          if (vol < 1) {
            vol += 0.05;
            audio.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 200);
      }, 1000);
    }).catch(err => {
      console.warn("Autoplay bị chặn:", err);
    });
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/hengapemduoianhtrang.mp3" // <--- URL nhạc của sếp
      autoPlay
      loop
      muted
    />
  );
}

export default BackgroundMusic;
