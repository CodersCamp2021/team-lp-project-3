import bcrypt from 'bcryptjs';
import yup, { string } from 'yup';

export const registerValidation = async (data) => {
  const schema = yup.object({
    name: string().required().min(3),
    surname: string().required().min(3),
    username: string().required().min(3),
    email: string().email(),
    password: string().min(8),
  });

  await schema.validate(data);
};

export const loginValidation = async (data) => {
  const schema = yup.object({
    email: string().email(),
    password: string().min(8),
  });

  await schema.validate(data);
};

export const updateValidation = async (data) => {
  const schema = yup.object({
    password: string().min(8).required(),
    newPassword: string().min(8),
    newEmail: string().email(),
  });

  await schema.validate(data);
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
