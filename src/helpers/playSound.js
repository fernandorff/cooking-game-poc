export const playSound = (soundFile, volume = 1) => {
  const audio = new Audio(`/${soundFile}.mp3`);
  audio.volume = volume;
  audio.play();
  return audio;
};
