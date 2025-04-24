import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database.sql',
      synchronize: true,
      entities: ['dist/**/*.model.js'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
