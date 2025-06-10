import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieResponseDto } from './dto/movie.dto';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  @ApiOperation({
    summary: 'Get all movies',
    description: 'Get list of all movies as you can',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'You got movie list',
    type: [MovieResponseDto],
  })
  findAll() {
    return [];
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get movie by ID',
    description: 'You can get a movie by its ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'You got movie by ID',
    type: MovieResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'could not find movie by ID',
  })
  findById(@Param('id') id: string) {
    return {
      id: 5,
      title: 'Inception',
    };
  }

  @ApiOperation({
    summary: 'Create a new movie',
  })
  @Post('create')
  create(@Body() dto: CreateMovieDto) {
    return dto;
  }
}
