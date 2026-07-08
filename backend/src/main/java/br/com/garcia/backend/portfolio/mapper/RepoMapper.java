package br.com.garcia.backend.portfolio.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import br.com.garcia.backend.portfolio.dtos.RepoResponseDTO;

@Component
public class RepoMapper {

    public RepoResponseDTO toDto(Map<String, Object> repo, Map<String, Long> languages) {
        return new RepoResponseDTO(
                ((Number) repo.get("id")).longValue(),
                (String) repo.get("name"),
                (String) repo.get("description"),
                (String) repo.get("html_url"),
                (String) repo.get("homepage"),
                languages,
                (List<String>) repo.get("topics"));
    }
     
}
