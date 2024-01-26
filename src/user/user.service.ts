import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ){}

    

    async createUser(dto: any){
      return await this.userRepository.save(dto);
    }

    async updateAccessToken(userId: string,accessToken: string){
        return await this.userRepository.update(userId, {accessToken});
    }

    async getUserByEmail(email:string){
        return await this.userRepository.findOne({where: {email}})
    }

    async getUserById(id:number):Promise<Users>{
        return await this.userRepository.findOne({where: {id}})
    }

    async profile(userAuth: UserDto) {
        const {id} = userAuth
        return await this.userRepository.find({where:{id}})
    }

}
