import { object, string, ref, bool } from 'yup';
import moment from 'moment';

export const companyValidationSchema = object().shape({
  companyType: string().required('Company Type is required'),
  title: string().required('Company Name is required'),
  jobTitle: string().required('Job Title is required'),
  firstName: string()
    .required('First Name is required'),
  lastName: string()
    .required('Last Name is required'),
  phone: string().required('Phone is required'),
  city: string().required('City is required'),
  state: string().required('State is required'),
  street: string().required('Address is required'),
  zipCode: string()
    .required('Zip Code is required')
    .test('len', 'Zip Code should be 5 or 9 digits', val => val && (val.length === 5 || val.length === 9)),
  email: string()
    .required('Email is required')
    .email('Input correct email format'),
  acceptTerms: bool().oneOf([true], 'Accept Terms & Conditions is required')
});

export const agencyValidationSchema = object().shape({
  firstName: string()
    .required('First Name is required'),
  lastName: string()
    .required('Last Name is required'),
  phone: string().required('Phone is required'),
  companyTitle: string().required('Company Name is required'),
  // password: string().min(8, 'password has at least 8 characters'),
  password: string().required('Password is required')
  // .matches(
  // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  // "Use 8 or more characters with a mix of letters, numbers & symbols")
  ,
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords does not match'
  ),
  city: string().required('City is required'),
  state: string().required('State is required'),
  street: string().required('Business Address is required'),
  zipCode: string()
    .required('Zip Code is required')
    .test('len', 'Zip Code should be 5 or 9 digits', val => val && (val.length === 5 || val.length === 9)),
  email: string()
    .required('Email is required')
    .email('Input correct email format'),
  jobTitle: string().required('Job Title is required'),
  acceptTerms: bool().oneOf([true], 'Accept Terms & Conditions is required')
});

export const accountValidationSchema = object().shape({
  jobTitle: string().required('Job Title is required'),
  fullName: string()
    .required('Full Name is required'),
  email: string()
    .required('Email is required')
    .email('Input correct email format'),
  password: string().required('Password is required')
  // .matches(
  // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  // "Use 8 or more characters with a mix of letters, numbers & symbols")
  ,
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords does not match'
  ),
  acceptTerms: bool().oneOf([true], 'Accept Terms & Conditions is required')
});
