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
import { textFieldStyles } from '../Helpers/styles';
import { Link } from 'react-router-dom';

export default function PostEdit({ post, changeResource, saveResource }) {
  //fake userid for posting
  post.userId = 1;
  console.info('%c---Component: PostEdit ---', 'color:yellow', post);

  return (
    <>
      <Typography variant='h2'>
        {post?.id ? 'Redigera inlägg' : 'Skapa inlägg'}
      </Typography>

      <TextField
        {...textFieldStyles}
        value={post?.title || ''}
        type='text'
        name='title'
        label='Titel'
        onChange={(e) => changeResource(e.target)}
      />

      <TextField
        {...textFieldStyles}
        value={post?.imageUrl || ''}
        type='text'
        name='imageUrl'
        label='URL till bild'
        onChange={(e) => changeResource(e.target)}
      />

      <TextField
        {...textFieldStyles}
        value={post?.body || ''}
        rows='10'
        multiline
        name='body'
        label='Innehåll'
        onChange={(e) => changeResource(e.target)}
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
              {...textFieldStyles}
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
          <Button
            onClick={() => saveResource()}
            endIcon={<SaveIcon />}
            variant='contained'
            size='large'>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
