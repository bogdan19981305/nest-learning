import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get('/all')
  findAll() {
    return this.artistService.findAllArtists();
  }

  @Get('/:id')
  getArtistById(@Param('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @Post('/create')
  createArtist(@Body() artistDto: ArtistDto) {
    return this.artistService.createArtist(artistDto);
  }
}
