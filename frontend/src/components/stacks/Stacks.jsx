import { Kicker } from "../kicker/Kicker"
import stacksBackground from "../../assets/stacks-background.jpg"
import "./Stacks.css"

const stackItems = [
    "Spring Boot",
    "React",
    "JavaScript",
    "Python",
    "FastAPI",
    "Relational Databases",
    "Azure",
    "Oracle Cloud",
]

const serviceItems = [
    "Backend APIs",
    "Web Applications",
    "AI-powered Solutions",
    "Automation Systems",
    "Cloud Integrations",
    "Business Workflows",
]

export const Stacks = () => {
    return (
        <section id="stacks" className="stacks-section">
            <div className="stacks-title-panel">
                <img className="stacks-background" src={stacksBackground} alt="" />
                <div className="stacks-title-content">
                    <Kicker titulo="Tech stack" />
                    <h2>Stacks & Services</h2>
                </div>
            </div>

            <div className="stacks-content-panel">
                <div className="stacks-content-grid">
                    <div className="stacks-card">
                        <Kicker titulo="Stacks" />
                        <h3>Tools I use to build products</h3>
                        <ul className="stacks-list">
                            {/* Criando item list para cada item na lista de stacks */}
                            {stackItems.map((stack) => (
                                <li key={stack}>{stack}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="stacks-card">
                        <Kicker titulo="Services" />
                        <h3>What I can help ship</h3>
                        <ul className="stacks-list">
                            {/* Criando item list para cada item na lista de services */}
                            {serviceItems.map((service) => (
                                <li key={service}>{service}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
