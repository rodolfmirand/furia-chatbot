import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sql',
      synchronize: true,
      entities: ['dist/**/*.model.js'],
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
