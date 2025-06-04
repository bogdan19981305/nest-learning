import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieEntity } from '../../movie/entities/movie.entity';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @Column({
    type: 'uuid',
    name: 'movie_id',
  })
  movieId: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
