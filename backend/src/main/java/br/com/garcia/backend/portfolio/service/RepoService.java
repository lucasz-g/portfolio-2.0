package br.com.garcia.backend.portfolio.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import br.com.garcia.backend.portfolio.client.GitHubClient;
import br.com.garcia.backend.portfolio.dtos.RepoResponseDTO;
import br.com.garcia.backend.portfolio.mapper.RepoMapper;

@Service
public class RepoService {

    // Injeção de dependência do GitHubClient
    private final GitHubClient gitHubClient;

    // Injeção de dependência do RepoMapper
    private final RepoMapper repoMapper;

    public RepoService(GitHubClient gitHubClient, RepoMapper repoMapper) {
        this.gitHubClient = gitHubClient;
        this.repoMapper = repoMapper;
    }

    // Métodos
    public List<RepoResponseDTO> getFeaturedRepos() {
        
        return gitHubClient.getAllRepos().stream()
                .filter(this::isFeatured)
                .map(
                        repo -> {
                            String languagesUrl = (String) repo.get("languages_url");
                            Map<String, Long> languages = gitHubClient.getLanguages(languagesUrl);

                            return repoMapper.toDto(repo, languages);
                        })
                .toList();
    }

    private boolean isFeatured(Map<String, Object> repo) {
        List<String> topics = (List<String>) repo.get("topics");

        return topics != null && topics.contains("featured");
    }

}
