import {Link} from "react-router-dom"
import style from "./index.module.css"
import Phone from "../PhoneIcon"
import Email from "../EmailIcon"
export default function Footer(){
    return(
    <footer className={style.footer}>
        <nav><h4>Check Our Collection of Services</h4>
        <Link>Packages</Link>
        <Link>Our Partners</Link>
        </nav>
        <nav><h4>Get Involved</h4>
        <Link>Join Our Club</Link>
        <Link>Book A Meeting</Link>
        <Link>Send Us A Message</Link>
        </nav>
        <hr></hr>
        <div>
        <h2>Meraviglia</h2> 
        <Phone id="phoneIcon"/>
        <a href="tel:">55009988</a>
        <Email id="emailIcon"/>
        <a href="mail:hhh@gmail.com">hhg@hhh.com</a>
        </div>
    </footer>)
}