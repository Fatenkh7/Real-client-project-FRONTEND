import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./index.css";
import {motion, AnimatePresence} from "framer-motion"
export default function Popup(props) {
  return (
    <AnimatePresence>
    <motion.div className="popup-container"  initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    exit={{opacity:0, scale:0.5 }}
    >
      <div className="popup" key="cont">
        <div className="popup-header" key="hdr">
          <h2 key="h2">{props.title}</h2>
          <div className="popup-close" onClick={props.close} key="cls">
            <CloseOutlined />
          </div>
        </div>
        <div className="popup-body" key="bdy">{props.children}</div>
      </div>
    </motion.div>
    </AnimatePresence>
  );
}
