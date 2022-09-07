import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { Task } from './schema/task.entity';
import { TaskService } from './shared/task.service';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TaskService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req, @Res() response) {
    const user = req.user;
    const tasks = await this.taskService.getAll(user.id);
    return response.status(HttpStatus.OK).json({
      tasks
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/chart')
  async getChart(@Request() req, @Res() response) {
    const tasks = await this.taskService.getChart();
    return response.status(HttpStatus.OK).json({
      tasks
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllTasks(@Res() response) {
    const tasks = await this.taskService.getAllTasks(false);
    return response.status(HttpStatus.OK).json({
      tasks
    })
  }
  @UseGuards(JwtAuthGuard)
  @Get('/all/completed')
  async getAllTasksCompleted(@Res() response) {
    const tasks = await this.taskService.getAllTasks(true);
    return response.status(HttpStatus.OK).json({
      tasks
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Request() req, @Res() response, @Param('id') id: number) {
    const tasks = await this.taskService.getById(id);
    return response.status(HttpStatus.OK).json({
      tasks
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Res() response, @Body() task: Task) {
    const newTask = await this.taskService.create(task);
    return response.status(HttpStatus.CREATED).json({
      newTask
    })
  }

  @Post('/finalize')
  async finalizeTask(@Res() response, @Body() task: Task) {
    const tasks = await this.taskService.update(task.id, task);
    return response.status(HttpStatus.OK).json({
      tasks
    })
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Request() req, @Res() response, @Param('id') id: number, @Body() task: Task) {
    const updateTask = await this.taskService.update(id, task);
    return response.status(HttpStatus.OK).json(updateTask)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number) {
    this.taskService.delete(id);
  }
}
