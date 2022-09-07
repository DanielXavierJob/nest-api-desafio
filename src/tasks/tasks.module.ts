import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './shared/task.service';
import { Task } from './schema/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ClientsModule } from '../clients/clients.module';
@Module({
  imports: [UsersModule, ClientsModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TasksModule {}
