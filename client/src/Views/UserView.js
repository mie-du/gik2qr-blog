import { Typography } from '@mui/material';
import React from 'react';

export default function UserView({ user }) {
  const { firstName, lastName, username, email } = user || {};
  return (
    <div>
      {user ? (
        <>
          <Typography variant='h5'>Min profil</Typography>
          <Typography variant='body1'>Namn: {firstName}</Typography>
        </>
      ) : (
        'No user found'
      )}
    </div>
  );
}
