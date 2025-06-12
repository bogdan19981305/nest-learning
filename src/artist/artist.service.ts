import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '@prisma/client';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async getArtistById(artistId: string): Promise<Artist> {
    const artist: Artist | null = await this.prismaService.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException(`Artist not found`);
    }

    return artist;
  }

  findAllArtists(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  async createArtist(dto: ArtistDto): Promise<Artist> {
    return this.prismaService.artist.create({
      data: dto,
    });
  }
}
