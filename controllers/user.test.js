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
    password: '$2b$10$avt5RfT6er4PBUkvvFPM6Oj.WhKLoiz/8w5J0IC208NbiZ0pyMezG',
    type: 'user',
    createdOn: '2022-03-02T13:49:44.117Z',
    ratedGames: [],
    __v: 0,
    save: () => {},
  };

  const mockReq = {
    body: {
      password: '$2b$10$avt5RfT6er4PBUkvvFPM6Oj.WhKLoiz/8w5J0IC208NbiZ0pyMezG',
      newPassword: 'dbaskdjasyfasddkashdkas',
      passwordConfirmation: 'dbaskdjasyfasddkashdkas',
    },
    //session: {
    //  cookie: {
    //    path: '/',
    //    _expires: '9999-03-11T15:01:13.317Z',
    //    originalMaxAge: 86400000,
    //    httpOnly: true,
    //    secure: false,
    //  },
    //},
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
      UserController.changeUserPassword('621f5d05fd6dfee087a3c3f1', {
        password:
          'invalid$2b$10$avt5RfT6er4PBUkvvFPM6Oj.WhKLoiz/8w5J0IC208NbiZ0pyMezG',
        newPassword: 'dbaskdjasyfasddkashdkas',
        passwordConfirmation: 'dbaskdjasyfasddkashdkas',
      }),
    ).rejects.toThrowError('Invalid password');
  });

  it('should change password when giving proper data', async () => {
    //User.findById = jest.fn().mockReturnValueOnce(mockUser);
    User.findById = jest.fn().mockImplementation(() => {
      return mockUser;
    });

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
