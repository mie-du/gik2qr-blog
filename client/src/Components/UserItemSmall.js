import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PlaceHolderAvatar } from '../helpers/PlaceHolderComponents';

export default function UserItemSmall({ user }) {
  console.log(user);
  //Grid
  //Användarens bild till vänster
  //Användarens användarnamn, e-post och för- och efternamn (om det finns)
  return (
    <Grid container spacing={3} alignItems='center' sx={{ width: '100%' }}>
      <Grid item>
        <PlaceHolderAvatar user={user} />
      </Grid>
      <Grid item>
        <Typography variant='h6'>
          <Link to={`/users/${user.id}/posts`}>{user.username}</Link>
        </Typography>
        {user.firstName && user.lastName && (
          <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
        )}
        <Typography>{user.email}</Typography>
      </Grid>
    </Grid>
  );
}
