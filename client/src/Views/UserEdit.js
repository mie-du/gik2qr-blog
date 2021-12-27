import { Field } from '../Helpers/styles';

import { Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserEdit({ user, onSave }) {
  return (
    <>
      <Typography variant='h2'>
        {user?.id ? 'Redigera Uppgfter' : 'Registrera användare'}
      </Typography>

      <Grid container rowSpacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            type='text'
            name='firstName'
            label='Förnamn'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='lastName'
            style={Field.right}
            label='Efternamn'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='email'
            style={Field.left}
            label='E-post'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='username'
            style={Field.right}
            label='Användarnamn'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            name='imageUrl'
            fullWidth
            label='URL till bild'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            name='description'
            fullWidth
            rows='3'
            multiline
            label='Beskrivning'
          />
        </Grid>
      </Grid>
      <Grid container mt={3} justifyContent='space-between'>
        <Grid item>
          <Link to={`/users/${user.id}`}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant='contained'
              size='large'
              color='danger'>
              Back
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Button endIcon={<SaveIcon />} variant='contained' size='large'>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
