import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthService } from './shared/auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { jwtConstants } from './shared/constants';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s'},
        }),
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy],
})
export class AuthModule { }
