import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getCommentsByItemId } from '../../api';
import { CommentContainer, HederContainer } from './style';
import { formatDistanceToNow } from 'date-fns';
import { StyledLink } from '../../style';

function CommentsList() {
  const params = useParams();

  const { data: comments = [], isLoading } = useQuery(
    ['comments', params.itemId],
    () => {
      if (!params.itemId) { return null }
      return getCommentsByItemId(params.itemId)
    });

  if (!comments) {
    return null
  }

  if (isLoading) {
    return (
      <Box sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  };
  return (
    <Container sx={{ pb: '50px' }} maxWidth='desktop'>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ laptop: 10 }}
        sx={{
          display: 'flex',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {comments.map((comment) => (
          <Grid
            key={comment.id}
            item
            desktop={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
              alignSelf: 'center',
            }}
          >
            <CommentContainer>
              <HederContainer>
                <Typography
                  sx={{ margin: '10px' }}
                  variant='subtitle2'
                >
                  <StyledLink to={`/collections/${comment.author_id}`}>
                    {comment.author.username}
                  </StyledLink>
                </Typography>
                <Typography
                  sx={{ margin: '10px' }}
                  variant='body1'
                >
                  {formatDistanceToNow(new Date(comment.created_at))} ago
                </Typography>
              </HederContainer>
              <Typography sx={{ml: '50px'}}>{comment.body}</Typography>
            </CommentContainer>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};

export default CommentsList;