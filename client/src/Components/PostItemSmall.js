import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { truncate, toDateTimeString } from '../helpers/formatting';
import { PlaceHolderImage } from '../helpers/PlaceHolderComponents';
import UserItemSmall from './UserItemSmall';
import { Box } from '@mui/system';
import Tag from './Tag';
import { pageSubtitle } from '../helpers/styles';

export default function PostItemSmall(props) {
  const post = props.post;

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          marginBottom: 4,
          marginTop: 4,
          backgroundColor: grey[50]
        }}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: 2
          }}>
          <Grid item xs={12}>
            <UserItemSmall user={post.author} />
            <Divider />
          </Grid>
          <Grid item xs={12} md={4}>
            {<PlaceHolderImage source={post} />}
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container rowSpacing={1}>
              <Link to={`/posts/${post.id}`}>
                <Grid item>
                  <Typography
                    sx={pageSubtitle.sx}
                    variant={pageSubtitle.variant}
                    component={pageSubtitle.component}>
                    {truncate(post.title, 50)}
                  </Typography>
                </Grid>
              </Link>
              <Grid item xs={12}>
                {post.tags &&
                  post.tags.map((tag) => {
                    return <Tag tag={tag} key={tag} />;
                  })}
              </Grid>
              <Grid item xs={12}>
                <Typography variant='body2' component='p'>
                  Skrivet: {toDateTimeString(post.createdAt)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2'>
                  {truncate(post.body, 200)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link to={`/posts/${post.id}`}>
                    <Button
                      sx={{ marginTop: 1 }}
                      size='small'
                      variant='contained'
                      color='secondary'>
                      Läs mer...
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
