import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../schema/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  getAll(): Promise<User[]> {
    return this.userRepository.find({
      order:{
        id: "DESC"
      }
    });
  }

  async getById(id: number): Promise<User> {
    let users = await this.userRepository.createQueryBuilder('user')
    .select("user.email")
    .addSelect("user.id")
    .addSelect("user.nome")
    .addSelect("user.acesso")
    .where({ id: id })
    .getOne();
    return users;
  }
  async getByEmail(email: string): Promise<User> {
    let users = await this.userRepository.createQueryBuilder('user')
      .select("user.email")
      .addSelect("user.id")
      .addSelect("user.nome")
      .addSelect("user.acesso")
      .addSelect("user.senha")
      .where({ email: email })
      .getOne();
    return users;
  }

  async getByToken(code: string): Promise<User> {
    let users = await this.userRepository.createQueryBuilder('user')
    .select("user.email")
    .addSelect("user.id")
    .addSelect("user.nome")
    .addSelect("user.acesso")
    .addSelect("user.senha")
    .where({ senha_reset: code })
    .getOne();
    return users;
  }

  getAllColaboradores(): Promise<User[]> {
    let users = this.userRepository.find({
      order:{
        id: "DESC"
      },
      where:{
        acesso: 1 
      }
    });
    return users;
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }


  async update(id: number, data: any) {
    // const User = await this.userRepository.findOneBy({ id });
    // if (User) {
    //   User.nome = data.nome,
    //   User.senha = data.senha;
    // }
    try {
      await this.userRepository.update(id, data);
      return {
        success: true,
        message: 'Successfully updated user',
      };
    } catch (error) {
      throw error;
    }

  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
