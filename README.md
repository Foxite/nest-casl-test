Here we have a very basic nestjs app with a single entity, Report, that it protects using casl.

It uses a mysql database:
`docker run -d -e MYSQL_RANDOM_ROOT_PASSWORD=y -e MYSQL_USER=user -e MYSQL_PASSWORD=pass -e MYSQL_DATABASE=test -p 3306:3306 mysql`

- `src/auth/auth.guard.ts`: this guard adds the "current user" to the request context object, so it can be used in controllers. In reality, the user object is hardcoded.
- `src/casl/casl-ability.factory.ts`: this class defines the rights for a given user.
- `src/reports/reports.service.ts`: uses typeorm to store Report entities. not interesting.
- `src/reports/reports.controller.ts`: this controller uses ReportsService and calls CaslAbilityFactory with the user provided by AuthGuard, to determine if the user is allowed to do something.
