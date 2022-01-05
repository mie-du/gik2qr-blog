import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

export default function CommentEdit({ comment, changeResource, saveResource }) {
  console.info('%c---Component: CommentEdit ---', 'color:yellow', comment);
  return (
    <>
      <TextField
        variant='filled'
        name='body'
        fullWidth
        rows='3'
        multiline
        label='Kommentar'
        value={comment?.title}
        onChange={(e) => changeResource(e.target)}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '1rem'
        }}>
        <Button
          endIcon={<SendIcon />}
          variant='contained'
          size='large'
          onClick={saveResource}>
          Skicka
        </Button>
      </Box>
    </>
  );
}
