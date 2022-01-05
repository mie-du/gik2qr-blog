import { Grid, TextField, Typography, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { Link } from 'react-router-dom';
import { halfFieldGridProps, textFieldStyles } from '../Helpers/styles';

export default function UserEdit({
  user,
  changeResource,
  saveResource,
  deleteResource
}) {
  console.info('%c---Component: UserEdit ---', 'color:yellow', user);

  return (
    <>
      <Typography variant='h2'>
        {user?.id ? 'Redigera inlägg' : 'Skapa inlägg'}
      </Typography>

      <Grid container>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldStyles}
            value={user?.firstName || ''}
            onChange={(e) => changeResource(e.target)}
            type='text'
            name='firstName'
            label='Förnamn'
          />
        </Grid>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldStyles}
            value={user?.lastName || ''}
            onChange={(e) => changeResource(e.target)}
            type='text'
            name='lastName'
            label='Efternamn'
          />
        </Grid>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldStyles}
            value={user?.email || ''}
            onChange={(e) => changeResource(e.target)}
            type='email'
            name='email'
            label='E-post'
          />
        </Grid>
        <Grid {...halfFieldGridProps}>
          <TextField
            {...textFieldStyles}
            value={user?.username || ''}
            onChange={(e) => changeResource(e.target)}
            name='username'
            label='Användarnamn'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...textFieldStyles}
            value={user?.imageUrl || ''}
            onChange={(e) => changeResource(e.target)}
            name='imageUrl'
            label='URL till bild'
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...textFieldStyles}
            value={user?.description || ''}
            onChange={(e) => changeResource(e.target)}
            name='description'
            rows='3'
            multiline
            label='Beskrivning'
          />
        </Grid>
      </Grid>
      <Grid container mt={3} justifyContent='space-between'>
        <Grid item>
          <Link to={`/users/${user?.id}`}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant='contained'
              size='large'
              color='danger'>
              Tillbaka
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Button
            endIcon={<DeleteIcon />}
            variant='contained'
            sx={{ marginRight: 2 }}
            size='large'
            onClick={deleteResource}
            color='danger'>
            Ta bort
          </Button>
          <Button
            endIcon={<SaveIcon />}
            variant='contained'
            size='large'
            onClick={saveResource}>
            Spara
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
