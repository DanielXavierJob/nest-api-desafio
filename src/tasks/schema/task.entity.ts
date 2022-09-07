import { User } from '../../users/schema/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Clients } from '../../clients/schema/client.entity';
@Entity()
export class Task { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true})
  solution: string;

  @Column({ default: false })
  completed: boolean; 

  @Column()
  colaboratorId: number; 

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Clients, client => client.id)
  client: Clients;


  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   updated_at: Date;
}