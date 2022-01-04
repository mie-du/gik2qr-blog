import { Typography, Grid, Fab, Box } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserView({ user }) {
  console.info('%c--- Component: UserView ---', 'color:lime', user);

  const { id, firstName, lastName, username, email, imageUrl, description } =
    user || {};

  return (
    <div>
      {user ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
              container
              spacing={3}
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',

                  gap: '2rem',
                  marginBottom: '.3rem'
                }}>
                <Link to={`/users/${id}/edit`}>
                  <Fab size='small' color='secondary' aria-label='edit'>
                    <EditIcon />
                  </Fab>
                </Link>
                <Typography variant='h2'>Min profil</Typography>
              </Grid>
              <Grid item xs='auto'>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={`Bild på ${username}`}
                    style={{ maxWidth: '500px' }}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/images/img-placeholder.svg`}
                    alt='Ingen bild tillgänglig'
                  />
                )}
              </Grid>
              <Grid item md={6}>
                <Typography gutterBottom variant='h3' component='h3'>
                  {username}
                </Typography>
                <Typography paragraph>
                  Namn:{' '}
                  {firstName && lastName ? `${firstName} ${lastName}` : 'Okänt'}
                </Typography>

                <Typography paragraph>E-post: {email}</Typography>
                <Typography component='h4' variant='body1'>
                  Beskrivning
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        'No user found'
      )}
    </div>
  );
}
