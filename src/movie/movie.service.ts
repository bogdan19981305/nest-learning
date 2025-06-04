import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from '../actor/entities/actor.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return this.moviesRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds } = dto;

    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors?.length) {
      throw new NotFoundException('Actors not found');
    }

    const movie = this.moviesRepository.create({
      title,
      releaseYear,
      actors,
    });

    return await this.moviesRepository.save(movie);
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOne({
      where: { id },
      relations: ['actors'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(movie, dto);
    return await this.moviesRepository.save(movie);
  }

  async delete(id: string): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return await this.moviesRepository.remove(movie);
  }
}
