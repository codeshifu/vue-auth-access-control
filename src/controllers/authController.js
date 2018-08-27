import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import user from '../db/user';
import { errorResponse, successResponse } from '../db/helpers';
import jwt from 'jwt-simple';

export const generateToken = user => {
  const timeIssued = new Date().getTime();
  return jwt.encode({ sub: user.email, iat: timeIssued }, 'thisIsAsecreTKeY');
};

export const generateRandomId = () => randomBytes(6).toString('hex');

export const hashPassword = password => {
  return bcrypt.genSalt(5).then(salt => {
    return bcrypt.hash(password, salt).then(hash => hash);
  });
};

export const comparePassword = (rawPassword, hash) => {
  return bcrypt.compare(rawPassword, hash);
};

export const login = ({ email, password }, cb) => {
  user.get(email, response => {
    const { email: userEmail, password: userPassword } = response.data;
    if (!userEmail || !userPassword)
      return cb(
        errorResponse({ message: 'invalid email/password combination.' })
      );

    comparePassword(password, userPassword).then(passwordMatch => {
      if (!passwordMatch)
        return cb(
          errorResponse({ message: 'invalid email/password combination.' })
        );

      const token = generateToken({ email: userEmail });

      return cb(successResponse({ token }));
    });
  });
};

export const register = (data = {}, cb) => {
  const { password, email, name = '' } = data;

  user.get(email, response => {
    if (response.status === 200 && response.data)
      return cb(errorResponse({ message: 'user already exists' }));

    data.id = generateRandomId();

    hashPassword(password).then(hash => {
      user.set({ ...data, password: hash }, result =>
        cb(successResponse(result.data))
      );
    });
  });
};
