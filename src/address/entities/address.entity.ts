import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CityEntity } from '../../city/entities/city.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @Column({ name: 'street', nullable: false })
  street: string;

  @Column({ name: 'number', nullable: false })
  number: string;

  @Column({ name: 'complement', nullable: true })
  complement?: string;

  @Column({ name: 'cep', nullable: false })
  cep: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CityEntity, (city) => city.id)
  @JoinColumn({ name: 'city_id' })
  city: CityEntity;
}