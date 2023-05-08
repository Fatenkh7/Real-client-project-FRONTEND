import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import {AdminCheck, SuperAdminCheck, UserCheck} from "./auth"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Package from "./pages/Package";
import TypeTravel from "./pages/TypeTravel";
import Partner from "./pages/Partner";
import Login from "./pages/UserLogin";
import WebContainer from "./pages/WebContainer";
import Club from "./pages/Club";
import DashboardContainer from "./pages/DashboardContainer";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardLogin from "./pages/DashboardLogin";
import DashboardInbox from "./pages/DashboardInbox";
import DashboardPackage from "./pages/DashboardPackage";
import DashboardPartner from "./pages/DashboardPartner";
import DashboardTypeTravel from "./pages/DashboardTypeTravel";
import DashboardNews from "./pages/DashboardNews";
import DashboardUser from "./pages/DashboardUser";
import DashboardBooking from "./pages/DashboardBooking";
import DashboardBookingMeeting from "./pages/DashboardBookingMeeting";
import DashboardWebContent from "./pages/DashboardWebContent";
import { AnimatePresence } from "framer-motion";
import {useState, createContext} from "react";
export   const RoleContext = createContext()
function App() {
  /*const changeConfig=(token, id, role)=>{
    setConfig({
      ...config, Authorization: `Bearer ${token}`,
      id: id,
      role: role, 
    })
  }*/
  const changeConfig=(token, id, role)=>{
    setConfig(prevState => ({
      ...prevState, Authorization: `Bearer ${token}`,
      id: id,
      role: role, 
    }))
  }
  const [config, setConfig]=useState({
    Authorization: `Bearer `,
    id: "",
    role: "", changeConfig
  })
  return (
    <RoleContext.Provider value={config}>
    <div className="App">
      <AnimatePresence mode="wait">
      <BrowserRouter key="batata">
        <Routes  >
          <Route path="/" element={<WebContainer />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="booking" element={<Contact/>} />
            <Route path="services/package" element={<Package />} />
            <Route path="login" element={<Login />} />
            <Route path="meraviglia-club" element={<Club />} />
            <Route path="services/types-of-travel" element={<TypeTravel />} />
            <Route path="services/partner" element={<Partner />} />
          </Route>
          <Route path="/login-admin" element={<DashboardLogin />} />
          <Route path="/dashboard/" element={<DashboardContainer />}>
            <Route path="admin" element={<SuperAdminCheck><DashboardAdmin /></SuperAdminCheck>} />
            <Route path="user" element={<AdminCheck><DashboardUser /></AdminCheck>} />
            <Route path="booking" element={<AdminCheck><DashboardBooking /></AdminCheck>} />
            <Route
              path="bookingmeeting"
              element={<AdminCheck><DashboardBookingMeeting /></AdminCheck>}
            />
            <Route path="website-content" element={<DashboardWebContent />} />
            <Route path="inbox" element={<AdminCheck><DashboardInbox /> </AdminCheck>} />
            <Route path="type-travel" element={<DashboardTypeTravel />} />
            <Route path="news" element={<DashboardNews />} />
            <Route path="package" element={<AdminCheck><DashboardPackage /></AdminCheck>} />
            <Route path="partner" element={<AdminCheck><DashboardPartner /></AdminCheck>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AnimatePresence>
    </div>
    </RoleContext.Provider>
  );
}

export default App;
