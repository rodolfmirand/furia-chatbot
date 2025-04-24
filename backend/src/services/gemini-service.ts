import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {

    private genAI: GoogleGenerativeAI;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get('GEMINI_API_KEY')

        if (!apiKey) {
            throw new InternalServerErrorException('GEMINI_API_KEY is not defined.');
        }

        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateText(userPrompt: string) {
        
    }
}
