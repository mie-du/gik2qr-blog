import {
  Grid,
  Typography,
  Fab,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';

import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';

import { toDateTimeString } from '../Helpers/formating';
import { PlaceholderAvatar } from '../Helpers/components';

export default function PostView({ post }) {
  console.log('viewing', post);
  const { id, title, body, imageUrl, createdAt, updatedAt } =
    post?.content || {};
  const { author, comments, tags } = post || {};
  return (
    <>
      {post ? (
        <>
          <Typography variant='h2'>{title}</Typography>

          <Grid container justifyContent='space-between' sx={{ width: '100%' }}>
            <Grid item>
              {imageUrl ? (
                <img src={imageUrl} alt='Bild för inlägg' />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/images/img-placeholder.svg`}
                  alt='Ingen bild tillgänglig'
                />
              )}
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid
                container
                spacing={2}
                alignItems='center'
                sx={{ marginBottom: '1rem;' }}>
                <Grid item>
                  <PlaceholderAvatar person={author} />
                </Grid>

                <Grid item>
                  <Typography component='p'>
                    {`Författare: ${author.firstName} (${author.username})`}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>
                    {`Publicerat: ${toDateTimeString(createdAt)} 
                    `}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>
                    {`Senast uppdaterat: ${toDateTimeString(updatedAt)}`}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant='body1'>{body}</Typography>
              <Grid container columnSpacing={2} justifyContent='flex-end'>
                {tags &&
                  tags.map((tag) => {
                    return (
                      <Grid item key={tag}>
                        <Button size='small' variant='contained'>
                          {tag}
                        </Button>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography component='h4' sx={{ fontSize: '1.5rem' }}>
                Kommentarer
              </Typography>
              <List>
                {comments &&
                  comments.map((comment) => {
                    return (
                      <ListItem divider key={comment.id}>
                        <ListItemAvatar>
                          <PlaceholderAvatar person={comment.author} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.title}
                          secondary={comment.body}></ListItemText>
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
            <Grid container mt={5} justifyContent='flex-end'>
              <Link to={`/posts/${id}/edit`}>
                <Fab color='secondary' aria-label='edit'>
                  <EditIcon />
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Fetching users...</Typography>
      )}
    </>
  );
}
