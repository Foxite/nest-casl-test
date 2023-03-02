import { Report } from '../entities/report.entity';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReportDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  assigneeId?: number;

  @Expose()
  @IsString()
  @IsOptional()
  firstName?: string;

  @Expose()
  @IsString()
  @IsOptional()
  lastName?: string;

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
