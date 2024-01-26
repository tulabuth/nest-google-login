import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.decorator';
import { UserDto } from './dto/user.dto';

@ApiTags('USER')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @Get('profile')
  profile(@User() user: UserDto) {
    return this.userService.profile(user);
  }
}
