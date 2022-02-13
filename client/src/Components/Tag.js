import { Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({ tag }) {
  return (
    <Link to={`/tags/${tag}/posts`}>
      <Chip
        sx={{ marginRight: 1, cursor: 'pointer' }}
        color='secondary'
        key={`tag_${tag}`}
        label={tag}
      />
    </Link>
  );
}
