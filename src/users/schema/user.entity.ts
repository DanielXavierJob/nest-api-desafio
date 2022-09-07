import { Task } from '../../tasks/schema/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,OneToMany } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column({select: false})
  senha: string;

  @Column()
  senha_reset: string;

  @Column()
  acesso: number;
  @OneToMany(() => Task, task => task.id, {
    cascade: true
  })
  task: Task[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   updated_at: Date;
}