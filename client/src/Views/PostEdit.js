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

export default function PostEdit() {
  //replace with props
  const post = {
    content: {
      id: 4,
      title: 'En post',
      body: 'Nam commodi velit harum. Culpa ratione enim aliquid neque et. Reprehenderit dolores numquam unde aliquam voluptas perferendis.\n\nUt nobis similique nihil velit asperiores doloremque nobis. Dolores rerum non consectetur et iste fugiat. Ut quaerat non tempore.\n\nSit eligendi corporis quo id quibusdam quam unde alias. Maiores ut et corrupti quis quibusdam velit qui et. In quod ea consequuntur consequatur.\n\nVel quia quia neque alias impedit autem doloremque sint. Minima autem harum quidem provident et consequuntur non. Enim voluptatem ab ipsa. Voluptatem corrupti alias sit.',
      imageUrl: 'https://picsum.photos/id/1/200/',
      createdAt: '2021-12-28T15:01:25.000Z',
      updatedAt: '2021-12-28T15:01:25.000Z'
    },
    author: {
      id: 1,
      firstName: 'Mikaela',
      lastName: 'Hedberg',
      username: 'termedea',
      email: 'mie@du.se',
      imageUrl: 'https://picsum.photos/seed/picsum/200/200'
    },
    tags: [
      {
        id: 4,
        name: 'tag'
      },
      {
        id: 5,
        name: 'längretag'
      },
      {
        id: 6,
        name: 'tjoho'
      }
    ]
  };
  //destruct all relevant fields
  const { id } = post.content;
  console.log('Editing', post);
  return (
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
  );
}
