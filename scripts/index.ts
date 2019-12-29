// import articles from './fakeDataForArticle';
// import {createConnection, getRepository} from 'typeorm';
// import {ArticleRepository} from './repositories/article.repository';
// import {Article} from '../src/articles/entities/articles.entity';
// import * as faker from "faker";
//
// (async () => {
//     try {
//         const connection = await createConnection({
//             type: 'mysql',
//             host: 'localhost',
//             port: 3306,
//             entities: [Article],
//             username: 'root',
//             password: 'sancho1995',
//             database: 'articles',
//         });
//
//         console.log('connect to database');
//         const articleRepository = getRepository(Article);
//         const article: Article = {
//             id: 1,
//             title: faker.name.title(),
//             article: faker.lorem.text(4),
//             description: faker.lorem.text(4),
//             authorId: 1,
//             // createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
//             // updatedAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
//         };
//         //
//         const result = await articleRepository.save(article);
//         //
//         console.log(result);
//     } catch (e) {
//         console.log(`Error. ${e.message}`);
//     }
//
// })();
