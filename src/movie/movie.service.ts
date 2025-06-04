import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly moviesRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return this.moviesRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const movie = this.moviesRepository.create(dto);

    return await this.moviesRepository.save(movie);
  }

  async findById(id: number): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: number, dto: MovieDto): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    Object.assign(movie, dto);
    return await this.moviesRepository.save(movie);
  }

  async delete(id: number): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return await this.moviesRepository.remove(movie);
  }
}
