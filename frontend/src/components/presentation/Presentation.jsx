import presentationBackground from "../../assets/presentation-background.mp4"
import { ScrollArrow } from "../scrollArrow/ScrollArrow"
import "./presentation.css"

export const Presentation = () => {
    return (
        <section id="home" className="presentation-section">
            <video className="presentation-video" autoPlay muted loop playsInline>
                <source src={presentationBackground} type="video/mp4" />
            </video>

            <div className="role-name-div">
                <p className="role">software engineer</p>
                <h1>Lucas Garcia</h1>
                <p className="role-description">Backend development, AI integration and modern web applications.</p>
            </div>

            <ScrollArrow targetId="about" label="Ir para a secao About" />
        </section>
    )
}
