import { object, string } from 'yup';

const validationSchema = object().shape({
  nickname: string().required('Nickname is required'),
  phone: string().required('Phone is required'),
  city: string().required('City is required'),
  state: string().required('State is required')

});

export default validationSchema;
