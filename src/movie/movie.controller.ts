import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Post('create')
  create(@Body() movie: MovieDto) {
    return this.movieService.create(movie);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.movieService.findById(id);
  // }
  //
  // @Put('update/:id')
  // update(@Body() movie: MovieDto, @Param('id') id: string) {
  //   return this.movieService.update(id, movie);
  // }
  //
  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.movieService.delete(id);
  // }
}
