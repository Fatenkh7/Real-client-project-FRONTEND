import { Outlet } from "react-router-dom";
import Footer from "../../components/WebsiteFooter"
import WebsiteNav from "../../components/WebsiteNav/index"
import { TopNav } from "../../components/WebsiteNav/index";
import "./index.css"
export default function WebContainer(){
    return(
        <div className="web">
            <TopNav/>
        <Outlet/>
        <Footer/>
        </div>
    )
}