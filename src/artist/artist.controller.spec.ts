import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';

const artist = {
  id: uuidv4(),
  name: 'Test Artist',
  genre: 'Rock',
};

describe('ArtistController', () => {
  let artistController: ArtistController;
  let artistService: ArtistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtistController],
      providers: [
        {
          provide: ArtistService,
          useValue: {
            findAllArtists: jest.fn().mockResolvedValue([artist, artist]),
            getArtistById: jest.fn().mockResolvedValue(artist),
            createArtist: jest.fn().mockResolvedValue(artist),
          },
        },
      ],
    }).compile();

    artistController = module.get<ArtistController>(ArtistController);
    artistService = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(artistController).toBeDefined();
    expect(artistService).toBeDefined();
  });

  it('should return all artists', async () => {
    const artists = await artistController.findAll();
    expect(artists).toEqual([artist, artist]);
  });

  it('should return an artist by ID', async () => {
    const foundArtist = await artistController.getArtistById(artist.id);
    expect(foundArtist).toEqual(artist);
  });

  it('should throw an error if artist not found', async () => {
    jest
      .spyOn(artistService, 'getArtistById')
      .mockRejectedValueOnce(new NotFoundException('Artist not found'));

    try {
      await artistController.getArtistById('non-existent-id');
    } catch (error) {
      if (error instanceof NotFoundException) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Artist not found');
      } else {
        throw error;
      }
    }
  });

  it('should create a new artist', async () => {
    const newArtist = await artistController.createArtist(artist);
    expect(newArtist).toEqual(artist);
  });
});
