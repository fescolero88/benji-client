import {object, string, array, bool } from 'yup';

const schema = object().shape({
  lineItems: array()
    .of(
      object().shape({
        title: string()
          .required('Title is required'),
      })
    )
});

export default schema;
