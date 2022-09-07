import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res,UseGuards } from '@nestjs/common';
import { ClientService } from './shared/client.service';
import { Clients } from './schema/client.entity';
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard';
@Controller('clients')
export class ClientsController {
  constructor(
    private clientService: ClientService
  ){}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Res() response) {
    const clients = await this.clientService.getAll();
    return response.status(HttpStatus.OK).json({
      clients
    })
  }

 
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Res() response, @Param('id') id: number) {
    const clients = await this.clientService.getById(id);
    return response.status(HttpStatus.OK).json({
      clients
    })
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Res() response, @Body() client: Clients){
    const newClients = await this.clientService.create(client);
    return response.status(HttpStatus.CREATED).json({
      newClients
    })
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Res() response, @Param('id') id: number, @Body() client: Clients) {
    const updateClients = await this.clientService.update(id, client);
    return response.status(HttpStatus.OK).json(updateClients) 
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.clientService.delete(id);
  }

}
