const axios = require('axios');

const pageId = "159860113868666";
const accessToken = 'EAARdd07ICmcBOxQfLWdUlQkseR2w7IZBRItkFGND2dG18EVFihRLR6K5T1groxmPnWHjmlqcKrPzZABAWzAKbJZBxmSoys9y36yySQUVE8XqCKOupCrNSSb6ZAXZA4N04UXTGcIiZC3iV93UAu7Gx9ZA1dwc67EbVeIXhEUYyEZA815X1TmZBqy4uZBA7ojQh2OWpC6vPonoAOqU5paryEv26kZCOYZD';
const keyword = 'SUA_PALAVRA_CHAVE'; // A palavra-chave que você deseja procurar

// Função para buscar postagens que mencionam a sua página
async function searchMentions() {
  try {
    // const response = await axios.get(
    //   `https://graph.facebook.com/v12.0/${pageId}/posts?fields=message,id&access_token=${accessToken}`
    // );

    const response = await axios.get(
        `https://graph.facebook.com/v12.0/${pageId}/tagged?&access_token=${accessToken}`
    );

    const posts = response.data.data;

    posts.forEach(async (post) => {
      // console.log(post)
      const postResp = await axios.get(
        `https://graph.facebook.com/v12.0/${post.id}?fields=permalink_url,message&access_token=${accessToken}`
      );
      console.log(postResp.data)
    });
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
  }
}

// Executa a busca de menções em um intervalo
const interval = 60000; // Intervalo em milissegundos (1 minuto)

setInterval(() => {
  searchMentions();
}, interval);

// Inicializa a busca de menções
searchMentions();
