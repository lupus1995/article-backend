import * as faker from 'faker';
import {User, UserRole} from '../src/users/entities/user.entity';
import moment = require('moment');
import slugify from 'slugify';

const articles = [];
const comments = [];

const admin: User = {
    name: 'Alex',
    surname: 'Panfilov',
    role: UserRole.ADMIN,
    email: 'canya.panfilov.95@gmail.com',
    password: 'sancho1995',
    createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
};

for (let idArticle: number = 0; idArticle < 1000; idArticle++) {
    for (let idComment: number = 0; idComment < 10; idComment++) {
        const comment = {
            articleId: idArticle + 1,
            comment: faker.lorem.words(10),
            createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        };
        comments.push(comment);
    }

    const title = Math.random().toString(36).substring(2, 15);
    const article = {
        title,
        article: faker.lorem.words(10),
        description: faker.lorem.words(10),
        authorId: 1,
        slug: slugify(title),
        createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    articles.push(article);
}
export default articles;
export {comments, admin};
