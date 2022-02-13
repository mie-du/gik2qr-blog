import { Grid, Typography } from '@mui/material';
import { brown } from '@mui/material/colors';
import React from 'react';
import { Link } from 'react-router-dom';
import { PlaceHolderAvatar } from './PlaceHolders';

export default function UserItemSmall({ user }) {
  console.log(user);
  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems='center'
        sx={{ marginBottom: '.3rem' }}>
        <Grid item>
          <PlaceHolderAvatar user={user} />
        </Grid>
        <Grid item>
          <Typography variant='h6' component='p' sx={{ color: brown[800] }}>
            <Link to={`/users/${user.id}/posts`}>{user.username}</Link>
          </Typography>
          {user.firstName && user.lastName && (
            <Typography>({`${user.firstName} ${user.lastName}`})</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}
