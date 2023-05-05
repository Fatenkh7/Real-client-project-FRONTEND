import {motion} from "framer-motion"
export default function Home(){
    return(<motion.div
        initial={{ opacity: 0, x:-10 }}
      animate={{ opacity: 1, x:0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >Home</motion.div>)
}