import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieResponseDto {
  @ApiProperty({
    title: 'Movie ID',
    description: 'Unique identifier for the movie',
    example: '12345',
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    title: 'Movie Title',
    description: 'The title of the movie',
    example: 'Inception',
    type: String,
    required: true,
  })
  title: string;

  @ApiProperty({
    title: 'Release Year',
    description: 'Year of release',
    example: '2019',
    type: Number,
    required: true,
  })
  releaseYear: number;

  @ApiPropertyOptional({
    title: 'Poster URL',
    description: 'URL of the movie poster',
    example: 'https://example.com/poster.jpg',
    type: String,
    required: false,
  })
  poster?: string;
  @ApiPropertyOptional({
    title: 'Actors ids',
    description: 'List of actor IDs associated with the movie',
    example: ['123', '123124214'],
    type: [String],
    required: false,
  })
  actorIds?: string[];
}
