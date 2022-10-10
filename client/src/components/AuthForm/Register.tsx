import { Link as MaterialLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { FormContainer, Input, StyledButton, Text } from './style'
import { SubmitHandler, useForm } from "react-hook-form";
import { register as registerNewUser } from "../../api";

interface User {
  username: string;
  email: string;
  password: string
}

type FormFields = Pick<User, "username" | "email" | "password"> & { passwordConfirmation: string };

function Register() {
  const navigate = useNavigate();
  const {
    register, handleSubmit, watch, formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await registerNewUser({
        username: data.username,
        email: data.email,
        password: data.password
      });
      return navigate("/login");
    } catch (e) {
      console.log(e)
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log(data, errors);

  const getUsernameError = () => {
    const error = errors.username;
    switch (error?.type) {
      case 'required':
        return 'Please enter your username';
      case 'minLength':
        return 'Use at least 2 characters'
      case 'maxLength':
        return 'You can use 20 characters at most'
    }
  };

  const getEmailError = () => {
    const error = errors.email;
    switch (error?.type) {
      case 'required':
        return 'Please enter your email';
      case 'minLength':
        return 'Use at least 6 characters'
    }
  };

  const getPasswordError = () => {
    const error = errors.password;
    switch (error?.type) {
      case 'required':
        return 'Password is required';
      case 'minLength':
        return 'Min length is 8 characters'
    }
  };

  const getPasswordConfirmationError = () => {
    const error = errors.passwordConfirmation;
    switch (error?.type) {
      case 'required':
        return 'This is required';
      case 'validate':
        return 'Password do not match'
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <Input
        type="text"
        {...register("username", { required: true, minLength: 2, maxLength: 20 })}
        id="username"
        label='Username'
        fullWidth
        error={!!errors.username}
        helperText={getUsernameError()}
      />
      <Input
        type="text"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
          minLength: 6,
          maxLength: 255
        })}
        id="email"
        label='Email'
        fullWidth
        error={!!errors.email}
        helperText={getEmailError()}
      />
      <Input
        type='password'
        {...register("password", { required: true, minLength: 8 })}
        id="password"
        label='Password'
        fullWidth
        error={!!errors.password}
        helperText={getPasswordError()}
      />
      <Input
        type='password'
        {...register("passwordConfirmation", {
          required: true,
          validate: (val: string) => {
            if (watch("password") !== val) {
              return "Your passwords do not match";
            }
          },
        })}
        id="confirmed-password"
        label='Confirm password'
        fullWidth
        error={!!errors.passwordConfirmation}
        helperText={getPasswordConfirmationError()}
      />
      <Text>
        Do you have an account? Sign in <Link to='/login'><MaterialLink href='/login'>here.</MaterialLink></Link>
      </Text>
      <StyledButton type='submit' variant="contained">Send</StyledButton>
    </FormContainer>
  )
};

export default Register;