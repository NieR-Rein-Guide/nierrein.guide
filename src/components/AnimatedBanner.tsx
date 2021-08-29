import Lottie from "react-lottie-player";
import mamaSignbanner from "../lottie/mama_sign_banner.json";

export default function AnimatedBanner(): JSX.Element {
  return <Lottie animationData={mamaSignbanner} play speed={0.5} />;
}
