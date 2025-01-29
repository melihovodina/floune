import { ApiProperty } from "@nestjs/swagger";
import { Prisma, Role } from "@prisma/client";
import { IsEmail, IsString, IsStrongPassword, IsOptional, IsUrl, IsIn, Length } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
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
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
  }, {
    message: 'password is too weak. It should include at least 8 characters, 1 uppercase letter and 1 number',
  })
  password: string;

  @ApiProperty({example: 'admin', description: 'user role', required: false})
  @IsOptional()
  @IsIn([Role.user, Role.admin], { message: 'role must be either "user" or "admin"'})
  role?: Role;
}