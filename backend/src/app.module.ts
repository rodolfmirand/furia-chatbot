import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBotGenerateTextController } from './controllers/chatbot.generate.text.controller';
import { GeminiService } from './services/gemini.service';
import { PromptFindAllService } from './services/prompt.findall.service';
import { PromptSaveService } from './services/prompt.save.service';
import { PromptModel } from './models/prompt.model';
import { PromptFindAllController } from './controllers/prompt.findall.controller';

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
    }),
    TypeOrmModule.forFeature([PromptModel])
  ],
  controllers: [ChatBotGenerateTextController, PromptFindAllController],
  providers: [GeminiService, PromptFindAllService, PromptSaveService],
  exports: [PromptFindAllService, PromptSaveService]
})
export class AppModule {}
