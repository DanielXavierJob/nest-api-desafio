import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientService } from './shared/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from './schema/client.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Clients])],
    controllers: [ClientsController],
    providers: [ClientService],
    exports: [ClientService]
})
export class ClientsModule { }
