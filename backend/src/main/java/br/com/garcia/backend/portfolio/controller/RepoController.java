package br.com.garcia.backend.portfolio.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.garcia.backend.portfolio.dtos.RepoResponseDTO;
import br.com.garcia.backend.portfolio.service.RepoService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/v1/repos")
public class RepoController {

    private final RepoService repoService;

    public RepoController(RepoService repoService) {
        this.repoService = repoService;
    }

    @GetMapping("/featured")
    @Operation(
        summary = "Lista os repositórios em destaque", description = "Retorna os repositórios do GitHub selecionados como destaque no portfólio"
    )
    public ResponseEntity<List<RepoResponseDTO>> getFeaturedRepos() {
        return ResponseEntity.ok(repoService.getFeaturedRepos()); 
    }

}
