import { IsEmail, IsString, Length } from "class-validator";

export class SignInDto {
  @IsString({message: 'username should be a string'})
  @Length(3, 24, {message: "username should be above 3 and 24 chars"})
  username: string;

  @IsString({message: 'password should be a string'})
  @Length(8, 36, {message: "password should be above 8 and 36 chars"})
  password: string;
}