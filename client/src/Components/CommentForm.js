import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

export default function CommentForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <>
      <Typography>Lägg till en kommentar</Typography>
      <TextField
        sx={{ margin: '1rem 0' }}
        name='title'
        label='Rubrik'
        color='secondary'
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        name='body'
        label='Kommentar'
        color='secondary'
        fullWidth
        multiline
        minRows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={() => {
            onSave({ title, body, userId: 1 });
            setBody('');
            setTitle('');
          }}>
          Skicka kommentar
        </Button>
      </Box>
    </>
  );
}
