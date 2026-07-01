import { Link } from "react-router"
import footerImage from "../../assets/footer.jpg"
import "./Footer.css"
import { Kicker } from '../kicker/Kicker.jsx'

export const Footer = () => {

    const localDate = new Date();
    const year = localDate.getFullYear();

    return (
        <footer className="footer" style={{ backgroundImage: `url(${footerImage})` }}>
            <div className="footer-content">
                <p>© {year} Lucas Garcia</p>

                <div className="made-year">
                    <Kicker titulo="Designed & Built" />
                    <Kicker titulo="React + Spring Boot" />
                </div>

                <nav className="footer-nav" aria-label="Footer navigation">
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
        </footer>
    )
}
