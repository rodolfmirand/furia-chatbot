import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PromptModel } from "src/models/prompt.model";
import { Repository } from "typeorm";

Injectable()
export class PromptSaveService {

    constructor(@InjectRepository(PromptModel) private repository: Repository<PromptModel>) { }

    public async save(userPrompt: string, apiResponse: string): Promise<any> {
        const promptToSave = new PromptModel(userPrompt, apiResponse)
        return await this.repository.save(promptToSave)
    }
}