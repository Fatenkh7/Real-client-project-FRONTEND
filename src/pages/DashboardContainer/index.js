import { Outlet } from "react-router-dom";
import Nav from "../../components/DashboardNav"
export default function DashbooardContainer(){
    return(
        <div className="dashboard">
        <Outlet/>
        </div>
    )
}