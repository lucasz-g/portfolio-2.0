package br.com.garcia.backend.portfolio.client;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GitHubClientTest {

    @Autowired
    private GitHubClient gitHubClient;

    @Test
    void testLoadContext() {
        assertNotNull(gitHubClient);
    }

    @Disabled("Teste manual: chama a API real do GitHub e depende de token valido")
    @Test
    void testGetReposByPage() {
        // arrange
        int page = 1;

        // act
        List<Map<String, Object>> repos = gitHubClient.getReposByPage(page);

        // assert
        assertNotNull(repos);

        System.out.println("Repos from page " + page + ":");
        repos.forEach(repo -> System.out.println(repo.get("name")));
    }

    @Disabled("Teste manual: chama a API real do GitHub e depende de token válido")
    @Test
    void testGetAllRepos() {
        // act
        List<Map<String, Object>> allRepos = gitHubClient.getAllRepos();

        // assert
        assertNotNull(allRepos);

        // Limitar a quantidade de repositórios exibidos
        int limit = 0;
        while (limit <= 5) {
            allRepos.forEach(repo -> {
                repo.forEach((key, value) -> System.out.println(key + ": " + value));
            });
            limit++; 
        }
    }
}
