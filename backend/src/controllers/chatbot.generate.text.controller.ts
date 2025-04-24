import { Body, Controller, Post } from "@nestjs/common";
import { UserPromptRequestDTO } from "src/models/requestDTO/user.prompt.dto";
import { GeminiService } from "src/services/gemini.service";

@Controller('chatbot-furia')
export class ChatBotGenerateTextController {

    constructor(private readonly service: GeminiService) { }

    @Post()
    public async generateText(@Body() userRequest: UserPromptRequestDTO): Promise<any> {
        try {
            return this.service.generateText(userRequest.prompt)
        } catch (error) {
            throw error
        }
    }
}