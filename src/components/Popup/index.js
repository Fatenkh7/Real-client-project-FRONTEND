import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./index.css";

export default function Popup(props) {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h2>{props.title}</h2>
          <div className="popup-close" onClick={props.close}>
            <CloseOutlined />
          </div>
        </div>
        <div className="popup-body">{props.children}</div>
      </div>
    </div>
  );
}
