import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

export default function AnimatedBanner(): JSX.Element {
  const [animationData, setAnimationData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    import("../lottie/mama_sign_banner.json").then(setAnimationData);
  }, []);

  return (
    <div className="min-h-[237px] md:min-h-[556px]">
      <Lottie
        animationData={animationData}
        play={isPlaying}
        onMouseEnter={() => setIsPlaying(true)}
        onMouseLeave={() => setIsPlaying(false)}
      />
    </div>
  );
}
