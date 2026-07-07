package br.com.garcia.backend.portfolio.dtos;

import java.util.List;
import java.util.Map;

public record RepoResponseDTO(
    Long repoId,
    String repoName, 
    String repoDescription,
    String repoUrl,
    String repoHomePage,
    Map<String, Long> languages,
    List<String> repoTopics
) {
    
}
