import { Report } from '../entities/report.entity';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @Expose()
  @IsNumber()
  assigneeId: number;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  toEntity(): Report {
    const ret = new Report();
    ret.assigneeId = this.assigneeId;
    ret.firstName = this.firstName;
    ret.lastName = this.lastName;
    return ret;
  }
}
