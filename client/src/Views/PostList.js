import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

import React from 'react';
import { deepPurple, green } from '@mui/material/colors';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { toDateTimeString } from '../Helpers/formating';
import { Link } from 'react-router-dom';
export default function PostList({ posts }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ width: '100%' }}>
      {posts &&
        posts.map((post) => {
          const { id, title, body, imageUrl, updatedAt, createdAt } =
            post.content;

          const { author } = post;
          const { tags } = post;
          console.log(author);
          return (
            <Grid item key={id} xs='auto'>
              <Card sx={{ width: 345 }}>
                <Link to={`/users/${author.authorId}`}>
                  <CardHeader
                    avatar={
                      author.authorImage ? (
                        <Avatar
                          src={author.authorImage}
                          alt={`Bild på ${author.firstName} ${author.lastName}`}
                          aria-label='Author image'
                        />
                      ) : (
                        <Avatar
                          sx={{ bgcolor: deepPurple[500] }}
                          aria-label='Author image placeholder'>
                          {`${author.firstName.substring(
                            0,
                            1
                          )}${author.lastName.substring(0, 1)}`}
                        </Avatar>
                      )
                    }
                    title={`Skrivet av ${author.firstName} ${author.lastName} (${author.username})`}
                    subheader={`Senast uppdaterad: ${toDateTimeString(
                      createdAt
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
                    <Typography variant='h3' color='text.secondary'>
                      {title}
                    </Typography>
                  </Link>
                  <Typography variant='body1'>{`${body.substring(
                    0,
                    50
                  )}...`}</Typography>
                </CardContent>
                <CardActions>
                  <Grid container justifyContent='space-between'>
                    <Grid item>
                      {tags &&
                        tags.map((tag) => (
                          <Button
                            key={tag}
                            sx={{
                              bgcolor: 'secondary.light',
                              color: 'secondary.dark',
                              mr: 1
                            }}
                            size='small'>
                            {tag}
                          </Button>
                        ))}
                    </Grid>
                    <Grid item>
                      <Link to={`/posts/${id}`}>
                        <Button endIcon={<ArrowForwardIcon />}>Läs mer</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}
