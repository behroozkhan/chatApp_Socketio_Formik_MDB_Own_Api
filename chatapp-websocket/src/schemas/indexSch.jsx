import * as Yup from 'yup';
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;


// Login Validation Schema
const SignupSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex, 'Invalid email format').email('Invalid email').required('Email Is Required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must include at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  });

// Register Validation Schema
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(3)
        .max(100)
        .required()
        ,
    email: Yup.string().matches(emailRegex, 'Invalid email format').email('Invalid email').required('Email Is Required'),
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must include at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  });



  export  {SignupSchema,RegisterSchema};