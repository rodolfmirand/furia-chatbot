import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBotGenerateTextController } from './controllers/chatbot.generate.text.controller';
import { GeminiService } from './services/gemini.service';

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
  controllers: [ChatBotGenerateTextController],
  providers: [GeminiService],
})
export class AppModule {}
