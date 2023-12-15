/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  password: string;


}