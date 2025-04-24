import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponseDTO } from 'src/models/responseDTO/api.response.dto';
import { PromptFindAllService } from './prompt.findall.service';
import { PromptModel } from 'src/models/prompt.model';
import { PromptSaveService } from './prompt.save.service';

@Injectable()
export class GeminiService {

    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel

    constructor(private configService: ConfigService, private promptSaveService: PromptSaveService, private promptFindAllService: PromptFindAllService) {
        const apiKey = this.configService.get('GEMINI_API_KEY');

        if (!apiKey) {
            throw new InternalServerErrorException('GEMINI_API_KEY is not defined.');
        }

        this.genAI = new GoogleGenerativeAI(apiKey);

        const geminiModel = this.configService.get('GEMINI_API_MODEL');

        if (!geminiModel) {
            throw new InternalServerErrorException('GEMINI_API_MODEL is not defined.');
        }

        this.model = this.genAI.getGenerativeModel({ model: geminiModel });
    }

    async generateText(userPrompt: string) {
        let prompt =
            `Você é um chatbot dedicado a fornecer informações sobre o time FURIA de CS:GO. Seu único foco deve ser o time de CS:GO FURIA e tudo relacionado a ele. 

            Você deve responder somente a perguntas ou solicitações que envolvam:
            - Informações sobre o time FURIA: Como histórico, conquistas, performance, jogadores e estrutura da equipe de CS:GO.
            - Jogadores do time FURIA: Dados sobre os membros atuais, suas estatísticas, desempenho nas últimas partidas, e informações sobre transferências ou atualizações.
            - Partidas e torneios: Resultados de jogos passados, próximos jogos, detalhes sobre competições e eventos em que a FURIA está participando.
            - Notícias e atualizações do time: Informações novas relacionadas ao time, como anúncios ou mudanças no elenco, patrocínios, etc.

            Evite fornecer qualquer tipo de informação fora desse escopo, como assuntos não relacionados ao CS:GO, outros times ou esportes, notícias não vinculadas ao time FURIA ou qualquer conversa geral. Mantenha o foco no universo do CS:GO e FURIA.
            Caso o usuário peça algo fora desse escopo, forneça uma resposta educada informando que você só pode fornecer informações relacionadas ao time FURIA de CS:GO.

            Histórico de conversa com usuário: `;

        const promptHistory = await this.promptFindAllService.findAll();
        
        console.log(promptHistory)

        promptHistory.forEach((p) => {
            prompt += p + `\n`;
        });

        prompt += `Texto atula do usuário: ` + userPrompt;

        const response = (await this.model.generateContent(prompt)).response.text();

        const textToSave = `Texto do usuário: ` + userPrompt + `
        Resposta:` + response;
        await this.promptSaveService.save(textToSave);

        return new ApiResponseDTO(response);
    }
}
