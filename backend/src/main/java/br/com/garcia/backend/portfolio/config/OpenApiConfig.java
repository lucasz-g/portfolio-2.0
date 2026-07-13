package br.com.garcia.backend.portfolio.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Portfolio GitHub API",
        version = "1.0",
        description = "API intermediária para consulta e processamento dos projetos em destaque do GitHub."
    )
)
public class OpenApiConfig {
}