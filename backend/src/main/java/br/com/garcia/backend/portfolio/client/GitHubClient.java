package br.com.garcia.backend.portfolio.client;
import java.util.List;

import org.springframework.boot.jackson.autoconfigure.JacksonProperties.Json;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GitHubClient {
    private final RestClient restClient = RestClient.create();
    
    public void getUserRepos() {
        restClient.get().uri("https://api.github.com/user/repos").headers(null).retrieve(); 
    }
}
