import { Field } from '../Helpers/styles';

import { Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { Link } from 'react-router-dom';

export default function UserEdit({ user, validData, saveUser, onChange }) {
  const { id, firstName, lastName, username, email, description } = user || {};
  const { firstNameValid, lastNameValid, usernameValid, emailValid } =
    validData || {};

  console.log(validData);
  return (
    <>
      <Typography variant='h5'>
        {user ? 'Redigera Uppgfter' : 'Registrera användare'}
      </Typography>

      <Grid container rowSpacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            error={firstNameValid && firstNameValid.error}
            helperText={
              firstNameValid && firstNameValid.error && firstNameValid.message
            }
            onChange={(e) => onChange(e.target.value)}
            style={Field.left}
            label='Förnamn'
            value={firstName || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            error={lastNameValid && lastNameValid.error}
            helperText={
              lastNameValid && lastNameValid.error && lastNameValid.message
            }
            style={Field.right}
            label='Efternamn'
            value={lastName || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            style={Field.left}
            label='E-post'
            value={email || ''}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            style={Field.right}
            label='Användarnamn'
            value={username || ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
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
          <Link to={`/users/${id}`}>
            <Button endIcon={<SaveIcon />} variant='contained' size='large'>
              Save
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
