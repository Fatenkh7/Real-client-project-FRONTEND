import { Card } from "antd";
import Style from "./index.module.css";
import { useEffect } from "react";
import image from "../../images/hero.jpeg"
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence, easeOut, useAnimation } from "framer-motion";

const { Meta } = Card;
export default function Cards(props) {
  const control = useAnimation()
const [ref, inView] = useInView()
const boxVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0.7 }
};
useEffect(() => {
  if (inView) {
    control.start("visible");
  } else {
    control.start("hidden");
  }
}, [control, inView]);
  return (
    <motion.div className={Style.card} ref={ref}
    variants={boxVariant}
    initial="hidden"
    animate={control}>
      <Card className="web"
        hoverable
        style={{
          width: "100%",
        }}
        cover={
          <img
            alt="example"
            src={image}
          />
        }
        
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </motion.div>
  );
}
