import { Controller, Get } from "@nestjs/common";
import { PromptModel } from "src/models/prompt.model";
import { PromptFindAllService } from "src/services/prompt.findall.service";

@Controller('findall')
export class PromptFindAllController {

    constructor(private readonly service: PromptFindAllService) { }

    @Get()
    public async findAll(): Promise<PromptModel[]> {
        return await this.service.findAll()
    }
}