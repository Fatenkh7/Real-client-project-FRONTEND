import { motion, AnimatePresence, easeOut, useAnimation } from "framer-motion";
import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import "./index.css";
const { Meta } = Card;
export default function Home() {
  const [Package, setPackage] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const URL= process.env.REACT_APP_BASE_URL
      const fetchedPackage = await axios.get(`${URL}package`);
      setPackage(fetchedPackage.data.data);
      console.log(fetchedPackage.data.data);
    }
    fetchData();
  }, []);
  const [toggled, setToggle] = useState(false);
  const showCard = (data) => {
    setSelectedPackage(data);
    setToggle(true);
  };
  const hideCard = () => {
    setSelectedPackage([]);
    setToggle(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="packages-page"
    >
      <Banner
        img="https://images.lifestyleasia.com/wp-content/uploads/sites/6/2022/03/04111335/amandari-indonesia-suite-exterior-and-pool_original_11588-2-1401x900.jpg"
        text="Discover Our Packages"
      />
      <section>
        <AnimatePresence>
          {toggled && <BigCard pckg={selectedPackage} close={hideCard} />}
        </AnimatePresence>
        {Package.map((e) => {
          return (
            <Card
              onClick={() => showCard(e)}
              hoverable
              className="partner-card"
              key={e._id}
            >
              <Meta
                title={
                  <a href={e.link} className="card-title">
                    {e.packageTitle}
                  </a>
                }
                description={e.description}
              />
            </Card>
          );
        })}
      </section>
    </motion.div>
  );
}

export function BigCard(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="pckg-card"
    >
      <div
        className="pckg-img"
        style={{
          backgroundImage:
            "url(https://images.lifestyleasia.com/wp-content/uploads/sites/6/2022/03/04111335/amandari-indonesia-suite-exterior-and-pool_original_11588-2-1401x900.jpg)",
        }}
      ></div>
      <div className="pckg-card-content">
        <div>
          {" "}
          <button onClick={props.close}>x</button>
        </div>
        <div>
          <h3>{props.pckg.packageTitle}</h3>
          <p>{props.pckg.duration}</p>
          <p>{props.pckg.description}</p>
          {/*JSON.parse(props.pckg.locations).map(loc => {return <span key={loc}>{loc}</span>})*/}
          {props.pckg.locations.map((loc) => {
            return <span key={loc}>{loc}</span>;
          })}
        </div>
      </div>
    </motion.div>
  );
}
