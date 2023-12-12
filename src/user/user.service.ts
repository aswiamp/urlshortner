/* eslint-disable prettier/prettier */
import {
  
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Model } from 'mongoose';
  import { User, UserDocument } from './schema/user.schema';
  import { InjectModel } from '@nestjs/mongoose';
  import { LoginDto, RegisterDto } from './dto';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import * as bcrypt from 'bcrypt';
 
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private jwt: JwtService,
      private config: ConfigService,
    ) {}
    async register(dto: RegisterDto) {
     
      //generate salt
      const salt = await bcrypt.genSalt();
      //generate hash password
      const hash = await bcrypt.hash(dto.password, salt);
      try {
        const user = new this.userModel({
          email: dto.email,
          name: dto.name,
          phoneNumber:dto.phoneNumber,
          password: hash,
        });
        await user.save();
        // const token = await this.signToken(user.id, user.email);
        return { name: user.name, email: user.email,  msg:"signup successful" };
      } catch (error) {
        if (error.code === 11000) {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  
    async login(dto: LoginDto) {
      // find the user by email
      const user = await this.userModel.findOne({ email: dto.email });
      if (!user) throw new ForbiddenException('Credentials incorrect');
      // compare password
      const pwMatches = await bcrypt.compare(dto.password, user.password);
      // if password incorrect throw exception
      if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
  
      const token = await this.signToken(user.id, user.email);
      return { name: user.name, token, msg: 'login successful' };
    }
  
    
  
    //create token
    async signToken(userId: number, email: string): Promise<string> {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');
  
      const access_token = await this.jwt.signAsync(payload, {
        expiresIn: '20d',
        secret: secret,
      });
      return access_token;
    }
  }