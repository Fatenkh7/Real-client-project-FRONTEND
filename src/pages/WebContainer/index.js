import { Outlet } from "react-router-dom";
import Nav from "../../components/WebsiteNav"
import Footer from "../../components/WebsiteFooter"
export default function WebContainer(){
    return(
        <div className="dashboard">
            <Nav/>
        <Outlet/>
        <Footer/>
        </div>
    )
}