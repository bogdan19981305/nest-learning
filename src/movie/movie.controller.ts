import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
    status: 200,
    description: 'You got movie list',
  })
  findAll() {
    return [
      {
        id: 1,
        title: 'Man-x',
      },
      {
        id: 2,
        title: 'Matrix',
      },
    ];
  }
}
