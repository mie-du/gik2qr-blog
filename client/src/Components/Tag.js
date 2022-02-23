import { Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({ tag }) {
  tag = tag.name ? tag.name : tag;

  return (
    <Link to={`/tags/${tag}/posts`} key={tag}>
      <Chip
        component='span'
        sx={{ margin: '.2rem', cursor: 'pointer' }}
        color='secondary'
        label={tag}></Chip>
    </Link>
  );
}
