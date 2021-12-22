import { Container, FormGroup, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function UserEdit({ user, save, validate }) {
  const { id, firstName, lastName, username, email } = user || {};
  return (
    <div>
      <>
        <Typography variant='h5'>
          {user ? 'Redigera Uppgfter' : 'Registrera användare'}
        </Typography>

        <Box mt={3}>
          <TextField
            id='outlined-basic'
            label='Förnamn:'
            value={user ? user.firstName : ''}
          />
        </Box>
      </>
    </div>
  );
}
