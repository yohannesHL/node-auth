import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    readonly userName: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly password?: string;
    readonly email?: string;
}