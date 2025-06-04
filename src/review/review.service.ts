import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entity/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    const { text, rating, movieId } = createReviewDto;

    const movie = await this.movieService.findById(movieId);
    if (!movie) throw new NotFoundException('Movie not found');
    const review = this.reviewRepository.create({
      description: text,
      rating,
      movie,
    });

    return await this.reviewRepository.save(review);
  }
}
