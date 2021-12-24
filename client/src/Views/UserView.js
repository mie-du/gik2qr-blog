import { Typography, Grid, Fab } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserView({ user }) {
  const { id, firstName, lastName, username, email, imageUrl, description } =
    user || {};

  return (
    <div>
      {user ? (
        <>
          <Typography variant='h5' component='h3'>
            Min profil
          </Typography>

          <Grid container spacing={3} sx={{ width: '100%' }}>
            <Grid item xs='auto'>
              {imageUrl ? (
                <img src={imageUrl} alt={`Bild på ${username}`} />
              ) : (
                'Bild saknas'
              )}
            </Grid>
            <Grid item md={6}>
              <Typography gutterBottom variant='h5' component='h3'>
                {username}
              </Typography>
              <Typography>
                Namn:{' '}
                {firstName && lastName ? `${firstName} ${lastName}` : 'Okänt'}
              </Typography>

              <Typography>E-post: {email}</Typography>
              <Typography component='h4' variant='body1'>
                Beskrivning
              </Typography>

              <Typography variant='body2' color='text.secondary'>
                {description}
              </Typography>
            </Grid>
            <Grid container mt={5} justifyContent='flex-end'>
              <Link to={`/users/${id}/edit`}>
                <Fab color='secondary' aria-label='edit'>
                  <EditIcon />
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </>
      ) : (
        'No user found'
      )}
    </div>
  );
}
