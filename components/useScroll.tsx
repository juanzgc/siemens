import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

export const useScroll = (thresh = 0.4) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: thresh, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);



  return [ref, controls];
};