import { useEffect, useState } from "react";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    setPlaying(!playing);
  };

  const load = () => {
    audio.src = url;
    audio.load();
  };

  const pause = () => {
    setPlaying(!playing);
    audio.load();
  };

  useEffect(() => {
    playing ? audio.play() : audio.load();
    // eslint-disable-next-line
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));

    return () => {
      audio.removeEventListener("ended", () => {
        setPlaying(false);
      });
    };
  });

  return [audio, playing, pause, load, toggle];
};
export default useAudio;
