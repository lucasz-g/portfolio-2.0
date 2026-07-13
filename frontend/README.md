# Portfolio 2.0 - Frontend

Frontend do portfolio, desenvolvido com React e Vite. Esta aplicacao entrega a experiencia visual do site, as rotas publicas e a integracao atual com a GitHub REST API para carregar projetos em destaque.

## Estado Atual

- Frontend implementado.
- Integracao direta com GitHub API via Axios.
- Listagem dinamica de repositorios marcados com topic `featured`.
- Efeitos visuais com componentes React Bits/WebGL.
- Responsividade desktop/mobile.
- Deploy preparado para Vercel.

> Decisão arquitetural: o frontend continuará consultando o GitHub diretamente. O backend Spring Boot em `../backend` é um módulo independente e não será requisito para o site funcionar.

## Rotas

| Rota | Pagina | Descricao |
| --- | --- | --- |
| `/` | `Home` | Presentation, About e Stacks |
| `/projects` | `Projects` | Hero de projetos e cards vindos da GitHub API |
| `/contact` | `Contact` | Links de contato |

## Arquitetura do Frontend

```mermaid
flowchart TD
    main[main.jsx] --> app[App.jsx]
    app --> router[BrowserRouter]
    router --> home[Home]
    router --> projects[Projects]
    router --> contact[Contact]

    home --> presentation[Presentation + Beams]
    home --> about[About]
    home --> stacks[Stacks + SpotlightCard]

    projects --> panel[ProjectsPanel + Orb]
    projects --> items[ProjectsItems]
    items --> api[src/api/api.js]
    api --> github[GitHub REST API]
    items --> card[ProjectCard + SpotlightCard]

    contact --> contactLinks[Email, LinkedIn, GitHub]
```

## Fluxo Atual de Projetos

```mermaid
sequenceDiagram
    participant Page as ProjectsItems
    participant Api as src/api/api.js
    participant GH as GitHub REST API

    Page->>Api: getMyRepos()
    Api->>GH: GET /user/repos
    GH-->>Api: Repositorios
    loop Repositorios retornados
        Api->>GH: GET repo.languages_url
        GH-->>Api: Linguagens
    end
    Api->>Api: Filtra topic "featured"
    Api-->>Page: Projetos normalizados
    Page-->>Page: Renderiza ProjectCard
```

## Estrutura

```text
frontend/
├── public/
├── src/
│   ├── api/
│   │   └── api.js
│   ├── assets/
│   ├── components/
│   │   ├── about/
│   │   ├── Footer/
│   │   ├── kicker/
│   │   ├── NavBar/
│   │   ├── presentation/
│   │   ├── ProjectCard/
│   │   ├── ProjectsItems/
│   │   ├── ProjectsPanel/
│   │   ├── scrollArrow/
│   │   ├── ScrollToHash/
│   │   └── stacks/
│   ├── pages/
│   │   ├── Contact/
│   │   ├── Home/
│   │   └── Projects/
│   ├── react-bits/
│   │   ├── Beams.jsx
│   │   ├── Orb.jsx
│   │   └── SpotlightCard.jsx
│   ├── App.jsx
│   └── main.jsx
├── vercel.json
├── vite.config.js
└── package.json
```

## Integracao Atual com GitHub

Arquivo principal:

```text
src/api/api.js
```

O frontend:

1. Le `VITE_GITHUB_TOKEN`.
2. Busca repositorios em `https://api.github.com/user/repos`.
3. Busca linguagens pelo `languages_url` de cada repositorio.
4. Monta um objeto simplificado para a UI.
5. Filtra apenas repositorios com topic `featured`.

## Variaveis de Ambiente

Crie um arquivo `.env` dentro de `frontend/`:

```env
VITE_GITHUB_TOKEN=seu_token_do_github
```

Importante: qualquer variável `VITE_*` é exposta no bundle final. Portanto, `VITE_GITHUB_TOKEN` não é um segredo. Para manter a arquitetura direta com menor risco, uma evolução possível é consultar apenas repositórios públicos sem token. Enquanto um token for necessário, ele deve ter permissões mínimas e nunca possuir acesso de escrita.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Inicia o Vite em desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | Executa ESLint |

## Deploy

O arquivo `vercel.json` configura rewrite para SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Isso permite acessar diretamente `/projects` e `/contact` no deploy da Vercel.

## Relação com o backend

O backend Spring Boot foi implementado como uma aplicação paralela para estudo e demonstração de integração, camadas, segurança, OpenAPI e testes.

```text
Frontend React ──> GitHub REST API
Backend Spring ──> GitHub REST API
```

O frontend não chama o backend. Assim, o deploy na Vercel não depende da disponibilidade, hospedagem ou latência de uma API própria. O backend pode evoluir e ser publicado separadamente no futuro sem alterar essa garantia de funcionamento do site.
