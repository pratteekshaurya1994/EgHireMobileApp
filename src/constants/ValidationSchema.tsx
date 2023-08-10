import * as yup from 'yup';

const LoginDetailsSchema = yup.object().shape({
  phoneNumber: yup.number().required('Required'),
});

export {LoginDetailsSchema};
