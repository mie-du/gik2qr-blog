import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

export default function CommentEdit({ comment }) {
  console.info('%c---Component: CommentEdit ---', 'color:yellow');
  return (
    <>
      <TextField
        variant='filled'
        name='comment'
        fullWidth
        rows='3'
        multiline
        label='Kommentar'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1rem'
        }}>
        <Button endIcon={<SendIcon />} variant='contained' size='large'>
          Skicka
        </Button>
      </Box>
    </>
  );
}
