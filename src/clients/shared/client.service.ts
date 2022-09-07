import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from '../schema/client.entity';
@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Clients)
    private clientsRepository: Repository<Clients>,
  ) { }

  getAll(): Promise<Clients[]> {
    return this.clientsRepository.find({
      order: {
        id: "DESC"
      }
    });
  }

  getById(id: number): Promise<Clients> {
    return this.clientsRepository.findOne({
      where: {
        id: id
      }
    });
  }

 
  create(Clients: Clients): Promise<Clients> {
    return this.clientsRepository.save(Clients);
  }

 async update(id: number, data: any){
    const Clients =  await this.clientsRepository.findOneBy({ id });
    if(Clients){
      Clients.nome = data.nome;
    }
    await this.clientsRepository.update(Clients.id, Clients);
    return {
      success: true,
      message: 'Successfully updated Clients',
    };
  }

  async delete(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
