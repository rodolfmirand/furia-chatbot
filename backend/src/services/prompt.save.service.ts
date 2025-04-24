import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PromptModel } from "src/models/prompt.model";
import { Repository } from "typeorm";

Injectable()
export class PromptSaveService {

    constructor(@InjectRepository(PromptModel) private repository: Repository<PromptModel>) { }

    public async save(prompt: string): Promise<any> {
        const promptToSave = new PromptModel(prompt)
        return await this.repository.save(promptToSave)
    }
}