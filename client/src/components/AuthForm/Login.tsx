import { Link as MaterialLink, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer, StyledButton, Text } from './style';
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from '../../api';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface User {
  email: string;
  password: string
}

type FormFields = Pick<User, "email" | "password">;

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormFields>();

  const { setUserFromToken } = useContext(UserContext)
  const { mutateAsync, isLoading } = useMutation((data: FormFields) => {
    return login({
      email: data.email,
      password: data.password
    })
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const loginData = await mutateAsync({
        email: data.email,
        password: data.password
      })
      setUserFromToken(loginData.token)
      toast.success(t("succes-toast"));
      return navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log(data, errors);

  const getEmailError = () => {
    const error = errors.email;
    if (error?.type === 'required') {
      return t("email-error");
    }
  };

  const getPasswordError = () => {
    const error = errors.password;
    if (error?.type === 'required') {
      return t("password-error");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <TextField
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
      <TextField
        {...register("password", { required: true })}
        type="password"
        id="standard-required"
        label={t("password")}
        fullWidth
        error={!!errors.password}
        helperText={getPasswordError()}
      />
      <Text>
        {t("account-text") + " "}
        <Link to='/register'>
          <MaterialLink href='/register'>{t("here")}.</MaterialLink>
        </Link>
      </Text>
      <StyledButton disabled={isLoading} type='submit' variant="contained">{t("send")}</StyledButton>
    </FormContainer>
  )
};

export default Login;