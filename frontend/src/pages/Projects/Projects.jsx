import { ProjectsItems } from "../../components/ProjectsItems/ProjectsItems"
import { ProjectsPanel } from "../../components/ProjectsPanel/ProjectsPanel"
import "./Projects.css"

export const Projects = () => {

    return (
        <main className="projects-page">
            <ProjectsPanel/>
            <ProjectsItems/>
        </main>
    )
}
