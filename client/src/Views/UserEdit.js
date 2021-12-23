import { Fab, Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserEdit({ user, save, validate }) {
  const { id, firstName, lastName, username, email, description } = user || {};
  console.log(user);
  return (
    <div>
      <>
        <Typography variant='h5'>
          {user ? 'Redigera Uppgfter' : 'Registrera användare'}
        </Typography>

        <Grid container spacing={3} px={-3} my={3}>
          <Grid item alignSelf='center' xs={12} md={6}>
            <TextField fullWidth label='Förnamn' value={firstName || ''} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Efternamn' value={lastName || ''} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='E-post' value={email || ''} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label='Användarnamn' value={username || ''} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              rows='3'
              multiline
              label='Beskrivning'
              value={description || ''}
            />
          </Grid>

          <Grid container m={3} justifyContent='space-between'>
            <Grid item>
              <Link to={`/users/${id}`}>
                <Button variant='contained' size='large' color='danger'>
                  Back
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to={`/users/${id}`}>
                <Button variant='contained' size='large'>
                  Save
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </>
    </div>
  );
}
