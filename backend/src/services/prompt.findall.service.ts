import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PromptModel } from "src/models/prompt.model";
import { Repository } from "typeorm";

@Injectable()
export class PromptFindAllService {

    constructor(@InjectRepository(PromptModel) private repository: Repository<PromptModel>) { }

    public async findAll(): Promise<PromptModel[]> { 
        return await this.repository.find()
    }
}