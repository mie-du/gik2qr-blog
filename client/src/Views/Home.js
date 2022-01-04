import { Divider, Grid } from '@mui/material';
import React from 'react';
import ResourceLoader from '../api/ResourceLoader';
import PostList from './PostList';
import UserList from './UserList';
import Tags from '../Components/Tags';

export default function Home(props) {
  return (
    <Grid container sx={{ width: '100%' }} spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12} sm={8} lg={10}>
        <ResourceLoader
          {...props}
          pathExtras='posts/summary'
          resourceName='posts'>
          <PostList />
        </ResourceLoader>
      </Grid>
      <Grid item lg={2}>
        <Grid container rowSpacing={3}>
          <Grid item>
            <ResourceLoader {...props} pathExtras='users' resourceName='users'>
              <UserList />
            </ResourceLoader>
          </Grid>
          <Grid item>
            <ResourceLoader {...props} pathExtras='users' resourceName='users'>
              <Tags />
            </ResourceLoader>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
