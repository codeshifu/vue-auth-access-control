import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import user from '../db/user';
import { errorResponse, successResponse } from '../db/helpers';

export const login = ({ email, password }, cb) => {
  user.get(email, response => {
    const userData = response.data;
    if (!userData)
      return cb(
        errorResponse({ message: 'invalid email/password combination.' })
      );

    bcrypt.compare(password, userData.password).then(passwordMatch => {
      if (!passwordMatch)
        return cb(
          errorResponse({ message: 'invalid email/password combination.' })
        );

      return cb(successResponse(response.data));
    });
  });
};

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
