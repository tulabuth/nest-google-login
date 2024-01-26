import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GoogleLoginDto{
    @ApiProperty({
        type: String,
        default:''
    })
    @IsNotEmpty()
    @IsString()
    token: string;
}