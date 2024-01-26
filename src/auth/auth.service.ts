import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async registerOrLogin(userData: any): Promise<any> {
    const { email } = userData;
    let user;
    user = await this.userService.getUserByEmail(email);
    // ตรวจสอบว่าผู้ใช้มีบัญชีในระบบหรือไม่
    if (!user) {
      user = await this.userService.createUser(userData);
    }
    const accessToken = await this.generateAccessToken(user.id, email);
    await this.userService.updateAccessToken(user.id, accessToken);
    const { ...result } = user;
    return {
      data: result,
      accessToken: accessToken,
    };
  }
  async generateAccessToken(userId: string, email: string): Promise<string> {
    return this.jwtService.sign({ sub: userId, email: email });
  }
}
