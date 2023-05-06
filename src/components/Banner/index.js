import Style from "./index.module.css";
export default function Banner(props){
    return(
        <div className={Style.banner} style={{backgroundImage:`url(${props.img})`}} >{props.text}</div>
    )
}
