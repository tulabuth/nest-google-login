import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 40 })
  name: string;

  @Column('varchar', { name: 'firstname', length: 40 })
  firstname: string;

  @Column('varchar', { name: 'lastname', length: 40 })
  lastname: string;

  @Column('varchar', { name: 'email', length: 40 })
  email: string;

  @Column('varchar', { name: 'picture', length: 200 })
  picture: string;

  @Column('text', { name: 'accessToken', nullable: true })
  accessToken: string | null;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}