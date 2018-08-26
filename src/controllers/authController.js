import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import user from '../db/user';
import { errorResponse, successResponse } from '../db/helpers';

export const register = (data = {}, cb) => {
  const { password, email, name = '' } = data;

  user.get(email, response => {
    if (response.status === 200 && response.data)
      return cb(errorResponse({ message: 'user already exists' }));

    data.id = randomBytes(6).toString('hex');

    bcrypt.genSalt(5).then(salt => {
      bcrypt.hash(password, salt, (err, hash) => {
        user.set({ ...data, password: hash }, res =>
          cb(successResponse(res.data))
        );
      });
    });
  });
};
