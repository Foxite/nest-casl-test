import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
  ) {}

  findAll(): Promise<Report[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Report> {
    return this.repository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  create(dto: CreateReportDto): Promise<Report> {
    return this.repository.save(dto.toEntity());
  }

  async update(id: number, dto: UpdateReportDto): Promise<Report> {
    const entity = await this.findOne(id);
    dto.apply(entity);
    return await this.repository.save(entity);
  }
}
