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

  update(entity: Report, dto: UpdateReportDto): Promise<Report> {
    dto.apply(entity);
    return this.repository.save(entity);
  }
}
