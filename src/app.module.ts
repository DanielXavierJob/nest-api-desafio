import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/schema/task.entity';
import { User } from './users/schema/user.entity';
import { Clients } from './clients/schema/client.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.0.16',
      port: 3306,
      username: 'root',
      password: 'desafio',
      database: 'desafio', 
      entities: [Task, User, Clients],
      synchronize: true,
    }),
    AuthModule,
    ClientsModule,
    UsersModule,
    TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
