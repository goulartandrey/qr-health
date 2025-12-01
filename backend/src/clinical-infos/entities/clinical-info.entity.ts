import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clinical_infos')
export class ClinicalInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bloodType: string;

  @Column()
  gender: string;

  @Column({ type: 'simple-json', nullable: true })
  allergies: string[];

  @Column({ type: 'simple-json', nullable: true })
  surgeries: string[];

  @Column({ type: 'simple-json', nullable: true })
  medicines: string[];

  @Column({ type: 'simple-json', nullable: true })
  chronicDiseases: string[];

  @Column()
  emergencyContact: string;

  @OneToOne(() => User, (user) => user.clinicalInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({})
  createdAt?: Date;

  @UpdateDateColumn({})
  updatedAt?: Date;
}
