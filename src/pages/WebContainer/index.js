import { Outlet } from "react-router-dom";
import Footer from "../../components/WebsiteFooter"
import WebsiteNav from "../../components/WebsiteNav/index"
import { TransNav } from "../../components/WebsiteNav/index";
import "./index.css"
export default function WebContainer(){
    return(
        <div className="web">
            <TransNav/>
        <Outlet/>
        <Footer/>
        </div>
    )
}