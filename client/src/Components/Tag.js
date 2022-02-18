import { Chip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({ tag }) {
  console.log(tag);
  return (
    <Link to={`/tags/${tag}/posts`}>
      <Chip color='secondary' label={tag}></Chip>
    </Link>
  );
}
