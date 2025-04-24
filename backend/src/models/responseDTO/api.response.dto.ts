import { IsString } from "class-validator";

export class ApiResponseDTO {
    @IsString()
    response: string
}