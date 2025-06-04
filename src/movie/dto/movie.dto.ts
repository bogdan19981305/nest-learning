import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1988)
  @Max(new Date().getFullYear())
  releaseYear: number;
}
