import { IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsStrongPassword()
  @MinLength(8)
  password: string;
}
