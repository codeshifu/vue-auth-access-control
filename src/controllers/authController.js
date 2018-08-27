import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import user from '../db/user';
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

export const login = ({ email, password }) =>
  new Promise((resolve, reject) => {
    const loginErrorMessage = {
      message: 'Invalid email/password combination.'
    };

    user.get(email).then(response => {
      const { email: userEmail, password: userPassword } = response.data || {};
      if (!userEmail || !userPassword) return reject(loginErrorMessage);

      comparePassword(password, userPassword).then(passwordMatch => {
        if (!passwordMatch) return reject(loginErrorMessage);

        const token = generateToken({ email: userEmail });
        return resolve({ token });
      });
    });
  });

export const register = data =>
  new Promise((resolve, reject) => {
    const { password, email, name = '' } = data;

    user.get(email).then(response => {
      if (response.data) return reject({ message: 'user already exists' });

      hashPassword(password).then(hash => {
        const newUser = Object.assign(data, {
          id: generateRandomId(),
          password: hash
        });

        user.set(newUser, result => resolve(null));
      });
    });
  });
