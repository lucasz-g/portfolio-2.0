import "./ProjectCard.css"; 

export const ProjectCard = ({ repo }) => {
    const languages = Object.keys(repo.languages ?? {});

    return (
        <div className="project-card">
            <div className="project-card-content">
                <h3>{repo.name}</h3>
                <p className="project-card-description">
                    {repo.description || "No description available yet."}
                </p>
            </div>

            <div className="project-card-languages" aria-label="Project languages">
                {languages.length > 0 ? (
                    languages.map((language) => (
                        <span key={language}>{language}</span>
                    ))
                ) : (
                    <span>Code</span>
                )}
            </div>

            <div className="project-card-actions">
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                {/* Condicional para verificar se o repositório possui uma homepage antes de renderizar o link */}
                {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                        Live preview
                    </a>
                )}
            </div>
        </div>
    );
};
