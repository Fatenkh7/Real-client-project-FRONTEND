import axios from "axios";
import { useEffect, useState } from "react";
import {Tabs, Card} from "antd";
import Banner from "../../components/Banner"
import { motion, AnimatePresence, easeOut, useAnimation } from "framer-motion";
import "./index.css"
const { Meta } = Card;

export function Tab(props){
  return(
    <AnimatePresence> <motion.section className="tab">
  {props.data.filter(e => e.hasOwnProperty("idPartnerType") && e.idPartnerType._id===props.id).map(e =>  {return <Card
        hoverable className="partner-card"
        key={e._id}
      >
        <Meta title={<a href={e.link} className="card-title">{e.company}</a>} description={e.description} />
      </Card>})  }
    </motion.section></AnimatePresence>
  )
}
export default function Home() {
  const [PartnerType, setPartnerType] = useState([]);
  const [Partner, setPartner] = useState({all:[], filtered:[]});
  const [tabData, setTabData]=useState([])
  useEffect(() => {
    async function fetchData() {
      const fetchedPartnerType = await axios.get(
        "http://localhost:5000/partnerType"
      );
      const fetchedPartner = await axios.get("http://localhost:5000/partner");
      let tabs=[]
      fetchedPartnerType.data.response.map((e, index )=> {tabs.push({
        key: e._id,
        label: e.title,
        children: <Tab data={fetchedPartner.data.response} id={e._id}/>,
      })})
      setTabData(tabs)
      setPartnerType(fetchedPartnerType.data.response);
      setPartner({all:fetchedPartner.data.response, filtered:fetchedPartner.data.response});
    }
    fetchData();
  }, []);
 
  const onChange = (key) => {
    console.log(key);
  };
  return <motion.div  initial={{ opacity: 0, x:-10 }}
  animate={{ opacity: 1, x:0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.5 }} className="partners-page">
    <Banner img="https://images.lifestyleasia.com/wp-content/uploads/sites/6/2022/03/04111335/amandari-indonesia-suite-exterior-and-pool_original_11588-2-1401x900.jpg" text="Our Partners" />
  <Tabs defaultActiveKey="1" items={tabData} onChange={onChange} />
  </motion.div>
}

