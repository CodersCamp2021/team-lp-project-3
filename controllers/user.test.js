import UserController from './user.js';
import { jest } from '@jest/globals';
import { User } from '../models/user.js';

describe('Updating user details', () => {
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
          password: 'password1',
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
        }
      };
    
    it('change password', async () => {
    User.prototype.save = jest.fn().mockImplementation(() => {
        return 'returnValue';
    });
    User.findOne = jest.fn().mockReturnValueOnce(mockUser);

    await expect(UserController.changeUserPassword(mockReq)).resolves.toEqual({
        message: 'Password successfully updated.',
    });
    });
});