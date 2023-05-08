import Banner from "../../components/Banner";
import {motion} from "framer-motion"
import Btn from "../../components/webButton";
import {Link} from "react-router-dom"
export default function Home() {
  return (
    <motion.div
    initial={{ opacity: 0, x:-10 }}
  animate={{ opacity: 1, x:0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.5 }}
    >
      <Banner text="Luxury Club" img={require("../../images/image.png")} />
      <section>
        <Btn><Link to="/login">Join</Link></Btn>
      </section>
    </motion.div>
  );
}
