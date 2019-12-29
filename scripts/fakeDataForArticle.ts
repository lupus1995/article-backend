import {Article} from '../src/articles/entities/article.entity';
import * as faker from 'faker';
import moment = require('moment');
import {Comments} from '../src/articles/entities/comment.entity';

const articles: Article[] = [];
const comments: Comments[] = [];

for (let idArticle: number = 0; idArticle < 1000; idArticle++) {
    for (let idComment: number = 0; idComment < 10; idComment++) {
        const comment: Comments = {
            id: idComment,
            articleId: idArticle,
            comment: faker.lorem.words(10),
            createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        };
        comments.push(comment);
    }

    const article: Article = {
        id: idArticle,
        title: faker.name.title(),
        article: faker.lorem.words(10),
        description: faker.lorem.words(10),
        authorId: 1,
        createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    articles.push(article);
}
export default articles;
export {comments};
// const repository = getRepository(ArticleRepository);

// repository.save(articles)
//     .then(() => console.log('data saved'))
//     .catch((e) => console.log(e));
