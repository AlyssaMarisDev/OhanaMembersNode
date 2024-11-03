import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './member/member.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'development',
      database: 'ohanamembers',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: ['./migrations/*.ts'],
      synchronize: false,
    }),
    MemberModule,
    HealthcheckModule,
  ],
})
export class AppModule {}
