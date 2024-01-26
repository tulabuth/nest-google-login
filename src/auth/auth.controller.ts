import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { OAuth2Client } from 'google-auth-library';
import { UserService } from 'src/user/user.service';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_SECRET,
   );

@ApiTags("AUTH")
@Controller()
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ){}

  @Post('/login')
  async login(@Body("token") token):Promise<any> {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "491905431927-t3kntirc0sgoc51dlcdo1mlsnpe99q3m.apps.googleusercontent.com",
      });
      const user = ticket.getPayload();
      const body ={
        email: user.email,
        name:user.name,
        picture: user.picture,
        firstname: user.given_name,
        lastname: user.family_name,
      }
    const response = await this.authService.registerOrLogin(body);
    console.log(response);
     return response;
  }
}
