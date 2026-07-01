import axios from "axios";

export async function getMyRepos() {
  const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  // Paginação para pegar todos os repositórios
  let page = 1;
  let allRepos = [];

  try {
    const repos = await axios.get("https://api.github.com/user/repos", {
      headers: {
        Authorization: `Bearer ${TOKEN}`, // Token do meu user GitHub
        Accept: "application/vnd.github+json", // Recomendado pela documentação do GitHub
      },
      params: {
        visibility: "all", // Pode ser 'public', 'private' ou 'all'
        affiliation: "owner", // Traz apenas os repositórios sou o dono
        per_page: 100, // Número máximo de repositórios por página
        page: page, // Página atual
      },
    });

    if (repos.data.length === 0) {
      console.log("Nenhum repositório encontrado.");
    }

    // Adiciona cada repositório como um objeto no array allRepos.
    allRepos.push(...repos.data);
    // (...repos.data) -> Spread operator para adicionar todos os elementos, em vez de adicionar o array inteiro como um único elemento.
    page++;

    // Busca a URL dos repositórios retornados
    // Com Promise.all, podemos fazer requisições paralelas para obter detalhes de cada repositório
    const detailedRepos = await Promise.all(
      allRepos.map(async (repo) => {
        // Faz uma requisição para obter as linguagens do repositório
        // "Pegue a propriedade data do response e guarde numa variável chamada languages." Igual à:

        // const response = await axios.get(repo.languages_url);
        // const languages = response.data;

        const { data: languages } = await axios.get(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        });

        // DTO para retornar apenas as informações necessárias do repositório
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          homepage: repo.homepage,
          languages,
          topics: repo.topics
        };
      }),
    );
    // console.log(allRepos);

    // Filtra e retorna os repositórios que possuem o tópico "featured"
    const featuredRepos = detailedRepos.filter((repo) =>
      repo.topics.includes("featured"),
    );
    
    console.log(featuredRepos);
    return featuredRepos; 
  
  } catch (error) {
    console.error(
      "Erro de autenticação ou requisição:",
      error.response?.data || error.message,
    );
  }
}