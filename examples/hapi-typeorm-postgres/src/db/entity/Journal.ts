import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Journal {
  @PrimaryGeneratedColumn()
  journalId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  meta: string;
}
export { Journal };
export default Journal;
