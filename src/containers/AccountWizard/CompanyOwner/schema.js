import { object, string } from 'yup';

const validationSchema = object().shape({
  type: string().required('Company Type is required'),
  title: string().required('Company Name is required'),
  ownerEmail: string()
    .when('isOwner', {
      is: false,
      then: string().required('Company owner email is required').email('Company owner email is invalid'),
    })

});

export default validationSchema;
