import { IsString } from "class-validator";

export class ApiResponseDTO {

    @IsString()
    response: string

    constructor(response: string) {
        this.response = response
    }
}