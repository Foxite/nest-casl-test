import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Req, UseGuards, NotFoundException, ForbiddenException
} from "@nestjs/common";
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { CaslAbilityFactory } from "../casl/casl-ability.factory";
import { AuthGuard } from "../auth/auth.guard";
import { Action } from "../casl/action";
import { Report } from "./entities/report.entity";

@Controller('reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(
    private readonly service: ReportsService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto, @Req() req) {
    const abilities = this.caslAbilityFactory.createForUser(req.user);
    if (!abilities.can(Action.Create, Report)) {
      throw new ForbiddenException();
    }

    return this.service.create(createReportDto);
  }

  @Get()
  findAll() {
    // Note: doesn't respect Read permissions.
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req) {
    const entity = await this.service.findOne(+id);
    if (!entity) {
      throw new NotFoundException();
    }

    const abilities = this.caslAbilityFactory.createForUser(req.user);
    if (!abilities.can(Action.Read, entity)) {
      throw new ForbiddenException();
    }

    return entity;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateReportDto: UpdateReportDto, @Req() req) {
    const entity = await this.service.findOne(+id);
    if (!entity) {
      throw new NotFoundException();
    }

    const abilities = this.caslAbilityFactory.createForUser(req.user);
    if (!abilities.can(Action.Update, entity)) {
      throw new ForbiddenException();
    }

    return this.service.update(entity, updateReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    const entity = await this.findOne(id, req);

    const abilities = this.caslAbilityFactory.createForUser(req.user);
    if (!abilities.can(Action.Delete, entity)) {
      throw new ForbiddenException();
    }

    return this.service.remove(+id);
  }

  @Post(':id/finalize')
  finalize(@Param('id') id: number, @Req() req) {
    return this.update(+id, new UpdateReportDto({ finalized: true }), req);
  }
}
