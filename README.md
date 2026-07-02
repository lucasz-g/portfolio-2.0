# Portfolio 2.0

Monorepo do portfolio web de Lucas Garcia. O projeto combina um frontend moderno em React/Vite com um backend Spring Boot em construcao, planejado para centralizar a comunicacao com a GitHub API.

## Modulos

```text
portfolio-2.0/
├── frontend/   # React + Vite, UI do portfolio e integracao atual com GitHub API
└── backend/    # Spring Boot, futuro gateway da GitHub API
```

| Modulo | Status | README |
| --- | --- | --- |
| `frontend` | Implementado e integrado diretamente com GitHub API | [`frontend/README.md`](frontend/README.md) |
| `backend` | Scaffold Spring Boot criado, API ainda em desenvolvimento | [`backend/README.md`](backend/README.md) |

## Visao Geral

O portfolio apresenta:

- Home com apresentacao, sobre mim, stacks e servicos.
- Pagina de projetos com repositorios carregados dinamicamente.
- Pagina de contato.
- Efeitos visuais com componentes React Bits/WebGL.
- Deploy frontend preparado para Vercel.
- Backend Spring Boot planejado para proteger credenciais e organizar a integracao com GitHub.

## Arquitetura Atual

Hoje o frontend acessa a GitHub API diretamente pelo browser.

```mermaid
flowchart LR
    user[Usuario] --> browser[Browser]
    browser --> react[Frontend React + Vite]
    react --> axios[Axios]
    axios --> github[GitHub REST API]
    github --> repos[Repositorios]
    repos --> filter[Filtro topic: featured]
    filter --> cards[Project Cards]
```

Fluxo atual:

```mermaid
sequenceDiagram
    participant User as Usuario
    participant UI as React Frontend
    participant API as GitHub REST API

    User->>UI: Acessa /projects
    UI->>API: GET /user/repos
    API-->>UI: Lista de repositorios
    loop Para cada repositorio
        UI->>API: GET languages_url
        API-->>UI: Linguagens do repositorio
    end
    UI->>UI: Filtra topic "featured"
    UI-->>User: Renderiza cards de projetos
```

### Limite da Arquitetura Atual

O token atual e lido como `VITE_GITHUB_TOKEN`. Variaveis `VITE_*` entram no bundle do frontend, entao essa abordagem e temporaria e deve ser substituida pelo backend.

## Arquitetura Alvo

Na arquitetura final, o frontend chamara apenas a API propria. O backend Spring Boot sera responsavel por chamar o GitHub, proteger o token, normalizar dados e aplicar regras de cache/filtro.

```mermaid
flowchart LR
    user[Usuario] --> browser[Browser]
    browser --> frontend[Frontend React + Vite]
    frontend --> backend[Backend Spring Boot]
    backend --> service[Project Service]
    service --> cache[(Cache opcional)]
    service --> client[GitHub Client]
    client --> github[GitHub REST API]
    github --> client
    client --> service
    service --> dto[ProjectResponse DTO]
    dto --> backend
    backend --> frontend
    frontend --> cards[Project Cards]
```

Fluxo planejado:

```mermaid
sequenceDiagram
    participant User as Usuario
    participant UI as React Frontend
    participant BE as Spring Boot API
    participant GH as GitHub REST API

    User->>UI: Acessa /projects
    UI->>BE: GET /api/projects
    BE->>BE: Valida cache e regras
    BE->>GH: GET /user/repos
    GH-->>BE: Repositorios
    BE->>GH: GET languages_url
    GH-->>BE: Linguagens
    BE->>BE: Filtra topic "featured" e monta DTO
    BE-->>UI: Lista de projetos
    UI-->>User: Renderiza cards
```

## Contrato Planejado

```http
GET /api/projects
```

Resposta esperada:

```json
[
  {
    "id": 123,
    "name": "project-name",
    "description": "Project description",
    "url": "https://github.com/user/project-name",
    "homepage": "https://project-demo.vercel.app",
    "languages": {
      "JavaScript": 12000,
      "CSS": 3000
    },
    "topics": ["featured"]
  }
]
```

## Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- CSS
- Three.js, React Three Fiber, Drei e OGL

### Backend

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Security
- Spring Data JPA
- RestClient
- H2 e PostgreSQL
- Lombok

## Como Rodar

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

No Windows PowerShell:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

## Roadmap Fullstack

- Implementar `GET /api/projects` no backend.
- Mover `GITHUB_TOKEN` para variavel de ambiente server-side.
- Trocar o frontend para consumir o backend.
- Adicionar cache para reduzir chamadas ao GitHub.
- Padronizar respostas e tratamento de erros.
- Preparar deploy fullstack.

## Autor

Lucas Garcia  
Software Engineering Student  
Backend | Frontend | Data Systems | AI Applications
