import { ClinicalInfo } from 'src/clinical-infos/entities/clinical-info.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clinical_badges')
export class ClinicalBadge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  publicPassword: string;

  @OneToOne(() => User, (user) => user.clinicalBadge, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => ClinicalInfo, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clinical_info_id' })
  clinicalInfo: ClinicalInfo;
}
