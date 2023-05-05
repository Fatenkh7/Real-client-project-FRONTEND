import Style from "./index.module.css";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence, easeOut, useAnimation } from "framer-motion";
export default function Benefit(props) {
  const [isHovered, setHover] = useState(false);
  return (
    <div
      className={Style.benefit}
      style={{
        backgroundImage: `url(${props.bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <AnimatePresence>
      {isHovered && (
       
          <motion.p
            initial={{ opacity: 0}}
            animate={{ opacity: 1,  transition:{duration:1}}}
            exit={{ opacity: 0,  transition:{duration:1}}}
          >
            {props.text}
          </motion.p>
      )}
              </AnimatePresence>

    </div>
  );
}
