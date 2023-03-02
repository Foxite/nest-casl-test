import { Report } from '../entities/report.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
  constructor(partial?: Partial<UpdateReportDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }

  @IsNumber()
  @IsOptional()
  assigneeId?: number;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  finalized?: boolean;

  apply(entity: Report) {
    let key: string;
    for (key in this) {
      if (this[key] === undefined) {
        continue;
      }

      console.log(key);
      entity[key] = this[key];
    }
  }
}
