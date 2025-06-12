import { IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto {
  @IsString({ message: 'ID must be a string' })
  @IsNotEmpty({ message: 'ID cannot be empty' })
  name: string;

  @IsString({ message: 'Genre must be a string' })
  @IsNotEmpty({ message: 'Genre cannot be empty' })
  genre: string;
}
