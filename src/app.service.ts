import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import * as useragent from 'express-useragent';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';
@Injectable()
export class AppService {
  constructor(
    private readonly userService: UserService,
  ){}
  async googleLogin(token: string,request: any) {
    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "491905431927-t3kntirc0sgoc51dlcdo1mlsnpe99q3m.apps.googleusercontent.com",
    });
    const userData = ticket.getPayload();
    const getDevice = await this.getDeviceInfo(request);
    
    return {
      getDevice,
      userData
    };
  }
  

  async getDeviceInfo(request: any):Promise<any>{
    const userAgent = await this.getUserDevice(request);
    const data = await this.getRealIP();
    const location =await this.getClientLocation(data);
    return {
      city: location.city,
      countryCode: location.country,
      timezone: location.timezone,
      browser: userAgent.browser,
      os: userAgent.os,
      device: userAgent.platform,
    };
  }


  async getRealIP(): Promise<string> {
    const response = await axios.get(`https://api.ipify.org/?format=json`);
    return response.data;
  }

  getUserDevice(request: any): useragent.Agent {
    return useragent.parse(request.headers['user-agent']);
  }
  
  async getClientLocation(data: any): Promise<any> {
    const ipAdrees = data.ip;
    const response = await axios.get(`https://ipinfo.io/${ipAdrees}?token=8ae54b1cd0d0a8`);
    return response.data;
  }


}
