import { Typography, Grid, Fab, Box } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserView() {
  console.log('Component: UserView');
  console.log('---- Mockdata UserView ----');
  const user = {
    id: 1,
    email: 'mie@du.se',
    description: null,
    firstName: 'Mikaela',
    lastName: 'Hedberg',
    username: 'termedea',
    imageUrl: 'https://picsum.photos/seed/picsum/200/200',
    createdAt: '2021-12-28T14:52:00.000Z',
    updatedAt: '2021-12-28T14:55:15.000Z'
  };
  const { id, firstName, lastName, username, email, imageUrl, description } =
    user || {};

  return (
    <div>
      {user ? (
        <>
          <Box
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
          </Box>

          <Grid container spacing={3} sx={{ width: '100%' }}>
            <Grid item xs='auto'>
              {imageUrl ? (
                <img src={imageUrl} alt={`Bild på ${username}`} />
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
        </>
      ) : (
        'No user found'
      )}
    </div>
  );
}
