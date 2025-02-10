import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, IsOptional, IsUrl, IsIn, Length } from "class-validator";

export class SignUpDto {
  @ApiProperty({example: 'the_best_user_ever', description: 'username'})
  @IsString({message: 'username should be a string'})
  @Length(3, 24, {message: "username should be above 3 and 24 chars"})
  username: string;

  @ApiProperty({example: 'email@gmail.com', description: 'user email'})
  @IsString({message: 'email should be a string'})
  @IsEmail({}, {message: "email should be valid"})
  email: string;

  @ApiProperty({example: 'strongPassword123', description: 'user password'})
  @IsString({message: 'password should be a string'})
  @Length(8, 36, {message: "password should be above 8 and 36 chars"})
  password: string;
}