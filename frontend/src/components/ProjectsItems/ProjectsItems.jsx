import "./ProjectsItems.css"
import { getMyRepos } from "../../api/api"
import { useEffect, useState } from "react"
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { Kicker } from "../kicker/Kicker";

export const ProjectsItems = () => {
    const [myRepos, setMyRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect para buscar os repositórios quando o componente for montado
    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const repos = await getMyRepos();
                // Atualiza o estado com os repositórios obtidos da API
                setMyRepos(repos ?? []);
            } finally {
                setIsLoading(false);
            }
        };
        // Chamada da função fetchRepos para buscar os repositórios quando o componente for montado 
        fetchRepos();
    }, []);

    return (
        <section className="projects-items">
            <div className="projects-items-header">
                <Kicker titulo="Projects from my GitHub" />
                <h2>Featured repositories</h2>
            </div>

            <div className="projects-items-container">
                {isLoading ? (
                    <p className="projects-items-status">Loading projects...</p>
                ) : myRepos.length === 0 ? (
                    <p className="projects-items-status">No featured projects found.</p>
                ) : (
                    myRepos.map((repo) => (
                        <ProjectCard repo={repo} key={repo.id} />
                    ))
                )}
            </div>
        </section>
    )
}
