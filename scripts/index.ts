import articles, {admin, comments} from './fakeData';
import {createConnection, getRepository} from 'typeorm';
import {ArticleEntity} from '../src/articles/entities/article.entity';
import {CommentEntity} from '../src/articles/entities/comment.entity';
import {UserEntity} from '../src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import has = Reflect.has;

(async () => {
    try {
        const connection = await createConnection(
            {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                entities: [ArticleEntity, CommentEntity, UserEntity],
                username: 'root',
                password: 'sancho1995',
                database: 'articles',
            },
        );
        admin.password = await bcrypt.hash(admin.password, 10);
        const queryRunner = connection.createQueryRunner();
        console.log('connection to database open');
        const articleRepository = getRepository(ArticleEntity);
        const commentRepository = getRepository(CommentEntity);
        const userRepository = getRepository(UserEntity);
        await queryRunner.startTransaction();
        try {
            await userRepository.save(admin);
            await articleRepository.save(articles);
            await commentRepository.save(comments);
        } catch (e) {
            await queryRunner.rollbackTransaction();
            console.log(`Error. ${e.message}`);
        } finally {
            await queryRunner.release();
        }

        await connection.close();
        console.log('connection to database close');
    } catch (e) {
        console.log(`Error. ${e.message}`);
    }

})();
