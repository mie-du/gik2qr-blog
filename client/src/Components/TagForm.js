import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function TagForm({ onSave }) {
  const [tagString, setTagString] = useState('');

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={10}>
        <TextField
          onChange={(e) => setTagString(e.target.value)}
          name='tags'
          label='Taggar (ange flera separerade med kommatecken)'
          value={tagString}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button onClick={() => onSave(tagString)}>Lägg till tagg</Button>
      </Grid>
    </Grid>
  );
}
