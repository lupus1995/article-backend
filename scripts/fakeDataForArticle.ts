import {Article} from '../src/articles/entities/article.entity';
import * as faker from 'faker';
import {Comments} from '../src/articles/entities/comment.entity';
import {User, UserRole} from '../src/users/entities/user.entity';
import moment = require('moment');

const articles: Article[] = [];
const comments: Comments[] = [];

const admin: User = {
    name: 'Alex',
    surname: 'Panfilov',
    role: UserRole.ADMIN,
    createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
};

for (let idArticle: number = 0; idArticle < 1000; idArticle++) {
    for (let idComment: number = 0; idComment < 10; idComment++) {
        const comment: Comments = {
            articleId: idArticle + 1,
            comment: faker.lorem.words(10),
            createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        };
        comments.push(comment);
    }

    const article: Article = {
        title: Math.random().toString(36).substring(2, 15),
        article: faker.lorem.words(10),
        description: faker.lorem.words(10),
        authorId: 1,
        createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    articles.push(article);
}
export default articles;
export {comments, admin};
// const repository = getRepository(ArticleRepository);

// repository.save(articles)
//     .then(() => console.log('data saved'))
//     .catch((e) => console.log(e));
