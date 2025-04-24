import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromptModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

    constructor(prompt: string){
        this.text = prompt
    }
}