import { Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({ tag }) {
  tag = tag.name ? tag.name : tag;
  return (
    tag && (
      <Link to={`/tags/${tag}/posts`}>
        <Chip
          component='span'
          sx={{ marginRight: 1, cursor: 'pointer' }}
          color='secondary'
          key={`tag_${tag}`}
          label={tag}
        />
      </Link>
    )
  );
}
