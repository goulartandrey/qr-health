import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClinicalInfoDto } from './dto/create-clinical-info.dto';
import { UpdateClinicalInfoDto } from './dto/update-clinical-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalInfo } from './entities/clinical-info.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ClinicalInfoService {
  constructor(
    @InjectRepository(ClinicalInfo)
    private readonly clinicalInfoRepository: Repository<ClinicalInfo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createClinicalInfoDto: CreateClinicalInfoDto) {
    const { userId, ...data } = createClinicalInfoDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const clinicalInfo = this.clinicalInfoRepository.create({
      ...data,
      allergies: data.allergies ?? [],
      surgeries: data.surgeries ?? [],
      medicines: data.medicines ?? [],
      chronicDiseases: data.chronicDiseases ?? [],
      user,
    });

    return this.clinicalInfoRepository.save(clinicalInfo);
  }

  async findAll() {
    return await this.clinicalInfoRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const clinicalInfo = await this.clinicalInfoRepository.findOne({
      where: { id },
    });
    if (!clinicalInfo) {
      throw new NotFoundException('Clinical Info not found');
    }

    return clinicalInfo;
  }

  async findOneByUserId(userId: number) {
    const userClinicalInfo = await this.clinicalInfoRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!userClinicalInfo) {
      throw new NotFoundException('Clinical Info not found for this user');
    }

    return userClinicalInfo;
  }

  async update(id: number, payload: UpdateClinicalInfoDto) {
    const clinicalInfo = await this.clinicalInfoRepository.preload({
      id,
      ...payload,
    });

    if (!clinicalInfo) {
      throw new NotFoundException('Clinical Info not found');
    }

    return this.clinicalInfoRepository.save(clinicalInfo);
  }

  async remove(id: number) {
    const clinicalInfo = await this.clinicalInfoRepository.findOneBy({ id });
    if (!clinicalInfo) {
      throw new NotFoundException('Clinical Info not found');
    }

    return this.clinicalInfoRepository.remove(clinicalInfo);
  }
}
