import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Client {
  @PrimaryGeneratedColumn()
  clientId: number;

  @Column()
  name: string;

  @Column()
  companyId: string;

  @Column()
  description: string;

  @Column()
  stage: string;

  @Column()
  meta: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  website: string;
}
export { Client };
export default Client;
