import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
  host: config.getOrThrow('POSTGRES_HOST'),
  port: config.getOrThrow('POSTGRES_PORT'),
  username: config.getOrThrow('POSTGRES_USER'),
  database: config.getOrThrow('POSTGRES_DB'),
  password: config.getOrThrow('POSTGRES_PASSWORD'),
});
