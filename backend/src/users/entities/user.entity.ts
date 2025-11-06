import { Exclude } from 'class-transformer';
import { ClinicalBadge } from 'src/clinical-badges/entities/clinical-badge.entity';
import { ClinicalInfo } from 'src/clinical-infos/entities/clinical-info.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 55 })
  firstName: string;

  @Column({ type: 'varchar', length: 55 })
  lastName: string;

  @Column({ type: 'varchar', length: 55, unique: true })
  username: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @CreateDateColumn({})
  createdAt?: Date;

  @UpdateDateColumn({})
  updatedAt?: Date;

  @OneToOne(() => ClinicalInfo, (info) => info.user)
  clinicalInfo: ClinicalInfo;

  @OneToOne(() => ClinicalBadge, (badge) => badge.user)
  clinicalBadge: ClinicalBadge;
}
