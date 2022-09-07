import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schema/user.entity';
import { UserService } from './shared/user.service';
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule { }
