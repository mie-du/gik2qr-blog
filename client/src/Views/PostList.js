import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import { Link } from 'react-router-dom';
import { PlaceholderAvatar } from '../Components/small';
import { toDateTimeString, shorten } from '../Helpers/formating';

export default function PostList({ posts }) {
  console.log('%c--- Component: PostList ---', 'color: orange', posts);
  return (
    <Grid container spacing={{ xs: 2, md: 4 }} justifyContent='center'>
      {posts &&
        posts.map((post) => {
          const { id, title, body, imageUrl, updatedAt } = post.content;

          const { author } = post;
          const { tags } = post;

          return (
            <Grid item key={id}>
              <Card
                sx={{
                  width: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                <Box>
                  <Link to={`/users/${author.id}`}>
                    <CardHeader
                      avatar={<PlaceholderAvatar person={author} />}
                      title={`Skrivet av ${author.firstName} ${author.lastName} (${author.username})`}
                      subheader={`Senast uppdaterad: ${toDateTimeString(
                        updatedAt
                      )}`}
                    />
                  </Link>
                  <CardMedia
                    component='img'
                    height='200'
                    image={
                      imageUrl
                        ? imageUrl
                        : `${process.env.PUBLIC_URL}/images/img-placeholder.svg`
                    }
                    alt={`Bild för post: ${title}`}
                  />
                  <CardContent>
                    <Link to={`/posts/${id}`}>
                      <Typography variant='body1' color='text.secondary'>
                        {title}
                      </Typography>
                    </Link>
                    <Typography variant='body2'>{shorten(body, 50)}</Typography>
                    <Box
                      sx={{
                        marginTop: '1rem',
                        display: 'flex',
                        width: '100%',
                        gap: '.2rem',
                        flexWrap: 'wrap'
                      }}>
                      {tags &&
                        tags.map((tag, i) => {
                          if (i < 4)
                            return (
                              <Chip
                                sx={{ fontSize: '.7rem' }}
                                color='secondary'
                                variant='contained'
                                label={tag.name}
                                key={`tag_${tag.id}`}></Chip>
                            );
                          return <Typography>...</Typography>;
                        })}
                    </Box>
                  </CardContent>
                </Box>
                <CardActions
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={`/posts/${id}`}>
                    <Button endIcon={<ArrowForwardIcon />}>Läs mer</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}
