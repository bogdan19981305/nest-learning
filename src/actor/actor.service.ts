import { Injectable } from '@nestjs/common';

@Injectable()
export class ActorService {
  // constructor(
  //   @InjectRepository(ActorEntity)
  //   private readonly actorRepository: Repository<ActorEntity>,
  // ) {}
  //
  // async create(createReviewDto: CreateActorDto): Promise<ActorEntity> {
  //   const { name } = createReviewDto;
  //
  //   const actor = this.actorRepository.create({ name });
  //   return await this.actorRepository.save(actor);
  // }
}
