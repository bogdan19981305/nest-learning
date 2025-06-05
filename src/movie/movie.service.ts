import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.movie.findMany({
      where: {
        isAviable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: actorIds,
        },
      },
    });

    if (!actors || !actors?.length) {
      throw new NotFoundException('Actors not found');
    }

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((act) => ({
            id: act.id,
          })),
        },
      },
    });

    return movie;
  }

  // async findById(id: string): Promise<MovieEntity> {
  //   const movie = await this.moviesRepository.findOne({
  //     where: { id },
  //     relations: ['actors'],
  //   });
  //
  //   if (!movie) {
  //     throw new NotFoundException(`Movie with id ${id} not found`);
  //   }
  //   return movie;
  // }
  //
  // async update(id: string, dto: MovieDto): Promise<MovieEntity> {
  //   const movie = await this.moviesRepository.findOneBy({ id });
  //
  //   if (!movie) {
  //     throw new NotFoundException(`Movie with id ${id} not found`);
  //   }
  //   Object.assign(movie, dto);
  //   return await this.moviesRepository.save(movie);
  // }
  //
  // async delete(id: string): Promise<MovieEntity> {
  //   const movie = await this.moviesRepository.findOneBy({ id });
  //   if (!movie) {
  //     throw new NotFoundException(`Movie with id ${id} not found`);
  //   }
  //   return await this.moviesRepository.remove(movie);
  // }
}
