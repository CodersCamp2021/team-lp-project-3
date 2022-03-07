import RateController from './rate.js';
import { jest } from '@jest/globals';
import { Rate } from '../models/rate.js';
import { Game } from '../models/game.js';
import { User } from '../models/user.js';

describe('Getting single rating', () => {
  // mock data
  const mockBody = {
    _id: '621f5d05fd6dfee087a3c6a7',
    gameId: '621f5d05fd6dfee087a3c5d0',
    userId: '621f5d05fd6dfee087a3c3f1',
    rating: 1,
  };

  beforeAll(() => {
    // mock function that returns data from db
    Rate.findOne = jest.fn().mockReturnValueOnce(mockBody);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return rating value for matching userId and gameId', async () => {
    Game.findById = jest.fn().mockReturnValueOnce({
      _id: mockBody.gameId,
    });
    User.findById = jest.fn().mockReturnValueOnce({
      _id: mockBody.userId,
    });

    await expect(
      RateController.getGameRate({
        gameId: mockBody.gameId,
        userId: mockBody.userId,
      }),
    ).resolves.toEqual({ rating: 1 });
  });

  it('should throw an error if there is no matching gameId', async () => {
    Game.findById = jest.fn().mockReturnValueOnce(null);
    User.findById = jest.fn().mockReturnValueOnce({
      _id: mockBody.userId,
    });

    await expect(
      RateController.getGameRate({
        gameId: mockBody.gameId,
        userId: mockBody.userId,
      }),
    ).rejects.toThrowError('Game not found.');
  });

  it('should throw an error if there is no matching userId', async () => {
    Game.findById = jest.fn().mockReturnValueOnce({
      _id: mockBody.gameId,
    });
    User.findById = jest.fn().mockReturnValueOnce(null);

    await expect(
      RateController.getGameRate({
        gameId: mockBody.gameId,
        userId: mockBody.userId,
      }),
    ).rejects.toThrowError('User not found.');
  });
});
