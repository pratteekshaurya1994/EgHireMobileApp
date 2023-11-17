import * as yup from 'yup';

const LoginDetailsSchema = yup.object().shape({
  email: yup.string().required('Required').email('Invalid Email'),
  password: yup
    .string()
    .required('Required')
    .min(6, 'must be at least 6 characters'),
});

const SignupAsRecruiterSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid Email'),
  phone: yup
    .string()
    .min(10, 'Required')
    .max(10, 'Required')
    .required('Required'),
  address: yup.string().required('Required'),
});
const SignupAsJobSeekerSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
  email: yup.string().required('Required').email('Invalid Email'),
  phone: yup
    .string()
    .min(10, 'Required')
    .max(10, 'Required')
    .required('Required'),
  address: yup.string().required('Required'),
});

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().required('Required').email('Invalid Email'),
});

export {
  LoginDetailsSchema,
  SignupAsRecruiterSchema,
  SignupAsJobSeekerSchema,
  forgotPasswordSchema,
};
