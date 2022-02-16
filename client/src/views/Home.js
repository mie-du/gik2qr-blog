import { Grid, Typography } from '@mui/material';
import React from 'react';
import { pageSubtitle, pageTitle } from '../helpers/styles';

import ResourceList from '../Components/Lists/ResourceList';
import PostItemSmall from '../Components/PostItemSmall';
import UserItemSmall from '../Components/UserItemSmall';
import Tag from '../Components/Tag';

export default function Home() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Typography {...pageTitle}>Alla inlägg</Typography>
        <ResourceList
          resourceName='post'
          path='posts'
          itemComponent={PostItemSmall}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography {...pageSubtitle}>Användare</Typography>
            <ResourceList
              resourceName='user'
              path='users'
              itemComponent={UserItemSmall}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography {...pageSubtitle}>Taggar</Typography>
            <ResourceList resourceName='tag' path='tags' itemComponent={Tag} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
