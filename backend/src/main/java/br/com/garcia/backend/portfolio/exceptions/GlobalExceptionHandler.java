package br.com.garcia.backend.portfolio.exceptions;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice // observa exceções lançadas pelos controllers;
public class GlobalExceptionHandler {

    @ExceptionHandler(GitHubApiException.class) // escolhe quais exceções o método trata
    public ResponseEntity<ApiErrorResponse> handleGitHubApiException(GitHubApiException exception,
            HttpServletRequest request 
            // fornece a rota que apresentou erro;
        ) {
        HttpStatus status = HttpStatus.BAD_GATEWAY;

        // mantém um contrato JSON consistente;
        ApiErrorResponse response = new ApiErrorResponse(
                Instant.now(),
                status.value(),
                status.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI()
        );

        // controla corpo e status HTTP
        return ResponseEntity.status(status).body(response); 

    }

}
