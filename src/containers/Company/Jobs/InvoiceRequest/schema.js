import * as Yup from 'yup';

const hourlyMemoValidationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  dailyHours: Yup.number()
    .required('Daily Hours is required')
    .positive('Daily Hours should be greater than 0')
    .max(24, 'Daily hours should be less than 24'),
  workingDays: Yup.number()
    .required('Working Days is required')
    .positive('Working Days should be greater than 0'),
  workingRate: Yup.number()
    .required('Working Rate is required')
    .positive('Working Rate should be greater than 0'),
});

const fixedMemoValidationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  projectRate: Yup.number()
    .required('Project Rate is required')
    .positive('Project Rate should greater than 0')
});

export { hourlyMemoValidationSchema, fixedMemoValidationSchema };
