import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { Actor } from '@prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createReviewDto: CreateActorDto): Promise<Actor> {
    const { name } = createReviewDto;

    return this.prismaService.actor.create({
      data: {
        name,
      },
    });
  }
}
