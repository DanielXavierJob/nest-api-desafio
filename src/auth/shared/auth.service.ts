import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../users/shared/user.service';
import * as nodemailer from 'nodemailer';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(userEmail: string, userPassword: string) {
    try {
      const user = await this.usersService.getByEmail(userEmail);
      if (user) {
        const isMatch = await bcrypt.compare(userPassword, user.senha);
        if (isMatch) {
          const { id, nome, email, acesso } = user;
          return { id, nome, email, acesso };
        }
      }

      return null;
    } catch (error) {
      throw error;
    }

  }

  async forgetPassword(data: any){
    const user = await this.usersService.getByToken(data.code);
    if(user){
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(data.password, salt);
      user.senha = password;
      user.senha_reset = null;
      const result = await this.usersService.update(user.id, user);
      return {statusCode: 200, message: "Password of user updated"};
    }
    return {statusCode: 404, message: "Page not found"};

  }
  async forgetCode(data: any){
    const user = await this.usersService.getByToken(data.code);
    if(user){
      return {statusCode: 200, sended: true};
    }
    return {statusCode: 404, sended: false};

  }
  async forget(data: any) {
    const user = await this.usersService.getByEmail(data.email);
    if (user) {
      const rand = Math.floor(Math.random() * 90000) + 10000;
      user.senha_reset = rand.toString();
      try {
        const result = await this.usersService.update(user.id, user);
        const transporter = nodemailer.createTransport({
          port: 587,
          host: "smtp.gmail.com",
          auth: {
            user: 'noreplydesafio@gmail.com',
            pass: 'zdqucuksinobmjau',
          },
          secure: false,
        });
        const mailData = {
          from: 'noreplydesafio@gmail.com',
          to: data.email,
          subject: `Olá! Nós recebemos sua solicitação`,
          text: `Aqui está seu código: ${rand.toString()}`,
          html: `<div>Aqui está seu código: ${rand.toString()}</div>`
        }
        transporter.sendMail(mailData, function (err, info) {
          if (err)
            console.log(err)
        })
        return result;

      } catch (error) {
         throw error;
      }

    }
    return false;
  }
  async login(user: any) {
    try {
      const payload = { id: user.id, nome: user.nome, email: user.email, acesso: user.acesso };
      return {
        access_token: this.jwtService.sign(payload),
        user: payload
      }
    } catch (error) {
      throw error;
    }
  }
}
