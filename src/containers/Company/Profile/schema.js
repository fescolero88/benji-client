import { object, string } from 'yup';

export default object().shape({
  owner: object().shape({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    jobTitle: string().required('Job Title is required'),
  }),
  title: string().required('Company Name is required'),
  email: string()
    .required('Email is required')
    .email('Input correct email format'),
  phone: string().required('Phone is required'),
  city: string().required('City is required'),
  state: string().required('State is required'),
  street: string().required('Address is required'),
  zipCode: string()
    .required('Zip Code is required')
    .test('len', 'Zip Code should be 5 or 9 digits', val => val && (val.length === 5 || val.length === 9)),
  website: string().required('Website is required'),
});
