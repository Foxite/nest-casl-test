import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assigneeId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
