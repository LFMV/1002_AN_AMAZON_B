import { Module,  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
// import { envs } from 'src/config/envs';

/**
 *  Command for de creating the database =
 *  docker run --name amazon_db -e POSTGRES_DB=db -e POSTGRES_PASSWORD=luis123 -e POSTGRES_USER=luis -p 5432:5432 -d postgres
 *
 *  add configuring variables envelopment = yarn add @nestjs/config
 */

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       url: envs.db.url,
//       ssl: true,
//       entities: [path.join(__dirname, '../entities/*.{ts,js}')],
//       synchronize: true,
//       logging: true,
//     }),
//   ],
// })

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, '../entities/*.{ts,js}')],
      synchronize: true,
      logging: true,
    }),
  ],
})

export class DatabaseModule {}


