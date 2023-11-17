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
export interface SignupAsJobSeekerTypes {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  address: string;
}

const SignupAsJobSeekerValues: SignupAsJobSeekerTypes = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  address: '',
};

export interface ForgotPasswordTypes {
  email: string;
}

const ForgotPasswordValues: ForgotPasswordTypes = {
  email: '',
};
export {
  LoginDetailsInitialValues,
  SignupAsRecruiterValues,
  SignupAsJobSeekerValues,
  ForgotPasswordValues,
};
