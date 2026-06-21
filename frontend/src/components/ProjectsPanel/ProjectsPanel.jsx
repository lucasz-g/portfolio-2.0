import projectsVideo from "../../assets/projects-video.mp4"
import { Kicker } from "../../components/Kicker/Kicker"
import "./ProjectsPanel.css"

export const ProjectsPanel = () => {
    return (
        <section className="projects-hero">
            <div className="projects-video-frame">
                <video className="projects-video" autoPlay muted loop playsInline preload="auto">
                    <source src={projectsVideo} type="video/mp4" />
                </video>
            </div>

            <div className="projects-copy">
                <Kicker titulo="Selected Work" />
                <h1>Projects</h1>
                <p><p>
                    A collection of software solutions, applications and experiments built throughout my software engineering journey.
                </p></p>
            </div>
        </section>
    )
}