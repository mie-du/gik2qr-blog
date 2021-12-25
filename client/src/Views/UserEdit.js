import { Field } from '../Helpers/styles';

import { Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserEdit({ action, user, onSave, validation }) {
  const [editedUser, setEditedUser] = useState(user);

  const { firstName, lastName, username, email, description, imageUrl } =
    editedUser;

  const onChange = (field) => {
    setEditedUser({ ...editedUser, [field.name]: field.value });
  };
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
            onChange={(e) => onChange(e.target)}
            style={Field.left}
            label='Förnamn'
            value={firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='lastName'
            onChange={(e) => onChange(e.target)}
            style={Field.right}
            label='Efternamn'
            value={lastName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='email'
            onChange={(e) => onChange(e.target)}
            style={Field.left}
            label='E-post'
            value={email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            variant='filled'
            name='username'
            onChange={(e) => onChange(e.target)}
            style={Field.right}
            label='Användarnamn'
            value={username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            name='imageUrl'
            onChange={(e) => onChange(e.target)}
            fullWidth
            label='URL till bild'
            value={imageUrl}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant='filled'
            name='description'
            onChange={(e) => onChange(e.target)}
            fullWidth
            rows='3'
            multiline
            label='Beskrivning'
            value={description}
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
          <Button
            endIcon={<SaveIcon />}
            onClick={() => onSave(editedUser)}
            variant='contained'
            size='large'>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
