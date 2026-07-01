import { Kicker } from "../kicker/Kicker"
import { ScrollArrow } from "../scrollArrow/ScrollArrow"
import stacksBackground from "../../assets/stacks-background.jpg"
import "./Stacks.css"
import { Link } from "react-router-dom"

const stackItems = [
    "Spring Boot",
    "React",
    "JavaScript",
    "Python",
    "FastAPI",
    "GenAI",
    "SQL Databases",
    "Docker",
    "Azure",
    "Oracle Cloud",
]

const serviceItems = [
    "APIs and Backend Systems",
    "Web Applications",
    "AI-powered Solutions",
    "GenAI Integrations",
    "Cloud Integrations",
    "Business Automation",
    "Containerized Deployments"
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

                <ScrollArrow targetId="stacks-services" label="Ir para stacks e services" />
            </div>

            <div id="stacks-services" className="stacks-content-panel">
                <div className="stacks-content-grid">
                    <div className="stacks-card">
                        <Kicker titulo="Stacks" />
                        <h3>Tools I use to build products</h3>
                        <ul className="stacks-list">
                            {/* Criando um item de lista para cada stack. */}
                            {stackItems.map((stack) => (
                                <li key={stack}>{stack}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="stacks-card">
                        <Kicker titulo="Services" />
                        <h3>What I can help ship</h3>
                        <ul className="stacks-list">
                            {/* Criando um item de lista para cada servico. */}
                            {serviceItems.map((service) => (
                                <li key={service}>{service}</li>
                            ))}
                        </ul>

                        <div className="go-to-projects">
                            <Link className="go-to-projects-link" to="/projects" aria-label="View projects">
                                <span>View Projects</span>
                                <svg className="go-to-projects-icon" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
