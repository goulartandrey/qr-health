import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicalBadgeDto } from './dto/create-clinical-badge.dto';
import { UpdateClinicalBadgeDto } from './dto/update-clinical-badge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalBadge } from './entities/clinical-badge.entity';
import { User } from 'src/users/entities/user.entity';
import { ClinicalInfo } from 'src/clinical-infos/entities/clinical-info.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClinicalBadgesService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ClinicalBadge)
    private readonly clinicalBadgeRepository: Repository<ClinicalBadge>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(User)
    private readonly clinicalInfoRepository: Repository<ClinicalInfo>,
  ) {}
  async create(payload: CreateClinicalBadgeDto) {
    const baseUrl = this.configService.get<string>('PUBLIC_URL');

    const { userId, clinicalInfoId, publicPassword } = payload;

    const fullUrl = `${baseUrl}/${publicPassword}`;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const clinicalInfo = await this.clinicalInfoRepository.findOne({
      where: { id: clinicalInfoId },
    });

    if (!clinicalInfo) {
      throw new Error('Clinical Info not found');
    }

    const clinicalBadge = this.clinicalBadgeRepository.create({
      user: user,
      clinicalInfo: clinicalInfo,
      publicPassword: fullUrl,
    });

    const newBadge = await this.clinicalBadgeRepository.save(clinicalBadge);

    return this.clinicalBadgeRepository.findOne({
      where: { id: newBadge.id },
      relations: ['user', 'clinicalInfo'],
    });
  }

  async findAll() {
    return await this.clinicalBadgeRepository.find({
      relations: ['user', 'clinicalInfo'],
    });
  }

  findOne(id: number) {
    return this.clinicalBadgeRepository.findOne({
      where: { id },
      relations: ['user', 'clinicalInfo'],
    });
  }

  async findOneByUserId(userId: number) {
    const userClinicalBadge = await this.clinicalBadgeRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'clinicalInfo'],
    });

    if (!userClinicalBadge) {
      throw new NotFoundException('Clinical Badge not found for this user');
    }

    return userClinicalBadge;
  }

  update(id: number, payload: UpdateClinicalBadgeDto) {
    return `This action updates a #${id} clinicalBadge`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalBadge`;
  }
}
