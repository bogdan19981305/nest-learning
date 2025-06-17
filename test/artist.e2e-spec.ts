import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { ArtistDto } from '../src/artist/dto/artist.dto';

const dto: ArtistDto = {
  name: 'Test Artist',
  genre: 'Rock',
};

describe('ArtistController (e2e)', () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.artist.deleteMany({});
    await prisma.$disconnect();
    await app.close();
  });

  it('(POST) /artist/create - should create artist', async () => {
    const response = await request(app.getHttpServer())
      .post('/artist/create')
      .send(dto)
      .expect(201);

    expect(response.body).toMatchObject(dto);
    expect(response.body).toHaveProperty('id');
  });

  it('(GET) /artist/all - should return all artists', async () => {
    const response = await request(app.getHttpServer())
      .get('/artist/all')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('(GET) /artist/:id - should return artist by ID', async () => {
    const createdArtist = await prisma.artist.create({
      data: dto,
    });

    const response = await request(app.getHttpServer())
      .get(`/artist/${createdArtist.id}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: createdArtist.id,
      name: createdArtist.name,
      genre: createdArtist.genre,
    });
  });

  it('(GET) /artist/:id - should return 404 for non-existing artist', async () => {
    const nonExistingId = 'non-existing-id';
    await request(app.getHttpServer())
      .get(`/artist/${nonExistingId}`)
      .expect(404);
  });
});
