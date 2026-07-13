package br.com.garcia.backend.portfolio.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.garcia.backend.portfolio.client.GitHubClient;
import br.com.garcia.backend.portfolio.dtos.RepoResponseDTO;
import br.com.garcia.backend.portfolio.mapper.RepoMapper;

@ExtendWith(MockitoExtension.class)
public class RepoServiceTest {

        @Mock // Mock do bean GitHubClient
        private GitHubClient gitHubClient;

        private RepoService repoService;

        private RepoMapper repoMapper;

        // Executado antes de cada teste da sua classe
        @BeforeEach
        void setUp() {
                repoMapper = new RepoMapper();
                repoService = new RepoService(gitHubClient, repoMapper);
        }

        // Testes unitários
        @Test
        void deveBuscarReposFiltrarFeaturedEConstruirDtosComMock() {
                // arrange

                // 1. Repo types:
                Map<String, Object> repoFeatured = Map.of(
                                "id", 1275518363,
                                "name", "portfolio-2.0",
                                "description", "Modern React portfolio integrated with GitHub API via Axios",
                                "html_url", "https://github.com/lucasz-g/portfolio-2.0",
                                "homepage", "https://portfolio-2-0-eosin.vercel.app",
                                "languages_url", "https://api.github.com/repos/lucasz-g/portfolio-2.0/languages",
                                "topics", List.of("featured"));

                Map<String, Object> repoNormal = Map.of(
                                "id", 999,
                                "name", "repo-normal",
                                "description", "Repo sem destaque",
                                "html_url", "https://github.com/lucasz-g/repo-normal",
                                "homepage", "",
                                "languages_url", "https://api.github.com/repos/lucasz-g/repo-normal/languages",
                                "topics", List.of("study"));

                // 2. .when() ainda na fase de mock do GitHubClient. "Interceptando" os método e
                // retornando
                // os mocks.
                // “Quando o RepoService chamar gitHubClient.getAllRepos, não vá no GitHub real.
                // Devolva esta lista aqui que eu preparei.”
                when(gitHubClient.getAllRepos()).thenReturn(List.of(repoFeatured, repoNormal));

                // 3. Métodos de get linguagem
                when(gitHubClient.getLanguages("https://api.github.com/repos/lucasz-g/portfolio-2.0/languages"))
                                .thenReturn(Map.of("JavaScript", 43201L, "CSS", 21797L, "Java", 8958L));

                // act
                List<RepoResponseDTO> reposResponse = repoService.getFeaturedRepos();

                // assert
                assertNotNull(reposResponse);
                assertEquals(1, reposResponse.size());

                RepoResponseDTO repo = reposResponse.get(0);

                assertEquals(1275518363L, repo.repoId());
                assertEquals("portfolio-2.0", repo.repoName());
                assertEquals("Modern React portfolio integrated with GitHub API via Axios", repo.repoDescription());
                assertEquals("https://github.com/lucasz-g/portfolio-2.0", repo.repoUrl());
                assertEquals("https://portfolio-2-0-eosin.vercel.app", repo.repoHomePage());

                assertNotNull(repo.languages());
                assertEquals(43201L, repo.languages().get("JavaScript"));
                assertEquals(21797L, repo.languages().get("CSS"));
                assertEquals(8958L, repo.languages().get("Java"));

                assertNotNull(repo.repoTopics());
                assertTrue(repo.repoTopics().contains("featured"));

                verify(gitHubClient, never()).
                        getLanguages("https://api.github.com/repos/lucasz-g/repo-normal/languages");

                assertFalse(reposResponse.stream().
                        anyMatch(item -> item.repoName().equals("repo-normal")));

        }
}
