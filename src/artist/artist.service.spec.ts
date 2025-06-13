import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

const artistId = uuidv4();

const artists: ArtistDto[] = [
  {
    id: artistId,
    name: 'Billie Eilish',
    genre: 'Pop',
  },
  {
    id: uuidv4(),
    name: 'The Weeknd',
    genre: 'R&B',
  },
  {
    id: uuidv4(),
    name: 'Imagine Dragons',
    genre: 'Rock',
  },
  {
    id: uuidv4(),
    name: 'Dua Lipa',
    genre: 'Pop',
  },
  {
    id: uuidv4(),
    name: 'Ed Sheeran',
    genre: 'Pop',
  },
];

const artist = artists[0];

const db = {
  artist: {
    findMany: jest.fn().mockResolvedValue(artists),
    findUnique: jest.fn().mockResolvedValue(artist),
    create: jest.fn().mockResolvedValue(artist),
  },
};

describe('ArtistService', () => {
  let artistService: ArtistService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ArtistService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    artistService = module.get<ArtistService>(ArtistService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(artistService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('should return all artists', async () => {
    const result = await artistService.findAllArtists();
    expect(result).toEqual(artists);
  });

  it('should return an artist by ID', async () => {
    const result = await artistService.getArtistById(artistId);
    expect(result).toEqual(artist);
  });

  it('should throw NotFoundException if artist not found', async () => {
    const nonExistentId = 'non-existent-id';
    db.artist.findUnique.mockResolvedValue(null);

    try {
      await artistService.getArtistById(nonExistentId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Artist not found');
      }
    }
  });

  it('should create a new artist', async () => {
    const newArtist: ArtistDto = {
      id: uuidv4(),
      name: 'New Artist',
      genre: 'Pop',
    };

    db.artist.create.mockResolvedValue(newArtist);
    const result = await artistService.createArtist(newArtist);
    expect(result).toEqual(newArtist);
  });
});
