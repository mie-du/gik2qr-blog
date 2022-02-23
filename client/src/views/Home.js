import React from 'react';
import ResourceList from '../Components/ResourceList';
import UserItemSmall from '../Components/UserItemSmall';
import PostItemSmall from '../Components/PostItemSmall';
import Tag from '../Components/Tag';

import { Grid, Typography, Paper } from '@mui/material';
import { grey } from '@mui/material/colors';

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
          <Paper
            sx={{
              marginBottom: 4,
              backgroundColor: grey[50],
              padding: 2
            }}>
            <Typography variant='h5' gutterBottom>
              Användare
            </Typography>
            <ResourceList
              modelPath='users'
              resourceName='user'
              itemComponent={UserItemSmall}
            />
          </Paper>
          <Paper
            sx={{
              marginBottom: 4,
              backgroundColor: grey[50],
              padding: 2
            }}>
            <Typography variant='h5' gutterBottom>
              Taggar
            </Typography>
            <ResourceList
              modelPath='tags'
              resourceName='tag'
              itemComponent={Tag}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
