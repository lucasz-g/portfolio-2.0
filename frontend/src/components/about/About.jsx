import "./About.css"
import aboutImage from "../../assets/about-me.png"
import { Kicker } from "../kicker/Kicker"
import { ScrollArrow } from "../scrollArrow/ScrollArrow"

export const About = () => {
    return (
        <section id="about" className="about-me">
            <div className="about-me-content">
                <div className="about-me-img">
                    <img src={aboutImage} alt="Lucas Garcia" />
                </div>

                <div className="about-me-container">
                    <Kicker titulo="About Me"/>
                    <h2>Turning ideas into software solutions.</h2>

                    <div className="about-me-text">
                        <p>
                            Software Engineer focused on backend development, modern web applications, and AI solutions.
                        </p>

                        <p>
                            Experienced in building scalable APIs, React applications, cloud integrations, and automation workflows that connect data, business processes, and intelligent systems.
                        </p>

                        <p>
                            Passionate about building products that combine software engineering, artificial intelligence, and real-world business impact.
                        </p>
                    </div>
                </div>
            </div>

            <ScrollArrow targetId="stacks" label="Ir para a secao Stacks" />
        </section>
    )
}
