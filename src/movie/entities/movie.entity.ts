import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewEntity } from '../../review/entity/review.entity';
import { ActorEntity } from '../../actor/entities/actor.entity';
import { MoviePosterEntity } from './poster.entity';

export enum Genre {
  ACTION = 'ACTION',
  COMEDY = 'COMEDY',
  DRAMA = 'DRAMA',
  HORROR = 'HORROR',
}

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'integer',
    unsigned: true,
    name: 'release_year',
  })
  releaseYear: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'date',
    nullable: true,
    name: 'release_date',
  })
  releaseDate: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ default: false, type: 'boolean', name: 'is_public' })
  isPublic: boolean;

  @Column({
    type: 'enum',
    enum: Genre,
    default: Genre.ACTION,
  })
  genre: Genre;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' },
  })
  actors: ActorEntity[];

  @Column({ name: 'poster_id', type: 'uuid', nullable: true })
  posterId: string;

  @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'poster_id' })
  poster: MoviePosterEntity | null;
}
