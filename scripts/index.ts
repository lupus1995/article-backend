import articles, {comments} from './fakeDataForArticle';
import {createConnection, getRepository} from 'typeorm';
import {Article} from '../src/articles/entities/article.entity';
import {Comments} from '../src/articles/entities/comment.entity';

(async () => {
    try {
        const connection = await createConnection(
            {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                entities: [Article, Comments],
                username: 'root',
                password: 'sancho1995',
                database: 'articles',
            },
        );
        console.log('connection to database open');
        const articleRepository = getRepository(Article);
        const commentRepository = getRepository(Comments);
        await articleRepository.save(articles);
        // await commentRepository.save(comments);
        await connection.close();
        console.log('connection to database close');
    } catch (e) {
        console.log(`Error. ${e.message}`);
    }

})();
