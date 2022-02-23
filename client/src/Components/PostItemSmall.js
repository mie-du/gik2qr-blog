import { Divider, Grid, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import Tag from './Tag';
import UserItemSmall from './UserItemSmall';
import { truncate, toDateTimeString } from '../helpers/formatting';
import { PlaceHolderImage } from '../helpers/PlaceHolderComponents';

export default function PostItemSmall({ post }) {
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          marginBottom: 4,
          backgroundColor: grey[50],
          padding: 2
        }}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12}>
            <UserItemSmall user={post.author} />
            <Divider sx={{ margin: '.5rem' }} />
          </Grid>

          <Grid item xs={12} md={4}>
            <PlaceHolderImage source={post} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ cursor: 'pointer' }} variant='h5'>
                  <Link to={`/posts/${post.id}`}>
                    {truncate(post.title, 50)}
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {post.tags &&
                  post.tags.map((tag, i) => {
                    return <Tag tag={tag} key={`tag_${i}`} />;
                  })}
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  Skrivet: {toDateTimeString(post.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{truncate(post.body, 200)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
