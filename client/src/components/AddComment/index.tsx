import { useContext } from 'react';
import { Box, CircularProgress, Fab, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { SubmitHandler, useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext.tsx";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Container } from './style';
import { createComment } from '../../api';
import { useParams } from 'react-router-dom';

interface Comment {
  item_id: string;
  author_id: string;
  body: string;
}

type FormFields = Pick<Comment, "body">;

function AddComment() {
  const { user } = useContext(UserContext);
  const {
    reset, register, handleSubmit, formState: { errors },
  } = useForm<FormFields>();
  const params = useParams();
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation((data: {
    values: FormFields, item_id: string, author_id: string
  }) => {
    return createComment({
      body: data.values.body,
      item_id: data.item_id,
      author_id: data.author_id,
    }).then(() => {
      client.invalidateQueries(['comments', params.itemId])
    });
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (!params.itemId) {
        return
      };
      if (!user) {
        return
      };
      await mutateAsync({
        values: {
          body: data.body
        },
        item_id: params.itemId,
        author_id: user.id,
      })
      reset({
        body: ''
      })
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitError: SubmitHandler<any> = (data) => console.log(data, errors);

  const getBodyError = () => {
    const error = errors.body;
    if (error?.type === 'required') {
      return "You have to write something in comment";
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit, onSubmitError)}>
      <TextField
        type="text"
        {...register("body", {
          required: true,
        })}
        id="standard-required"
        label='Your comment'
        fullWidth
        multiline
        minRows={2}
        error={!!errors.body}
        helperText={getBodyError()}
      />
      <Fab
        size="large"
        color="secondary"
        aria-label="send"
        type='submit'
      >
        <SendIcon sx={{ width: 30, height: 30 }} />
      </Fab>
    </Container>
  )
};

export default AddComment;