import { Report } from '../entities/report.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  assigneeId: number;

  @IsString()
  firstName: string;

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
