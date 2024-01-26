import { Body, Controller, ExecutionContext, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import axios from 'axios';
import { RealIP } from 'RealIp';
import { GoogleLoginDto } from './user/dto/goole-login.dto';


@ApiTags('GOOGLE')
@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/device-client')
  async getDeviceInfo(@Req() request: Request):Promise<any> {
    return this.appService.getDeviceInfo(request);
    
  }
  
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Post('redirect')
  async googleAuthRedirect(@Body() body:GoogleLoginDto,@Req() request: Request) {
    console.log("check ..");
    const data =await this.appService.googleLogin(body.token,request)
    console.log(data);
    return data
  }



}
