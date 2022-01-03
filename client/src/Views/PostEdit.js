import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { textFieldProps } from '../Helpers/styles';
import { Link } from 'react-router-dom';

export default function PostEdit({ post }) {
  //fetch tags

  console.log('Editing', post);
  return <>Editing post</>;
  /*  return (
    <>
      <Typography variant='h2'>
        {id ? 'Redigera inlägg' : 'Skapa inlägg'}
      </Typography>

      <TextField {...textFieldProps} type='text' name='title' label='Titel' />

      <TextField {...textFieldProps} name='imageUrl' label='URL till bild' />

      <TextField
        {...textFieldProps}
        rows='10'
        multiline
        name='description'
        label='Beskrivning'
      />
      {post.tags > 0 && (
        <Autocomplete
          multiple
          name='tags'
          options={post.tags}
          getOptionLabel={(option) => option.name}
          defaultValue={[post.tags[0], post.tags[1], post.tags[2]]}
          renderInput={(params) => (
            <TextField
              {...textFieldProps}
              {...params}
              label='Taggar'
              placeholder='Lägg till tagg'
            />
          )}
        />
      )}

      <Grid container mt={3} justifyContent='space-between'>
        <Grid item>
          <Link to={`/posts/${post.id}`}>
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
          <Button endIcon={<SaveIcon />} variant='contained' size='large'>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  ); */
}
