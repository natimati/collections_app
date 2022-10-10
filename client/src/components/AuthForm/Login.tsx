import { Link as MaterialLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer, Input, StyledButton, Text } from './style';
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from '../../api';

interface User {
  email: string;
  password: string
}

type FormFields = Pick<User, "email" | "password">;

function Login() {
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password
      })
      return navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log(data, errors);

  const getEmailError = () => {
    const error = errors.email;
    if (error?.type === 'required') {
      return 'Please enter your email';
    }
  };

  const getPasswordError = () => {
    const error = errors.password;
    if (error?.type === 'required') {
      return 'Password is required';
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <Input
        type="text"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          }
        })}
        id="standard-required"
        label='Email'
        fullWidth
        error={!!errors.email}
        helperText={getEmailError()}
      />
      <Input
        {...register("password", { required: true })}
        type="password"
        id="standard-required"
        label='Password'
        fullWidth
        error={!!errors.password}
        helperText={getPasswordError()}
      />
      <Text>Do you have an account? Sign up <Link to='/register'><MaterialLink href='/register'>here.</MaterialLink></Link></Text>
      <StyledButton type='submit' variant="contained">Send</StyledButton>
    </FormContainer>
  )
};

export default Login;