import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1988)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];

  @IsString()
  imageUrl: string;
}
