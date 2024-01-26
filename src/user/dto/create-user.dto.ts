import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty({
    type: String,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
