import { Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';
import { halfFieldGridProps, textFieldProps } from '../Helpers/styles';

export default function UserEdit() {
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

  const { id } = user;
  return (
    <>
      <Typography variant='h2'>
        {id ? 'Redigera Uppgfter' : 'Registrera användare'}
      </Typography>

      <Grid container>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldProps}
            type='text'
            name='firstName'
            label='Förnamn'
          />
        </Grid>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldProps}
            type='text'
            name='lastName'
            label='Efternamn'
          />
        </Grid>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldProps}
            type='email'
            name='email'
            label='E-post'
          />
        </Grid>
        <Grid {...halfFieldGridProps}>
          <TextField {...textFieldProps} name='username' label='Användarnamn' />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...textFieldProps}
            name='imageUrl'
            label='URL till bild'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...textFieldProps}
            name='description'
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
