const axios = require('axios');

const PAGE_ID = process.env.PAGE_ID_FACEBOOK
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_FACEBOOK
const HASHTAGS_VACANCIES = /#(MulheresNaTI|OrgulhoNaTecnologia|TalentosPretosNaTI)/g
const NAME_PAGE = 'Hashtag da inclusão'

class GetPostsController {
    /**
     * Get posts
     * 
     * @param { import("express").Request } req 
     * @param { import("express").Response } res 
     */
    async handler(req, res) {
        const posts = await this.getPosts();
        return res.render('main', { posts });
    }

    /**
     * Get posts
     */
    async getPosts() {
        const vacancies = [];

        const { data } = await axios.get(
            `${process.env.URL_API_FACEBOOK}/${PAGE_ID}/tagged?&access_token=${ACCESS_TOKEN}`
        );

        const posts = data.data;

        for await (const post of posts) {
            console.log(post)
            const existHashTag = post.message.match(HASHTAGS_VACANCIES);

            if (!existHashTag) {
                continue;
            }

            const { data: infoPost } = await axios.get(
                `${process.env.URL_API_FACEBOOK}/${post.id}?fields=permalink_url,message&access_token=${ACCESS_TOKEN}`
            );

            infoPost.message = infoPost.message.replace(NAME_PAGE, '');
            // infoPost.message = infoPost.message.replace(/#(\w+)/g, '<strong>#$1</strong>');

            vacancies.push({
                ...infoPost,
                title: existHashTag[0],
                hashTags: existHashTag
            })
        }

        return vacancies;
    }
}

module.exports = GetPostsController