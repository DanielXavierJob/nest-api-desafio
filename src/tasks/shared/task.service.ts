import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from '../../clients/shared/client.service';
import { UserService } from '../../users/shared/user.service';
import { Repository } from 'typeorm';
import { Task } from '../schema/task.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private usersService: UserService,
    private clientService: ClientService
  ) { }
  getAll(id: number): Promise<Task[]> {
    return this.taskRepository.find({
      relations: ['client'],
      where: {
        colaboratorId: id,
        completed: false
      },
      order: {
        id: 'DESC'
      }
    });
  }

  getChart(){
    var date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    return this.taskRepository.query("SELECT COUNT(*) as total, DATE(created_at) as day FROM task WHERE DATE(created_at) >= ? GROUP BY DATE(created_at) ", [firstDayOfMonth])
  }
  getById(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id: id
      }
    });
  }

  getAllTasks(completed): Promise<Task[]>{
    return this.taskRepository.find({
      relations: ['client', 'user'],
      where:{
          completed: completed
      },
      order:{
        id: "DESC",
      }
    });
  }
  async create(task): Promise<Task> {
    const client = await this.clientService.getById(task.client);
    const users = await this.usersService.getById(task.colaborador);
    task.client = client;
    task.user = users;
    task.colaboratorId = users.id;
    return this.taskRepository.save(task); 

  }

  async update(id: number, data: any) {
    const Task = await this.taskRepository.findOneBy({ id });
    if (Task) {
        Task.solution = data.solution,
        Task.completed = data.completed;
    }
    await this.taskRepository.update(Task.id, Task);
    return {
      success: true,
      message: 'Successfully updated task',
    };
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
