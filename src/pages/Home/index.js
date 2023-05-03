import { motion, AnimatePresence, easeOut, useAnimation } from "framer-motion";
import Btn from "../../components/webButton";
import "./index.css";
import enter from "../../images/flight_enter.jpg"
import vip from "../../images/vip.svg"
import per from "../../images/pers_travel_icon.png"
import { useInView } from "react-intersection-observer";
import Card from "../../components/PackageCard";
import { Carousel } from 'antd';
const slide1 = {
  height: '80vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundImage:"url(https://blogs.worldbank.org/sites/default/files/styles/share/public/2023-02/al-saranda-780.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};
const slide2={
  height: '80vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  backgroundImage:"url(https://bigseventravel.com/wp-content/uploads/2020/03/italy-4093227_1920.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  }
export default function Home() {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const handler = () => {
    console.log("batata");
  };

  return (
    <div className="home">
      <section style={{position:"relative"}}>
      <Carousel autoplay effect="fade">
    <div>
      <div style={slide1}></div>
    </div>
    <div>
      <div style={slide2}></div>
    </div>
    <div>
      <div style={slide1}></div>
    </div>
    <div>
      <div style={slide2}></div>
    </div>
    
   
  </Carousel>
  <div id="hero" style={{position:"absolute", top:"30%", left:"20%",  margin: "0",
    color:"white",
    display: "inline-block",
    fontWeight: "600",
    backdropFilter: "brightness(80%)"}}>
          <p>Luxury Travel </p>
          <p> Beyond Your Imagination</p>
        </div>
  </section>
   
      <motion.section className="section" id="benefits">
        <h3>The True Meaning of Luxury Travel</h3>
        <div >
          <div className="benefit"> <img alt="vip icon"width="150px" src={vip}/>  <p>VIP Lounge</p></div>
   <div className="benefit"><img alt="entertainment icon" width="150px" src={enter}/><p>Premium In-Flight Entertainment</p></div>
    
    <div className="benefit"><img alt="personalized tours icon" width="150px" src={per}/><p>Exclusive & Personalized Tours</p></div>
        </div>
        <hr className="sechr"></hr>
      </motion.section>
      <motion.section className="section" id="services">
        <h3>Discover Our Top Packages</h3>
        <div id="packages">
          <Card />
          <Card />
          <Card />
        </div>
        <hr className="sechr"></hr>
      </motion.section>
      <motion.section className="section" id="contact">
        <h3>Trips Tailored For You</h3>
        <h4>Request a Meeting With Your Trip Advisor </h4>
        <Btn
          text="Book Now"
          event={handler}
          cc={{ display:"flex", alignSelf: "flex-end" }}
        />
      </motion.section>
      <motion.section className="section"></motion.section>
    </div>
  );
}
/*   <motion.section
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
      </motion.section>*/