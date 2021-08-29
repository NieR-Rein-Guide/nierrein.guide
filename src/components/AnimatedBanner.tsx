import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useIntersection } from "@shopify/react-intersection-observer";

export default function AnimatedBanner(): JSX.Element {
  const [animationData, setAnimationData] = useState(null);
  const [intersection, intersectionRef] = useIntersection();

  useEffect(() => {
    import("../lottie/mama_sign_banner.json").then(setAnimationData);
  }, []);

  if (!animationData) {
    return <div>Loading...</div>;
  }

  return (
    // @ts-expect-error Type 'Ref<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement>'
    <div ref={intersectionRef}>
      <Lottie
        animationData={animationData}
        play={intersection.isIntersecting}
        speed={0.5}
      />
    </div>
  );
}
