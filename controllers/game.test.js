import GameController from './game.js';
import { jest } from '@jest/globals';
import { Game } from '../models/game.js';

describe('Creating game', () => {
  it('should create game when title is unique', async () => {
    // mock findOne to be a functions that return nothing
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
      ratedBy: [],
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
      ratedBy: [],
    };

    await expect(GameController.createGame(mockBody)).rejects.toThrowError();
  });
});

describe('Getting all games', () => {
  it('should return all games in db', async () => {
    // mock function that return data from db
    Game.find = jest.fn().mockReturnValueOnce([
      {
        _id: '621f5d05fd6dfee087a3c6a7',
        title: 'CS:GO',
        category: 'Shooter',
        description: 'FPS game',
        platform: 'PC',
        developer: 'Valve',
        releaseDate: '2015-12-12T00:00:00.000Z',
        ratedBy: [],
        __v: 0,
      },
      {
        _id: '621f5dd418dfee102b372991',
        title: 'Minecraft',
        category: 'Sandbox',
        description: 'Creative game',
        platform: 'PC',
        developer: 'Mojang',
        releaseDate: '2010-12-12T00:00:00.000Z',
        ratedBy: [],
        __v: 0,
      },
    ]);

    await expect(GameController.getAllGames()).resolves.toBeDefined();
  });
});

describe('Getting one game', () => {
  it('should return info about game that matches gameId from url', async () => {
    // mock function that return data from db
    Game.findById = jest.fn().mockReturnValueOnce({
      _id: '621f5d05fd6dfee087a3c6a7',
      title: 'CS:GO',
      category: 'Shooter',
      description: 'FPS game',
      platform: 'PC',
      developer: 'Valve',
      releaseDate: '2015-12-12T00:00:00.000Z',
      ratedBy: [],
      __v: 0,
    });

    await expect(
      GameController.getGameDetails('621f5d05fd6dfee087a3c6a7'),
    ).resolves.toBeDefined();
  });
  it('should throw error if there is no such gameId in db', async () => {
    // mock function that return data from db
    Game.findById = jest.fn().mockReturnValueOnce();

    await expect(
      GameController.getGameDetails('621f5d05fd6dfee087a3c6a7'),
    ).rejects.toThrowError();
  });
});

describe('Updating game details', () => {
  it('should throw error if there is no such gameId in db', async () => {
    // mock function that return data from db
    Game.findByIdAndUpdate = jest.fn().mockReturnValueOnce();

    //mock body data
    const mockBody = {
      title: 'CS 1.6',
    };

    await expect(
      GameController.updateGameDetails('621f5d05fd6dfee087a3c6a7', mockBody),
    ).rejects.toThrowError();
  });
  it('should update game properly', async () => {
    // mock function that return data from db
    Game.findByIdAndUpdate = jest.fn().mockReturnValueOnce({
      _id: '621f5d05fd6dfee087a3c6a7',
      title: 'CS 3.3',
      category: 'Shooter',
      description: 'FPS game',
      platform: 'PC',
      developer: 'Valve',
      releaseDate: '2015-12-12T00:00:00.000Z',
      ratedBy: [],
      __v: 0,
    });

    //mock body data
    const mockBody = {
      title: 'CS 3.3',
    };

    await expect(
      GameController.updateGameDetails('621f5d05fd6dfee087a3c6a7', mockBody),
    ).resolves.toBeDefined();
  });
});

describe('Deleting game', () => {
  it('should throw error if there is no such gameId in db', async () => {
    // mock function that return data from db
    Game.findByIdAndDelete = jest.fn().mockReturnValueOnce();

    await expect(
      GameController.updateGameDetails('621f5d05fd6dfee087a3c6a7'),
    ).rejects.toThrowError();
  });
});
