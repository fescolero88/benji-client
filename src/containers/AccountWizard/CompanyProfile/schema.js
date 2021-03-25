import { object, string } from 'yup';

const validationSchema = object().shape({
  type: string().required('Company Type required'),
  title: string().required('Company Name required'),
  address: string().required('Address required'),
  city: string().required('City required'),
  state: string().required('State required'),
  zipCode: string().required('Zip code required')
});

export default validationSchema;
