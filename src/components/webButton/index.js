import Style from "./index.module.css"
export default function WebBtn({text, event}){
        if(event){return(<button onClick={event} className={Style.btn}>{text}</button>) }
       else return(<button onClick={()=> {console.log("void")}} className={Style.btn}>{text}</button>)
}
