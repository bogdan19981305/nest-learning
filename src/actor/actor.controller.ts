import { Body, Controller, Post } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorService } from './actor.service';
import { Actor } from '@prisma/client';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post('create')
  async create(@Body() createActorDto: CreateActorDto): Promise<Actor> {
    return this.actorService.create(createActorDto);
  }
}
