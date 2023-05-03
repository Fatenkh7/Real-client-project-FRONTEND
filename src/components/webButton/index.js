import Style from "./index.module.css"
export default function WebBtn({text, event, cc}){
        if(event){return(<button onClick={event} className={Style.btn}>{text}</button>) }
       else return(<button onClick={()=> {console.log("void")}} className={Style.btn} style={{alignSelf:"flex-end"}}>{text}</button>)
}
