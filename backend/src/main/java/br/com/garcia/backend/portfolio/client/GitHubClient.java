package br.com.garcia.backend.portfolio.client;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import br.com.garcia.backend.portfolio.config.GitHubProperties;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class GitHubClient {
    private final RestClient restClient;

    // Injeção de dependência do RestClient e das propriedades do GitHub
    public GitHubClient(RestClient.Builder restClientBuilder, GitHubProperties gitHubProperties) {
        // Quando o GitHubClient é instanciado, ele configura o RestClient com a URL
        // base da API do GitHub e adiciona o token de autenticação como um cabeçalho
        // padrão.
        this.restClient = restClientBuilder
                .baseUrl("https://api.github.com")
                .defaultHeaders(
                        headers -> {
                            headers.setBearerAuth(gitHubProperties.token());
                            headers.set("Accept", "application/vnd.github.v3+json");
                        })
                .build();
    }

    // Método para buscar os repositórios do usuário autenticado na página
    // especificada
    // Retorno é uma lista de mapas (JSON/Dictionary) com os dados dos repositórios
    public List<Map<String, Object>> getReposByPage(int page) {
        try {
            return restClient.get()
                    // Constrói a URI para a requisição, incluindo os parâmetros de consulta para
                    // visibilidade, afiliação, número de itens por página e número da página
                    .uri(uriBuilder -> uriBuilder
                            .path("/user/repos")
                            .queryParam("visibility", "all")
                            .queryParam("affiliation", "owner")
                            .queryParam("per_page", 100)
                            .queryParam("page", page)
                            .build())
                    .retrieve()
                    // Converte a resposta da API para uma lista de mapas (JSON/Dictionary)
                    .body(new ParameterizedTypeReference<List<Map<String, Object>>>() {
                    });
        } catch (Exception e) {
            // Em caso de erro, imprime a mensagem de erro e retorna null
            System.err.println("Erro ao buscar repositórios na página " + page + ": " + e.getMessage());
            return null;
        }

    }

    public List<Map<String, Object>> getAllRepos() {
        int page = 1;
        // Inicializa uma lista para armazenar os repositórios da página atual da API
        // A lista foi criada dentro do método para evitar problemas de concorrência em
        // chamadas simultâneas
        List<Map<String, Object>> apiRepos;
        // Inicializa uma lista para armazenar todos os repositórios do usuário
        // A lista foi criada dentro do método para evitar problemas de concorrência em
        // chamadas simultâneas
        List<Map<String, Object>> allMyRepos = new ArrayList<>();

        while (true) {
            // Busca os repositórios da página atual
            apiRepos = getReposByPage(page);
            // Se não houver mais repositórios, sai do loop
            if (apiRepos == null || apiRepos.isEmpty()) {
                break;
            }
            // Se houver repositórios, adiciona-os à lista de todos os repositórios
            allMyRepos.addAll(apiRepos);
            // Incrementa o número da página para buscar a próxima página na próxima
            // iteração
            page++;

        }

        return allMyRepos;
    }

    public Map<String, Long> getLanguages(String languagesUrl) {
        return restClient.get().uri(languagesUrl).retrieve().body(new ParameterizedTypeReference<Map<String, Long>>() {
        });
    }

}
