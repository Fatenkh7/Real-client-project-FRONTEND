import { Outlet } from "react-router-dom";
import Nav from "../../components/WebsiteNav"
import {Sidebar} from "../../components/WebsiteNav/index"
import Footer from "../../components/WebsiteFooter"
import {ResponNav} from "../../components/WebsiteNav/index"
import "./index.css"
export default function WebContainer(){
    return(
        <div className="web">
            <ResponNav/>
        <Outlet/>
        <Footer/>
        </div>
    )
}