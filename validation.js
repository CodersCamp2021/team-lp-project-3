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
