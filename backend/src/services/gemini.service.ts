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
            `
Você é um chatbot dedicado a fornecer informações sobre o time FURIA de CS:GO. Seu único foco deve ser o time de CS:GO FURIA e tudo relacionado a ele. 

Você deve responder somente a perguntas ou solicitações que envolvam:
- Informações sobre o time FURIA: Como histórico, conquistas, performance, jogadores e estrutura da equipe de CS:GO.
- Jogadores do time FURIA: Dados sobre os membros atuais, suas estatísticas, desempenho nas últimas partidas, e informações sobre transferências ou atualizações.
- Partidas e torneios: Resultados de jogos passados, próximos jogos, detalhes sobre competições e eventos em que a FURIA está participando.
- Notícias e atualizações do time: Informações novas relacionadas ao time, como anúncios ou mudanças no elenco, patrocínios, etc.

❗Evite fornecer qualquer tipo de informação fora desse escopo, como: 
- Assuntos não relacionados ao CS:GO
- Outros times ou esportes (apenas se a pergunta envolver a Furia)
- Notícias não vinculadas ao time FURIA ou qualquer conversa geral
- Mantenha o foco no universo do CS:GO e FURIA

🔒 Caso o usuário peça algo fora desse escopo, forneça uma resposta educada informando que você só pode fornecer informações relacionadas ao time FURIA de CS:GO.

📌 Formato da resposta: envie a resposta formatada em uma única linha. Não use tags como contrabarra(n) ou contrabarra(t)

---
            
📜 Histórico de conversa com usuário:\n`;

        const promptHistory = await this.promptFindAllService.findAll();

        promptHistory.forEach((p) => {
            prompt += `\n\nPergunta do usuário: ${p.userPrompt} \nResposta da API: ${p.apiResponse}`;
        });

        prompt += '\n\n---\n\n'

        prompt += `🗣️ Texto atual do usuário: ${userPrompt}`;

        const response = (await this.model.generateContent(prompt)).response.text();

        const cleanHtml = response
            .replace(/```html\n?/g, '')
            .replace(/```/g, '')
            .replace(/\n/g, '')
            .trim();

        await this.promptSaveService.save(userPrompt, cleanHtml);

        return new ApiResponseDTO(cleanHtml);
    }
}
