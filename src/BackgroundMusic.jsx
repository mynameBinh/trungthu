import { useEffect, useRef } from "react";

function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Bắt đầu phát ở chế độ muted
    audio.muted = true;
    audio.volume = 0;
    audio.play().then(() => {
      // Sau 1 giây, dần bật tiếng
      setTimeout(() => {
        audio.muted = false;
        let volume = 0;
        const fade = setInterval(() => {
          if (volume < 1) {
            volume += 0.05;
            audio.volume = volume;
          } else {
            clearInterval(fade);
          }
        }, 200);
      }, 1000);
    }).catch((err) => {
      console.warn("⚠️ Autoplay bị chặn:", err);
    });
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/hengapemduoianhtrang.mp3"
      autoPlay
      loop
      muted
    />
  );
}

export default BackgroundMusic;
