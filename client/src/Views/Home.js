import { Divider, Grid } from '@mui/material';
import React from 'react';
import ResourceService from '../Services/ResourceService';
import PostList from './PostList';
import UserList from './UserList';
import Tags from '../Components/Tags';

export default function Home(props) {
  return (
    <Grid container width='100%' spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12} lg={10} justifyContent='center'>
        <ResourceService
          {...props}
          resourcePath='/posts'
          pathExtras='/summary'
          resourceName='posts'>
          <PostList />
        </ResourceService>
      </Grid>
      <Grid item xs={12} lg={2}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={4}
          justifyContent={{ xs: 'center', lg: 'flex-start' }}
          minWidth='100%'>
          <Grid item sx={{ borderBottom: 1, borderColor: 'primary.light' }}>
            <ResourceService
              {...props}
              resourcePath='/users'
              resourceName='users'>
              <UserList />
            </ResourceService>
          </Grid>
          <Grid item sx={{ borderBottom: 1, borderColor: 'primary.light' }}>
            <ResourceService
              {...props}
              resourcePath='/users'
              pathExtras=''
              resourceName='users'>
              <UserList />
            </ResourceService>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
