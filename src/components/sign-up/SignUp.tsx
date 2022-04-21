import { fetchData, Response } from '../../utils/fetchData';
import { useState } from 'react';
import * as Yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';

const schema = Yup.object().shape({
  firstName: Yup.string().required('This field is required!'),
  lastName: Yup.string().required('This field is required!'),
  username: Yup.string().required('This field is required!'),
  email: Yup.string().required('This field is required!'),
  password: Yup.string().required('This field is required!'),
});

export default function SignUp() {
  const [response, setResponse] = useState<Response>({});
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  });

  return <div>Register here!</div>;
}
