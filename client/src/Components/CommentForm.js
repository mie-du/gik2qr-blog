import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { bodyTitle } from '../helpers/styles';

export default function CommentForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <>
      <Typography
        sx={bodyTitle.sx}
        variant={bodyTitle.variant}
        component={bodyTitle.component}>
        Lägg till kommentar
      </Typography>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <TextField
            name='title'
            label='Rubrik'
            color='secondary'
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => onSave({ title, body, userId: 1 })}
              variant='contained'
              color='secondary'>
              Spara
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
