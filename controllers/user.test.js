import UserController from './user';
import { jest } from '@jest/globals';
import { User } from '../models/user';

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


describe('Login User', () => {
  const mockUser = {
    _id: '621f5d05fd6dfee087a3c3f1',
    firstName: 'firstname',
    lastName: 'secondname',
    username: 'username',
    email: 'username@test.com',
    password: '$2b$10$/KDLVy8kSkB6WCHcTpnWcO8Z9kjuxIf.bgL4HrMRw8SbbGrH6EEQm',
    type: 'user',
    createdOn: '2022-03-10T21:10:24.191+00:00',
    ratedGames: [],
    __v: 0,
    save: () => {},
};

const mockReq = {
    body: {
      email: 'username@test.com',
      password: '$2b$10$/KDLVy8kSkB6WCHcTpnWcO8Z9kjuxIf.bgL4HrMRw8SbbGrH6EEQm',
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

  it('user login', async () => {
    User.prototype.save = jest.fn().mockImplementation(() => {
        return 'returnValue';
    });
    User.findOne = jest.fn().mockReturnValueOnce(mockUser);

    await expect(UserController.login(mockReq.body, mockReq.session)).resolves.toEqual({
      message: 'Logged in successfully.',
    });
  });

  
  it('should throw an error when user passes invalid password', async () => {
    User.findById = jest.fn().mockReturnValueOnce(mockUser);

    await expect(
      UserController.login(mockReq.userId, mockReq.body, {
        password:
          'invalid$2b$10$/KDLVy8kSkB6WCHcTpnWcO8Z9kjuxIf.bgL4HrMRw8SbbGrH6EEQm',
      }),
    ).rejects.toThrowError('Incorrect password');
  });

  

  it('should throw an error when is no user with given id', async () => {
    User.findById = jest.fn().mockReturnValueOnce(null);

    await expect(
      UserController.login(mockReq.userId, mockReq.body),
    ).rejects.toThrowError(
      `User with id: ${mockReq.userId} doesn't exist`,
    );
  });
});