// src/music.js
export const playMusic = () => {
  const audio = new Audio("/hengapemduoianhtrang.mp3");
  audio.loop = true;
  audio.volume = 0; // bắt đầu tắt tiếng
  audio.play().then(() => {
    // Sau 2 giây, tăng volume dần
    setTimeout(() => {
      let vol = 0;
      const fade = setInterval(() => {
        vol += 0.05;
        if (vol >= 1) clearInterval(fade);
        audio.volume = Math.min(vol, 1);
      }, 200);
    }, 2000);
  });
};
