import { Field } from '../Helpers/styles';

import { Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserEdit({ user, validation, onSave, onChange }) {
  const { id, firstName, lastName, username, email, description } = user || {};
  /*   const { validFirstName, validLastName, validEmail, validUsername } =
    validData || null; */
  console.log(validation);
  return (
    <>
      <Typography variant='h5'>
        {user ? 'Redigera Uppgfter' : 'Registrera användare'}
      </Typography>

      <Grid container rowSpacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            type='text'
            onChange={onChange}
            name='firstName'
            error={validation?.firstName && !validation.firstName.valid}
            helperText={validation?.firstName?.message}
            style={Field.left}
            label='Förnamn'
            value={firstName || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            onChange={onChange}
            name='lastName'
            error={validation?.lastName && !validation.lastName.valid}
            helperText={validation?.lastName?.message}
            style={Field.right}
            label='Efternamn'
            value={lastName || ''}
            inputProps={{ minLength: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='email'
            onChange={onChange}
            style={Field.left}
            label='E-post'
            value={email || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='username'
            onChange={onChange}
            style={Field.right}
            label='Användarnamn'
            value={username || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            name='description'
            onChange={onChange}
            fullWidth
            rows='3'
            multiline
            label='Beskrivning'
            value={description || ''}
          />
        </Grid>
      </Grid>
      <Grid container mt={3} justifyContent='space-between'>
        <Grid item>
          <Link to={`/users/${id}`}>
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
          <Button
            endIcon={<SaveIcon />}
            onClick={onSave}
            variant='contained'
            size='large'>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
