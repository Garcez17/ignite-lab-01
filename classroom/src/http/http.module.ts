import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'path';

import { DatabaseModule } from '../database/database.module';

import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { EnrollmentsService } from '../services/enrollments.service';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { CoursesService } from '../services/courses.service';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { StudentsService } from '../services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    StudentsResolver,
    EnrollmentsResolver,
    CoursesResolver,
    StudentsService,
    EnrollmentsService,
    CoursesService,
  ],
})
export class HttpModule {}
