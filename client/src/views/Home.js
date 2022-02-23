import React from 'react';
import ResourceList from '../Components/ResourceList';
import UserItemSmall from '../Components/UserItemSmall';
import PostItemSmall from '../Components/PostItemSmall';
import Tag from '../Components/Tag';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <ResourceList
            modelPath='posts'
            resourceName='post'
            itemComponent={PostItemSmall}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ marginBottom: '.5rem', minHeight: '50vh' }}>
            <Typography variant='h6'>Användare</Typography>
            <ResourceList
              modelPath='users'
              resourceName='user'
              itemComponent={UserItemSmall}
            />
          </Box>
          <Box sx={{ marginBottom: '.5rem' }}>
            <Typography variant='h6'>Taggar</Typography>
            <ResourceList
              modelPath='tags'
              resourceName='tag'
              itemComponent={Tag}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
