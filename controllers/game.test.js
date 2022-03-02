import GameController from './game.js';
import { jest } from '@jest/globals';
import { Game } from '../models/game.js';

describe('Creating game', () => {
  it('should create game when title is unique', async () => {
    // mock findOne to be a functions that returns another game
    Game.findOne = jest.fn().mockReturnValueOnce();
    // mock saving objects
    Game.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });

    // mock data
    const mockBody = {
      title: 'CS:GO',
      category: 'Shooter',
      description: 'FPS game',
      platform: 'PC',
      developer: 'Valve',
      releaseDate: '2015-12-12',
    };

    await expect(GameController.createGame(mockBody)).resolves.toBeDefined();
  });
  it('should not create game and throw error when title is not unique', async () => {
    // mock findOne to be a functions that returns another game
    Game.findOne = jest.fn().mockReturnValueOnce({
      title: 'randomtitle',
    });
    // mock saving objects
    Game.prototype.save = jest.fn().mockImplementation(() => {});

    // mock data
    const mockBody = {
      title: 'CS:GO',
      category: 'Shooter',
      description: 'FPS game',
      platform: 'PC',
      developer: 'Valve',
      releaseDate: '2015-12-12',
    };

    await expect(GameController.createGame(mockBody)).rejects.toThrowError();
  });
});
