import { object, string } from 'yup';

const validationSchema = object().shape({
  client: string().required('Client is required'),
  title: string().required('Job Name is required'),
  startDate: string().required('Start Date is required'),
  wrapDate: string().required('Wrap Date is required'),
  jobNumber: string().required('Job Number is required'),
  execProducer: string().required('Exec Producer Name is required'),
  director: string().required('Director Name is required'),
});

export default validationSchema;
