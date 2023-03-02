import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
//import { User } from '../database/entities/user.entity';
//import { UserRole } from '../database/entities/enums';
import { Action } from './action';
import { Injectable } from '@nestjs/common';
import { Report } from '../reports/entities/report.entity';
import { User } from "../user";

type Subjects = InferSubjects<typeof Report> | 'all';

//export type AppAbility = Ability<[Action, Subjects]>;
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

    // The user can read any report.
    builder.can(Action.Read, Report, {});

    // The user can only manage a report they're assigned to, but...
    builder.can(Action.Manage, Report, { assigneeId: user.id });

    // Not if the report is finalized.
    builder.cannot(Action.Update, Report, { finalized: true });
    builder.cannot(Action.Delete, Report, { finalized: true });

    // However, an admin can still do anything no matter what!
    if (user.isAdmin) {
      builder.can(Action.Manage, 'all');
    }

    return builder.build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
