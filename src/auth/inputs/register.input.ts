import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Input type for user registration.',
})
export class RegisterInput {
  @Field(() => String)
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: 'Username must be a string.' })
  @MaxLength(20, { message: 'Username must be at most 20 characters long.' })
  name: string;

  @Field(() => String)
  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: 'Email must not be empty.' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  email: string;

  @Field(() => String)
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password must not be empty.' })
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  @MaxLength(50, { message: 'Password must be at most 50 characters long.' })
  password: string;
}
