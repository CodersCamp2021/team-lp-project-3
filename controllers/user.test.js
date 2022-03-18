import UserController from './user';
import { jest } from '@jest/globals';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

describe('Registering a user', () => {
  const mockReq = {
    body: {
      firstName: 'mockFname',
      lastName: 'mockLname',
      username: 'user4',
      email: 'user4@test.com',
      password: 'password',
    },
    session: {
      cookie: {
        path: '/',
        _expires: '9999-03-11T15:01:13.317Z',
        originalMaxAge: 86400000,
        httpOnly: true,
        secure: false,
      },
    },
    userId: '111a12b9c15e7edb7cb7b111',
  };
  it('should return a success message given correct data', async () => {
    User.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });
    User.findOne = jest.fn().mockReturnValueOnce();

    await expect(UserController.register(mockReq)).resolves.toEqual({
      message: 'User has been successfully registered.',
    });
  });

  it('should throw an error if the username has been taken', async () => {
    User.findOne = jest.fn().mockReturnValueOnce({
      _id: { $oid: '622a13622be4aa58bb177b2e' },
      firstName: 'fname',
      lastName: 'lname',
      username: 'user5',
      email: 'user5@test.com',
      password: '$2b$10$32JXIRD2kMpwbjTtLCpkH.EGWpq8IUeXQ9ECdiYsvjVY7g9AowSYi',
      type: 'user',
      ratedGames: [],
      createdOn: { $date: '2022-03-10T15:04:02.706Z' },
      __v: 0,
    });

    await expect(UserController.register(mockReq)).rejects.toThrowError(
      'This username has been taken.',
    );
  });
});

describe('User login', () => {
  const mockUser = {
    _id: '621f5d05fd6dfee087a3c3f1',
    firstName: 'firstname',
    lastName: 'secondname',
    username: 'username',
    email: 'username@test.com',
    password: '$2b$10$esfpdqit5A6oDyenef1nR.UWBroY2ci.427tbmk2i2vOXnfkz0bdO',
    type: 'user',
    createdOn: '2022-03-10T21:10:24.191+00:00',
    ratedGames: [],
    __v: 0,
    save: () => {},
  };

  const mockReq = {
    body: {
      email: 'username@test.com',
      password: 'passwordpassword',
    },
    session: {
      cookie: {
        path: '/',
        _expires: '9999-03-11T23:01:13.317Z',
        originalMaxAge: 86400000,
        httpOnly: true,
        secure: false,
      },
    },
    userId: '621f5d05fd6dfee087a3c3f1',
  };

  it('should log user in', async () => {
    User.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });
    User.findOne = jest.fn().mockReturnValueOnce(mockUser);
    // bcrypt.compare = jest.fn().mockReturnValueOnce('Valid password.');

    await expect(UserController.login(mockReq)).resolves.toEqual({
      message: 'Logged in successfully.',
    });
  });

  it('should throw an error if user with given email was not found', async () => {
    User.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });
    User.findOne = jest.fn().mockReturnValueOnce(null);

    await expect(UserController.login(mockReq)).rejects.toThrowError(
      'User with this email does not exist.',
    );
  });

  it('should throw an error if password for the user is invalid', async () => {
    User.prototype.save = jest.fn().mockImplementation(() => {
      return 'returnValue';
    });
    User.findOne = jest.fn().mockReturnValueOnce(mockUser);

    await expect(
      UserController.login({
        ...mockReq,
        body: {
          ...mockReq.body,
          password: 'invalidpassword',
        },
      }),
    ).rejects.toThrowError('Invalid password.');
  });
});

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

describe('Getting user info', () => {
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

  it('should throw error if no search userId in db', async () => {
    User.findById = jest.fn().mockReturnValueOnce(null);

    await expect(
      UserController.getUserInfo('621f5d05fd6dfee087a3c31'),
    ).rejects.toThrowError();
  });

  it('should return info about user with specific userId', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);

    await expect(
      UserController.getUserInfo('621f5d05fd6dfee087a3c3f1'),
    ).resolves.toBeDefined();
  });
});
