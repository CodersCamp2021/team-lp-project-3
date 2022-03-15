import UserController from './user.js';
import { jest } from '@jest/globals';
import { User } from '../models/user.js';

describe('Updating user password', () => {
  const mockUser = {
    _id: '621f5d05fd6dfee087a3c3f1',
    firstName: 'fname',
    lastName: 'lname',
    username: 'user',
    email: 'test@example.com',
    password: '$2b$10$esfpdqit5A6oDyenef1nR.UWBroY2ci.427tbmk2i2vOXnfkz0bdO',
    type: 'user',
    createdOn: '2022-03-02T13:49:44.117Z',
    ratedGames: [],
    __v: 0,
    save: () => {},
  };

  const mockReq = {
    body: {
      password: 'passwordpassword',
      newPassword: 'dbaskdjasyfasddkashdkas',
      passwordConfirmation: 'dbaskdjasyfasddkashdkas',
    },
    params: {
      userId: '621f5d05fd6dfee087a3c3f1',
    },
  };

  it('should throw an error when there is no user with given id', async () => {
    User.findById = jest.fn().mockReturnValueOnce(null);

    await expect(
      UserController.changeUserPassword(mockReq.params.userId, mockReq.body),
    ).rejects.toThrowError(
      `User with id: ${mockReq.params.userId} does not exist`,
    );
  });

  it('should throw an error when user passes invalid current password', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);

    await expect(
      UserController.changeUserPassword(mockReq.params.userId, {
        password:
          'invalid$2b$10$avt5RfT6er4PBUkvvFPM6Oj.WhKLoiz/8w5J0IC208NbiZ0pyMezG',
        newPassword: 'dbaskdjasyfasddkashdkas',
        passwordConfirmation: 'dbaskdjasyfasddkashdkas',
      }),
    ).rejects.toThrowError('Invalid password');
  });

  it('should change password when giving proper data', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);

    User.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });

    await expect(
      UserController.changeUserPassword(mockReq.params.userId, mockReq.body),
    ).resolves.toEqual({
      message: 'Password successfully updated.',
    });
  });
});

describe('Updating user email', () => {
  const mockUser = {
    _id: '621f5d05fd6dfee087a3c3f1',
    firstName: 'fname',
    lastName: 'lname',
    username: 'user',
    email: 'test@example.com',
    password: '$2b$10$esfpdqit5A6oDyenef1nR.UWBroY2ci.427tbmk2i2vOXnfkz0bdO',
    type: 'user',
    createdOn: '2022-03-02T13:49:44.117Z',
    ratedGames: [],
    __v: 0,
    save: () => {},
  };

  const mockReq = {
    body: {
      email: 'test2@example.com',
      password: 'passwordpassword',
    },
    params: {
      userId: '621f5d05fd6dfee087a3c3f1',
    },
  };

  it('should throw an error when there is no user with given id', async () => {
    User.findById = jest.fn().mockReturnValueOnce(null);

    await expect(
      UserController.changeUserEmail(mockReq.params.userId, mockReq.body),
    ).rejects.toThrowError(
      `User with id: ${mockReq.params.userId} does not exist`,
    );
  });

  it('should throw an error when user passes invalid password', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);

    await expect(
      UserController.changeUserEmail(mockReq.userId, {
        email: 'test@example.com',
        password:
          'invalid$2b$10$avt5RfT6er4PBUkvvFPM6Oj.WhKLoiz/8w5J0IC208NbiZ0pyMezG',
      }),
    ).rejects.toThrowError('Invalid password');
  });

  it('should throw an error when email has been taken', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);
    User.findOne = jest.fn().mockReturnValueOnce({ email: 'test@example.com' });

    await expect(
      UserController.changeUserEmail(mockReq.params.userId, mockReq.body),
    ).rejects.toThrowError('Email has been taken.');
  });

  it('should change email when giving proper data', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);
    User.findOne = jest.fn().mockReturnValueOnce(null);

    User.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });

    await expect(
      UserController.changeUserEmail(mockReq.params.userId, mockReq.body),
    ).resolves.toEqual({
      message: 'E-mail successfully updated.',
    });
  });
});
