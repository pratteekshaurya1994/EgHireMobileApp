export interface LoginDetailsTypes {
  email: string;
  password: string;
}

const LoginDetailsInitialValues: LoginDetailsTypes = {
  email: '',
  password: '',
};

export interface SignupAsRecruiterTypes {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
}

const SignupAsRecruiterValues: SignupAsRecruiterTypes = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  address: '',
};

export {LoginDetailsInitialValues, SignupAsRecruiterValues};
