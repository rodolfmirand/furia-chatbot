import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromptModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userPrompt: string;

    @Column()
    apiResponse: string;

    constructor(userPrompt: string, apiResponse: string){
        this.userPrompt = userPrompt;
        this.apiResponse = apiResponse;
    }
}