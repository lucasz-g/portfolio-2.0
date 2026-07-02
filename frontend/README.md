# Portfolio 2.0

Aplicacao web moderna desenvolvida com React e Vite para apresentar perfil profissional, stacks, servicos, projetos em destaque e canais de contato.

Atualmente, o frontend se comunica diretamente com a GitHub REST API usando Axios para buscar repositorios marcados como destaque. A evolucao planejada e mover essa comunicacao para um backend proprio em Spring Boot, deixando o frontend consumir apenas a API da aplicacao.

## Status do Projeto

- Frontend em React pronto.
- Roteamento client-side com React Router.
- Integracao atual com GitHub API via Axios.
- Listagem dinamica de repositorios com topic `featured`.
- Componentes visuais com efeitos React Bits/WebGL.
- Deploy preparado para Vercel com fallback de rotas SPA.
- Backend Spring Boot planejado para intermediar a comunicacao com GitHub.

## Funcionalidades

- Home com apresentacao, sobre mim e stacks/servicos.
- Pagina de projetos com hero visual, efeito Orb e cards dinamicos.
- Cards de projetos alimentados pela GitHub API.
- Filtro de repositorios por topic `featured`.
- Leitura das linguagens de cada repositorio via endpoint `languages_url`.
- Pagina de contato com links para email, LinkedIn e GitHub.
- Layout responsivo para desktop e mobile.
- Efeitos visuais com `Beams`, `Orb` e `SpotlightCard`.

## Stack

### Frontend

- React 19
- Vite
- JavaScript
- CSS
- React Router
- Axios
- Three.js
- React Three Fiber
- Drei
- OGL
- Tailwind/Vite plugin configurado

### API Atual

- GitHub REST API
- Axios
- Token via variavel de ambiente `VITE_GITHUB_TOKEN`

### Backend Planejado

- Java
- Spring Boot
- Spring Web
- Spring Security
- REST API
- Integracao server-side com GitHub API
- Cache para respostas do GitHub
- DTOs para expor ao frontend apenas os dados necessarios

## Arquitetura Atual

Hoje o frontend chama a GitHub API diretamente:

```text
Browser
  |
  | React + Axios
  v
GitHub REST API
  |
  | /user/repos
  | /repos/{owner}/{repo}/languages
  v
Repositorios filtrados por topic "featured"
```

Fluxo implementado em `src/api/api.js`:

1. Le o token em `import.meta.env.VITE_GITHUB_TOKEN`.
2. Chama `https://api.github.com/user/repos`.
3. Busca os repositorios do usuario autenticado com `visibility=all` e `affiliation=owner`.
4. Para cada repositorio, chama `repo.languages_url`.
5. Monta um objeto simplificado com `id`, `name`, `description`, `url`, `homepage`, `languages` e `topics`.
6. Retorna apenas repositorios que possuem o topic `featured`.
7. `ProjectsItems.jsx` renderiza os dados usando `ProjectCard.jsx`.

### Observacao de Seguranca

Essa arquitetura e funcional para desenvolvimento, mas nao e ideal para producao quando ha token privado envolvido. Variaveis `VITE_*` sao expostas no bundle do frontend. Por isso, a migracao para um backend Spring Boot e o proximo passo correto.

## Arquitetura Planejada

Na arquitetura futura, o frontend deixa de conhecer o GitHub token:

```text
Browser
  |
  | GET /api/projects
  v
Spring Boot Backend
  |
  | GitHub token protegido no servidor
  | Chamada server-side para GitHub API
  | Cache, filtros e DTOs
  v
GitHub REST API
```

Responsabilidades planejadas do backend:

- Guardar o token do GitHub fora do frontend.
- Centralizar chamadas externas para GitHub.
- Aplicar filtros de destaque no servidor.
- Normalizar os dados em DTOs estaveis.
- Reduzir chamadas repetidas com cache.
- Tratar erros e limites de rate limit.
- Criar base para futuras features, como formulario de contato, analytics ou painel admin.

Endpoint esperado para o frontend:

```text
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

## Estrutura do Projeto

```text
frontend/
├── public/
│   ├── page-icon.png
│   └── page-icon-original.png
├── src/
│   ├── api/
│   │   └── api.js
│   ├── assets/
│   │   ├── about-me.png
│   │   ├── background.jpg
│   │   ├── background-2.jpg
│   │   ├── contact.png
│   │   ├── footer.jpg
│   │   ├── presentation-background.mp4
│   │   ├── projects-video.mp4
│   │   └── stacks-background.jpg
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
│   ├── index.css
│   └── main.jsx
├── vercel.json
├── vite.config.js
├── jsconfig.json
└── package.json
```

## Rotas

| Rota | Pagina | Descricao |
| --- | --- | --- |
| `/` | `Home` | Apresentacao, sobre mim e stacks/servicos |
| `/projects` | `Projects` | Hero de projetos e repositorios do GitHub |
| `/contact` | `Contact` | Links de contato |

## Componentes Principais

| Componente | Responsabilidade |
| --- | --- |
| `NavBar` | Navegacao principal |
| `Presentation` | Hero da Home com background visual `Beams` |
| `About` | Secao sobre o desenvolvedor |
| `Stacks` | Stacks e servicos com cards interativos |
| `ProjectsPanel` | Hero da pagina de projetos com `Orb` responsivo |
| `ProjectsItems` | Busca repositorios e controla loading/empty state |
| `ProjectCard` | Renderiza cada repositorio retornado pela API |
| `Footer` | Rodape visual do site |
| `Beams`, `Orb`, `SpotlightCard` | Efeitos visuais inspirados em React Bits |

## Variaveis de Ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_GITHUB_TOKEN=seu_token_do_github
```

Para a integracao atual, o token precisa ter permissao suficiente para listar os repositorios desejados. Caso queira exibir apenas repositorios publicos, a arquitetura pode ser ajustada para usar endpoints publicos sem token.

## Como Marcar Projetos em Destaque

No GitHub, adicione o topic abaixo aos repositorios que devem aparecer na pagina de projetos:

```text
featured
```

Somente repositorios com esse topic sao renderizados em `ProjectsItems`.

## Como Rodar Localmente

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Inicia o Vite em modo desenvolvimento |
| `npm run build` | Gera build de producao |
| `npm run preview` | Serve localmente o build de producao |
| `npm run lint` | Executa ESLint no projeto |

## Deploy

O projeto possui `vercel.json` com rewrite para SPA:

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

Isso permite acessar rotas como `/projects` e `/contact` diretamente no deploy da Vercel.

## Roadmap

- Criar backend Spring Boot.
- Mover token do GitHub para o backend.
- Criar endpoint `GET /api/projects`.
- Implementar cache para reduzir chamadas ao GitHub.
- Padronizar respostas e erros via DTOs.
- Atualizar frontend para consumir o backend proprio.
- Adicionar formulario de contato com envio pelo backend.
- Melhorar observabilidade e tratamento de rate limit.
- Preparar deploy fullstack.

## Autor

Lucas Garcia

Software Engineering Student  
Backend | Frontend | Data Systems | AI Applications
