package br.com.garcia.backend.portfolio.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import br.com.garcia.backend.portfolio.dtos.RepoResponseDTO;

@SpringBootTest
public class RepoServiceIntegrationTest {

    @Autowired
    private RepoService repoService;

    // Teste manual de integração
    @Disabled("Teste manual: Chama API do GitHub e mapeia a resposta para DTO")
    @Test
    void deveBuscarReposDoGithubFiltrarFeaturedEConstruirDtos() {
        List<RepoResponseDTO> repos = repoService.getFeaturedRepos();

        assertNotNull(repos);
        assertFalse(repos.isEmpty(), "Deveria retornar pelo menos um repo com topic featured");

        repos.forEach(repo -> {
            assertNotNull(repo.repoId());
            assertTrue(repo.repoName() != null && !repo.repoName().isBlank());
            assertTrue(repo.repoUrl() != null && repo.repoUrl().startsWith("https://github.com/"));
            assertNotNull(repo.languages());
            assertNotNull(repo.repoTopics());
            assertTrue(repo.repoTopics().contains("featured"));

            System.out.println(repo);
        });
    }

}
