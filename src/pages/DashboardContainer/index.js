import { Outlet } from "react-router-dom";
import Nav from "../../components/DashboardNav"
import DashboardNav from "../../components/DashboardNav";
export default function DashbooardContainer(){
    return(
        <div className="dashboard">
            <DashboardNav/>
        <Outlet/>
        </div>
    )
}