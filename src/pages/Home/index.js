import { motion, AnimatePresence, easeOut, useAnimation } from "framer-motion";
import Btn from "../../components/webButton";
import "./index.css";
import { useInView } from "react-intersection-observer";
import Card from "../../components/PackageCard";
export default function Home() {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const handler = () => {
    console.log("batata");
  };
  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 },
  };
  return (
    <div className="home">
      <motion.section
        className="section"
        id="hero"
        initial={{ opacity: 0, x: "-10%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: easeOut }}
      >
        {" "}
        <div>
          <p>Luxury Travel </p>
          <p> Beyond Your Imagination</p>
        </div>
        <div className="dimmer"></div>
        <Btn
          text="Discover more"
          event={handler}
          style={{ alignSelf: "flex-end" }}
        />
      </motion.section>
      <motion.section className="section" id="benefits">
        <h3>The True Meaning of Luxury Travel</h3>
        <div >
    <p>VIP Lounge</p>
    <p>Premium In-Flight Entertainment</p>
    <p>Exclusive Tours and Personalized Experience</p>
        </div>
        <hr id="sechr"></hr>
      </motion.section>
      <motion.section className="section" id="services">
        <h3>Discover Our Top Packages</h3>
        <div id="packages">
          <Card />
          <Card />
          <Card />
        </div>
      </motion.section>
      <motion.section className="section">HA3 HA3 HA3</motion.section>
      <motion.section className="section"></motion.section>
    </div>
  );
}
