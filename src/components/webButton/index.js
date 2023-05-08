import { Children } from "react"
import Style from "./index.module.css"
export default function WebBtn({children, event, cc}){
        if(event){return(<button onClick={event} className={Style.btn}>{children}</button>) }
       else return(<button onClick={()=> {console.log("void")}} className={Style.btn} >{children}</button>)
}
