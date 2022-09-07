import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { User } from './schema/user.entity';
import { UserService } from './shared/user.service';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService
  ) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() response) {
    const users = await this.userService.getAll();
    return response.status(HttpStatus.OK).json({
      users
    })
  }
  @UseGuards(JwtAuthGuard)
  @Get('/colaboradores')
  async getAllColaboradores(@Res() response) {
    const colaboradores = await this.userService.getAllColaboradores();
    return response.status(HttpStatus.OK).json({
      colaboradores
    })
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getById(@Res() response, @Param('id') id: number) {
    const user = await this.userService.getById(id);
    return response.status(HttpStatus.OK).json({
      user
    })
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Res() response, @Body() user: User) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.senha, salt);
    user.senha = password;
    const newUser = await this.userService.create(user);
    return response.status(HttpStatus.CREATED).json({
      newUser
    })
  }
 
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Res() response, @Param('id') id: number, @Body() user: User) {
    const updateUser = await this.userService.update(id, user);
    return response.status(HttpStatus.OK).json(updateUser)
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.userService.delete(id);
  }
}
