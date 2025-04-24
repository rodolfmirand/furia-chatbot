import { IsString } from "class-validator";

export class UserPromptRequestDTO {

    @IsString()
    prompt: string;
}
