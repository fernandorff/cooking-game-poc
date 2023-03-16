export const playSound = (soundFile) => {
  const audio = new Audio(`/${soundFile}.mp3`);
  audio.play();
  return audio;
};
