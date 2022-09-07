import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
import { Task } from '../../tasks/schema/task.entity';
@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Task, task => task.id, {
    cascade: true
  })
  task: Task[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   updated_at: Date;
}