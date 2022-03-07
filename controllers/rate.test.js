import RateController from './rate.js';
import { jest } from '@jest/globals';
import { Rate } from '../models/rate.js';
import { Game } from '../models/game.js';
import { User } from '../models/user.js';

describe('Getting single rating', () => {
  // mock data
  const mockRate = {
    _id: '621f5d05fd6dfee087a3c6a7',
    gameId: '621f5d05fd6dfee087a3c5d0',
    userId: '621f5d05fd6dfee087a3c3f1',
    rating: 1,
  };

  beforeAll(() => {
    // mock function that returns data from db
    Rate.findOne = jest.fn().mockReturnValueOnce(mockRate);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return rating value for matching userId and gameId', async () => {
    Game.findById = jest.fn().mockReturnValueOnce({
      _id: mockRate.gameId,
    });
    User.findById = jest.fn().mockReturnValueOnce({
      _id: mockRate.userId,
    });

    await expect(
      RateController.getGameRate({
        gameId: mockRate.gameId,
        userId: mockRate.userId,
      }),
    ).resolves.toEqual({ rating: 1 });
  });

  it('should throw an error if there is no matching gameId', async () => {
    Game.findById = jest.fn().mockReturnValueOnce(null);
    User.findById = jest.fn().mockReturnValueOnce({
      _id: mockRate.userId,
    });

    await expect(
      RateController.getGameRate({
        gameId: mockRate.gameId,
        userId: mockRate.userId,
      }),
    ).rejects.toThrowError('Game not found.');
  });

  it('should throw an error if there is no matching userId', async () => {
    Game.findById = jest.fn().mockReturnValueOnce({
      _id: mockRate.gameId,
    });
    User.findById = jest.fn().mockReturnValueOnce(null);

    await expect(
      RateController.getGameRate({
        gameId: mockRate.gameId,
        userId: mockRate.userId,
      }),
    ).rejects.toThrowError('User not found.');
  });
});

describe('Updating a rating', () => {
  // mock data
  const mockRate = {
    _id: '621f5d05fd6dfee087a3c5d0',
    gameId: '621f5d05fd6dfee087a3c6a7',
    userId: '621f5d05fd6dfee087a3c3f1',
    rating: 1,
  };

  const mockGame = {
    _id: '621f5d05fd6dfee087a3c6a7',
    title: 'CS:GO',
    category: 'Shooter',
    description: 'FPS game',
    platform: 'PC',
    developer: 'Valve',
    releaseDate: '2015-12-12T00:00:00.000Z',
    ratedBy: [],
    __v: 0,
    save: () => {},
  };

  const mockUser = {
    _id: '621f5d05fd6dfee087a3c3f1',
    firstName: 'fname',
    lastName: 'lname',
    username: 'user',
    email: 'test@example.com',
    password: '$2b$10$avt5RfT6er4PBUkvvFPM6Oj.WhKLoiz/8w5J0IC208NbiZ0pyMezG',
    type: 'user',
    createdOn: '2022-03-02T13:49:44.117Z',
    ratedGames: [],
    __v: 0,
    save: () => {},
  };

  afterEach(() => {
    mockGame.ratedBy = [];
    mockUser.ratedGames = [];
  });

  it("should add rating if it doesn't exist and rating !== 0", async () => {
    // mocks: no rating in the DB

    Game.findById = jest.fn().mockReturnValueOnce(mockGame);
    User.findById = jest.fn().mockReturnValueOnce(mockUser);
    Rate.findOneAndUpdate = jest.fn().mockReturnValueOnce(mockRate);

    await expect(RateController.putGameRate(mockRate)).resolves.toEqual({
      message: 'Rating updated.',
    });
    expect(mockGame.ratedBy).toContain(mockRate.userId);
    expect(mockUser.ratedGames).toContain(mockRate.gameId);
  });

  it('should do nothing if rating exists and rating !== 0', async () => {
    // mocks: rating in the DB
    mockGame.ratedBy.push(mockRate.userId);
    mockUser.ratedGames.push(mockRate.gameId);

    Game.findById = jest.fn().mockReturnValueOnce(mockGame);
    User.findById = jest.fn().mockReturnValueOnce(mockUser);
    Rate.findOneAndUpdate = jest.fn().mockReturnValueOnce(mockRate);

    await expect(RateController.putGameRate(mockRate)).resolves.toEqual({
      message: 'Rating updated.',
    });
    // check if IDs are present
    expect(mockGame.ratedBy).toContain(mockRate.userId);
    expect(mockGame.ratedBy.length).toBe(1);
    expect(mockUser.ratedGames).toContain(mockRate.gameId);
    expect(mockUser.ratedGames.length).toBe(1);
    expect(mockRate.rating).toEqual(1);
  });

  it('should delete game/user IDs from respective arrays if rating === 0', async () => {
    // mocks: rating in the DB
    mockGame.ratedBy.push(mockRate.userId);
    mockUser.ratedGames.push(mockRate.gameId);
    mockRate.rating = 0;
    expect(mockGame.ratedBy).toContain(mockRate.userId);
    expect(mockUser.ratedGames).toContain(mockRate.gameId);

    Game.findById = jest.fn().mockReturnValueOnce(mockGame);
    User.findById = jest.fn().mockReturnValueOnce(mockUser);
    Rate.findOneAndDelete = jest.fn().mockReturnValueOnce({
      gameId: mockRate.gameId,
      userId: mockRate.userId,
    });

    await expect(RateController.putGameRate(mockRate)).resolves.toEqual({
      message: 'Rating updated.',
    });
    // check if IDs were deleted
    expect(mockGame.ratedBy).not.toContain(mockRate.userId);
    expect(mockUser.ratedGames).not.toContain(mockRate.gameId);
  });
});
