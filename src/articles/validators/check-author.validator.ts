import {ValidationArguments, ValidatorConstraint} from 'class-validator';
import {app} from '../../main';
import {AuthService} from '../../auth/auth.service';

@ValidatorConstraint({name: 'customText', async: false})
export class CheckAuthorValidator {
    private readonly authService: AuthService;

    constructor() {
        this.authService = app.get(AuthService);
    }

    async validate(authorId: number, validationArguments: ValidationArguments) {
        const article = await this.authService.usersService.userRepository.findOne({id: authorId});
        return Boolean(article);
    }

    defaultMessage(args: ValidationArguments) {
        return 'User not found';
    }
}
