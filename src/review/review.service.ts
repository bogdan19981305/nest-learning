import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  // constructor(
  //   @InjectRepository(ReviewEntity)
  //   private readonly reviewRepository: Repository<ReviewEntity>,
  //   private readonly movieService: MovieService,
  // ) {}
  //
  // async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
  //   const { text, rating, movieId } = createReviewDto;
  //
  //   const movie = await this.movieService.findById(movieId);
  //   if (!movie) throw new NotFoundException('Movie not found');
  //   const review = this.reviewRepository.create({
  //     description: text,
  //     rating,
  //     movie,
  //   });
  //
  //   return await this.reviewRepository.save(review);
  // }
}
