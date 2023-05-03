import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WebContainer />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="services/package" element={<Package />} />
            <Route path="meraviglia-club" element={<Club />} />
            <Route path="services/types-of-travel" element={<TypeTravel />} />
            <Route path="services/partners" element={<Partner />} />
          </Route>
          <Route path="/login" element={<DashboardLogin />} />
          <Route path="/dashboard/" element={<DashboardContainer />}>
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<DashboardAdmin />} />
            <Route path="user" element={<DashboardUser />} />
            <Route path="booking" element={<DashboardBooking />} />
            <Route
              path="bookingmeeting"
              element={<DashboardBookingMeeting />}
            />
            <Route path="website-content" element={<DashboardWebContent />} />
            <Route path="inbox" element={<DashboardInbox />} />
            <Route path="type-travel" element={<DashboardTypeTravel />} />
            <Route path="news" element={<DashboardNews />} />
            <Route path="package" element={<DashboardPackage />} />
            <Route path="partner" element={<DashboardPartner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
