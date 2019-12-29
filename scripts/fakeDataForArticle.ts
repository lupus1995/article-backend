import {Article} from '../src/articles/entities/articles.entity';
import * as faker from 'faker';
import {ArticleRepository} from './repositories/article.repository';
import {getRepository} from 'typeorm';

const articles: Article[] = [];

for (let i: number = 0; i < 100; i++) {
    const article: Article = {
        id: i,
        title: faker.name.title(),
        article: faker.lorem.text(4),
        description: faker.lorem.text(4),
        authorId: 1,
        // createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        // updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    };
    articles.push(article);
}
export default articles;
// const repository = getRepository(ArticleRepository);

// repository.save(articles)
//     .then(() => console.log('data saved'))
//     .catch((e) => console.log(e));
